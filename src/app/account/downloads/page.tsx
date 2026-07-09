"use client";

import { useState, useEffect } from "react";
import { AccountLayout } from "@/components/AccountLayout";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import { Download, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

interface DownloadItem {
  _id: string;
  article: {
    _id: string;
    title: string;
    slug: string;
    featuredImage?: string;
    downloadablePdf?: string;
    category?: string;
  };
  purchase: {
    _id: string;
    amount: number;
    purchaseDate: string;
  };
  downloadedAt: string;
  status: string;
}

interface PurchaseItem {
  _id: string;
  article: {
    _id: string;
    title: string;
    slug: string;
    featuredImage?: string;
    downloadablePdf?: string;
    category?: string;
  };
  amount: number;
  purchaseDate: string;
  downloadCount: number;
}

export default function AccountDownloadsPage() {
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await api.get<{ purchases: PurchaseItem[] }>("/premium/purchases");
        if (res.success && res.data) {
          setPurchases((res.data as any).purchases || []);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const filtered = purchases.filter((p) =>
    p.article?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = async (purchase: PurchaseItem) => {
    if (!purchase.article?.downloadablePdf) {
      toast.error("PDF not available for this article");
      return;
    }
    window.open(purchase.article.downloadablePdf, "_blank");
    toast.success("Download started");
  };

  return (
    <AccountLayout title="Downloads" currentPath="/account/downloads">
      <div className="space-y-8">
        <div className="bg-white border border-slate-100 shadow-sm flex flex-col min-h-[50vh]">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-955">Purchased Resources</h3>
              <p className="text-xs text-slate-400 mt-1">
                Access completed reports, proofread papers, and templates ready for download.
              </p>
            </div>
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
              />
            </div>
          </div>

          <div className="flex-grow">
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-4 px-6">File Name</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Purchased</th>
                    <th className="py-4 px-6">Downloads</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <tr key={i}>
                        <td colSpan={6} className="py-5 px-6">
                          <div className="h-4 bg-slate-100 animate-pulse w-1/3" />
                        </td>
                      </tr>
                    ))
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                        <p className="text-sm font-bold">No downloads yet</p>
                        <p className="text-xs mt-1">Purchase premium articles to see them here</p>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item) => (
                      <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center bg-slate-50 border border-slate-100 text-slate-500">
                              <FileText className="h-4 w-4" />
                            </div>
                            <span className="font-bold text-slate-900">{item.article?.title || "Untitled"}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="text-[10px] font-extrabold px-2.5 py-1 border border-slate-100 bg-slate-50 text-slate-600">
                            {item.article?.category || "General"}
                          </span>
                        </td>
                        <td className="py-5 px-6 font-bold text-slate-500">
                          ${item.amount}
                        </td>
                        <td className="py-5 px-6 text-slate-500 font-semibold">
                          {new Date(item.purchaseDate).toLocaleDateString()}
                        </td>
                        <td className="py-5 px-6 text-slate-500 font-medium">
                          {item.downloadCount}
                        </td>
                        <td className="py-5 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/premium/${item.article?.slug || ""}`}
                              className="inline-flex h-8 px-3 items-center justify-center border border-slate-200 text-slate-700 text-[11px] font-bold hover:bg-slate-50 transition-all"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" /> View
                            </Link>
                            {item.article?.downloadablePdf && (
                              <button
                                onClick={() => handleDownload(item)}
                                className="inline-flex h-8 px-4 items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all"
                              >
                                <Download className="h-3 w-3 mr-1" /> Download
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="block lg:hidden p-4 space-y-3">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border border-slate-200 bg-slate-50/60 p-4 animate-pulse">
                    <div className="h-4 bg-slate-100 w-2/3 mb-2" />
                    <div className="h-3 bg-slate-100 w-1/3" />
                  </div>
                ))
              ) : filtered.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-bold">No downloads yet</p>
                </div>
              ) : (
                filtered.map((item) => (
                  <div key={item._id} className="border border-slate-200 bg-slate-50/60 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-slate-50 border border-slate-100 text-slate-500">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{item.article?.title || "Untitled"}</h4>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-slate-400 font-semibold">Category</p>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 border border-slate-100 bg-slate-50 text-slate-600">
                          {item.article?.category || "General"}
                        </span>
                      </div>
                      <div>
                        <p className="text-slate-400 font-semibold">Price</p>
                        <p className="font-bold text-slate-500">${item.amount}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-semibold">Downloads</p>
                        <p className="font-medium text-slate-500">{item.downloadCount}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Link
                        href={`/premium/${item.article?.slug || ""}`}
                        className="inline-flex h-8 px-4 items-center justify-center border border-slate-200 text-slate-700 text-[11px] font-bold hover:bg-slate-50 transition-all"
                      >
                        View
                      </Link>
                      {item.article?.downloadablePdf && (
                        <button
                          onClick={() => handleDownload(item)}
                          className="inline-flex h-8 px-4 items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all"
                        >
                          <Download className="h-3 w-3 mr-1" /> Download
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
