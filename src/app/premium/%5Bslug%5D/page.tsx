"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";
import { premiumApi, PremiumArticle } from "@/lib/premium";

export default function PremiumArticlePage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolved = params instanceof Promise ? use(params) : params;
  const slug = resolved.slug;

  const [article, setArticle] = useState<PremiumArticle | null>(null);
  const [related, setRelated] = useState<PremiumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await premiumApi.getArticleDetail(slug);
        if (res.success) {
          setArticle(res.data.article);
          setRelated(res.data.related || []);
        } else {
          setError("Article not found");
        }
      } catch {
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-slate-50 min-h-screen animate-pulse">
        <div className="bg-white border-b border-slate-200 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-10 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-1/3" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-700">Article Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">{error}</p>
          <Link href="/premium" className="mt-4 inline-block text-xs font-bold text-[#7c3aed] hover:underline">
            ← Back to Premium Library
          </Link>
        </div>
      </main>
    );
  }

  const categoryName = typeof article.category === "object" ? article.category?.name : "Uncategorized";

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Banner */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/premium"
            className="text-xs font-bold text-slate-400 hover:text-slate-800 flex items-center gap-2 mb-6"
          >
            ← Back to Premium Library
          </Link>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-extrabold px-3 py-1 bg-purple-50 border border-purple-100 text-purple-700 uppercase tracking-wider">
                {categoryName}
              </span>
              {article.readingTime && (
                <span className="text-[10px] font-extrabold px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 uppercase tracking-wider">
                  {article.readingTime} min read
                </span>
              )}
              <span className="text-[10px] font-extrabold px-3 py-1 bg-green-50 border border-green-150 text-green-700 uppercase tracking-wider">
                {article.isPurchased ? "UNLOCKED" : "PREMIUM LOCKED"}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
              {article.title}
            </h1>

            <p className="text-sm font-extrabold text-slate-900 pt-2">
              Resource Cost:{" "}
              <span className="text-lg text-[#7c3aed]">
                {article.currency} {article.price.toFixed(2)}
              </span>
              {article.discount > 0 && (
                <span className="ml-2 text-xs text-green-600">(-{article.discount}% off)</span>
              )}
              <span className="ml-2 text-xs text-slate-400 font-medium">(One-time secure payment)</span>
            </p>

            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {article.summary}
            </p>

            {article.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Content */}
          <div className="lg:col-span-8 space-y-6">
            {article.featuredImage && (
              <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {article.isPurchased && article.fullContent ? (
              <div className="bg-white border border-slate-200 p-8 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Full Content</h4>
                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {article.fullContent}
                </div>
              </div>
            ) : (
              <>
                {/* Free Teaser */}
                {article.previewContent && (
                  <div className="bg-white border border-slate-200 p-8 shadow-sm space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Guide Preview</h4>
                    <p className="text-sm leading-relaxed text-slate-650 font-medium">
                      {article.previewContent}
                    </p>
                  </div>
                )}

                {/* Locked Content Card */}
                <div className="bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 select-none">
                    Locked Content
                  </h4>
                  <div className="space-y-4 select-none blur-sm opacity-20 filter pointer-events-none">
                    <p className="text-sm leading-relaxed text-slate-700">
                      Premium content is hidden. Purchase this article to unlock the full material including
                      detailed guides, downloadable PDFs, and practical resources.
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      Get instant access to comprehensive coverage of this topic with expert insights,
                      real-world examples, and actionable templates.
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center bg-purple-50 text-[#7c3aed] mb-4 border border-purple-100">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">
                      This is Premium Content
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed">
                      Unlock this article by making payment. Once unlocked, the full material and PDF download
                      sheets appear instantly.
                    </p>
                    <Link
                      href={`/checkout?article=${article._id}`}
                      className="mt-6 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-bold px-8 py-3.5 shadow-md shadow-purple-100 transition-colors"
                    >
                      Purchase Document - {article.currency} {article.price.toFixed(2)}
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Purchase benefits */}
            <div className="bg-white border border-slate-200 p-6 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3 mb-4">
                What&apos;s Included
              </h4>
              <ul className="space-y-3 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Full lifetime portal reading access
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Printable offline PDF document sheets
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Custom spreadsheets templates download
                </li>
              </ul>
              {article.isPurchased && article.downloadablePdf && (
                <a
                  href={article.downloadablePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full bg-slate-900 text-white text-xs font-bold py-3 hover:opacity-90 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download PDF
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="bg-white border border-slate-200 p-6 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3 mb-4">
                Article Stats
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Purchases</span>
                  <span className="font-bold text-slate-900">{article.purchaseCount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Downloads</span>
                  <span className="font-bold text-slate-900">{article.downloadCount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Author</span>
                  <span className="font-bold text-slate-900">{article.author}</span>
                </div>
                {article.publishedDate && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Published</span>
                    <span className="font-bold text-slate-900">
                      {new Date(article.publishedDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white border border-slate-200 p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
                Purchase FAQs
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="font-bold text-slate-800">Is my transaction secure?</p>
                  <p className="text-slate-500 mt-1 leading-relaxed">
                    Yes, all checkouts are processed through Stripe/PayPal 256-Bit SSL channels.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-800">Can I access it in the future?</p>
                  <p className="text-slate-500 mt-1 leading-relaxed">
                    Yes, unlocked resources are permanently linked to your profile dashboard library.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((r) => (
                <Link
                  key={r._id}
                  href={`/premium/${r.slug}`}
                  className="group border border-slate-200 bg-white hover:border-[#7c3aed] transition-all p-5"
                >
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#7c3aed] transition-colors mb-1">
                    {r.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">{r.summary}</p>
                  <span className="text-sm font-extrabold text-[#7c3aed]">
                    {r.currency} {r.price.toFixed(2)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
