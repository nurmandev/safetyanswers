"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AccountLayout } from "@/components/AccountLayout";
import { premiumApi, ArticlePurchase, PaginationInfo } from "@/lib/premium";

export default function AccountPurchasedPage() {
  const [purchases, setPurchases] = useState<ArticlePurchase[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await premiumApi.getUserPurchases({ page, limit: 10 });
        if (res.success) {
          setPurchases(res.data.purchases);
          setPagination(res.data.pagination);
        }
      } catch {
        // Fail silently
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  return (
    <AccountLayout title="Unlocked Library" currentPath="/account/purchased">
      <div className="bg-white border border-slate-100 shadow-sm flex flex-col min-h-[70vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-955">Purchased Content Library</h3>
            <p className="text-xs text-slate-400 mt-1">
              Access, read, and download all premium articles and manuals you have unlocked.
            </p>
          </div>
          {purchases.length > 0 && (
            <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 self-start sm:self-center transition-colors">
              Download Entire Library (.zip)
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow">
          {loading ? (
            <div className="p-10 text-center">
              <div className="animate-pulse space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 bg-slate-100 rounded" />
                ))}
              </div>
            </div>
          ) : purchases.length === 0 ? (
            <div className="p-10 text-center">
              <svg className="h-12 w-12 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <p className="text-sm text-slate-500 font-semibold">No purchases yet</p>
              <Link href="/premium" className="mt-3 inline-block text-xs font-bold text-[#7c3aed] hover:underline">
                Browse Premium Library →
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-4 px-6">Document Title</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Price</th>
                      <th className="py-4 px-6">Purchase Date</th>
                      <th className="py-4 px-6">Invoice</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {purchases.map((p) => {
                      const article = typeof p.article === "object" ? p.article : null;
                      const catName = article?.category && typeof article.category === "object"
                        ? article.category.name
                        : "";
                      return (
                        <tr key={p._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center bg-purple-50 text-[#7c3aed]">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                              </div>
                              <span className="font-bold text-slate-900">{article?.title || "Unknown Article"}</span>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <span className="text-[10px] font-extrabold px-2.5 py-1 border border-slate-100 bg-slate-50 text-slate-600">
                              {catName || "Premium"}
                            </span>
                          </td>
                          <td className="py-5 px-6 font-bold text-slate-900">
                            {p.currency} {p.amount.toFixed(2)}
                          </td>
                          <td className="py-5 px-6 text-slate-500 font-semibold">
                            {new Date(p.purchaseDate).toLocaleDateString()}
                          </td>
                          <td className="py-5 px-6 text-xs font-mono text-slate-400">
                            {p.invoiceNumber}
                          </td>
                          <td className="py-5 px-6">
                            <span className="inline-block px-2.5 py-1 text-[10px] font-extrabold border bg-green-50 border-green-200 text-green-700">
                              {p.paymentStatus === "successful" ? "Unlocked" : p.paymentStatus}
                            </span>
                          </td>
                          <td className="py-5 px-6 text-right">
                            {article && (
                              <Link
                                href={`/premium/${article.slug}`}
                                className="inline-flex h-8 px-4 items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all"
                              >
                                Read Article
                              </Link>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="block lg:hidden p-4 space-y-3">
                {purchases.map((p) => {
                  const article = typeof p.article === "object" ? p.article : null;
                  return (
                    <div key={p._id} className="border border-slate-200 bg-slate-50/60 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-purple-50 text-[#7c3aed]">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm truncate">{article?.title || "Unknown"}</h4>
                        </div>
                        <span className="shrink-0 inline-block px-2.5 py-1 text-[10px] font-extrabold border bg-green-50 border-green-200 text-green-700">
                          {p.paymentStatus === "successful" ? "Unlocked" : p.paymentStatus}
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-slate-400 font-semibold">Price</p>
                          <p className="font-bold text-slate-900">{p.currency} {p.amount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-semibold">Date</p>
                          <p className="font-semibold text-slate-500">{new Date(p.purchaseDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-semibold">Invoice</p>
                          <p className="font-mono text-xs text-slate-400">{p.invoiceNumber}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        {article && (
                          <Link
                            href={`/premium/${article.slug}`}
                            className="inline-flex h-8 px-4 items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all"
                          >
                            Read Article
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 p-6 border-t border-slate-100">
                  <button
                    disabled={!pagination.hasPrev}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-2 text-xs font-bold border border-slate-200 bg-white hover:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-xs text-slate-400">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    disabled={!pagination.hasNext}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 text-xs font-bold border border-slate-200 bg-white hover:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AccountLayout>
  );
}
