"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { premiumApi, PremiumArticle, ArticleCategory, PaginationInfo } from "@/lib/premium";

function PremiumSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border border-slate-200 bg-white p-6 space-y-4">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-100 rounded w-1/2" />
          <div className="h-3 bg-slate-100 rounded w-full" />
          <div className="h-3 bg-slate-100 rounded w-2/3" />
          <div className="flex justify-between items-center pt-4">
            <div className="h-6 bg-slate-200 rounded w-20" />
            <div className="h-8 bg-slate-200 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PremiumPage() {
  const [articles, setArticles] = useState<PremiumArticle[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await premiumApi.getArticles({
        page,
        limit: 12,
        search: search || undefined,
        category: selectedCategory || undefined,
        sortBy,
      });
      if (res.success) {
        setArticles(res.data.articles);
        setPagination(res.data.pagination);
      }
    } catch {
      // Fail silently
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [page, selectedCategory, sortBy]);

  useEffect(() => {
    premiumApi.getCategories().then((res) => {
      if (res.success) setCategories(res.data.categories);
    }).catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchArticles();
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed]">Premium Library</span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Unlock Expert Knowledge
          </h1>
          <p className="mt-4 text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Access deeper articles, practical guides, and professional resources that go beyond free content.
            One-time purchase grants lifetime access with downloadable PDFs.
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-400">
            <span className="px-3 py-1 border border-slate-200 bg-slate-50">Premium Content</span>
            <span className="px-3 py-1 border border-slate-200 bg-slate-50">Instant Access</span>
            <span className="px-3 py-1 border border-slate-200 bg-slate-50">Secure Checkout</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-slate-200 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setSelectedCategory(""); setPage(1); }}
              className={`text-xs font-bold px-3 py-1.5 border transition-colors ${!selectedCategory ? "bg-[#7c3aed] text-white border-[#7c3aed]" : "border-slate-200 text-slate-600 hover:border-[#7c3aed]"}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => { setSelectedCategory(cat.slug); setPage(1); }}
                className={`text-xs font-bold px-3 py-1.5 border transition-colors ${selectedCategory === cat.slug ? "bg-[#7c3aed] text-white border-[#7c3aed]" : "border-slate-200 text-slate-600 hover:border-[#7c3aed]"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full sm:w-48 border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:border-[#7c3aed]"
              />
              <button type="submit" className="bg-slate-900 text-white px-3 py-1.5 text-xs font-bold hover:opacity-90">
                Search
              </button>
            </form>
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              className="border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:border-[#7c3aed]"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {loading ? (
          <PremiumSkeleton />
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <svg className="h-12 w-12 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <p className="text-sm text-slate-500 font-semibold">No premium articles found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article._id}
                  href={`/premium/${article.slug}`}
                  className="group border border-slate-200 bg-white hover:border-[#7c3aed] transition-all flex flex-col"
                >
                  {article.featuredImage && (
                    <div className="relative h-40 border-b border-slate-200 overflow-hidden bg-slate-100">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c3aed]">
                        {article.category?.name || "Uncategorized"}
                      </span>
                      {article.readingTime && (
                        <>
                          <span className="text-[10px] text-slate-400">·</span>
                          <span className="text-[10px] text-slate-400">{article.readingTime} min read</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#7c3aed] transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
                      {article.summary}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-[#7c3aed]">
                        {article.currency} {article.price.toFixed(2)}
                        {article.discount > 0 && (
                          <span className="ml-2 text-xs text-green-600 font-bold">-{article.discount}%</span>
                        )}
                      </span>
                      <span className="bg-[#7c3aed] text-white text-[10px] font-bold px-4 py-2 group-hover:bg-[#6d28d9] transition-colors">
                        Unlock
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  disabled={!pagination.hasPrev}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 text-xs font-bold border border-slate-200 bg-white hover:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 text-xs font-bold border ${page === p ? "bg-[#7c3aed] text-white border-[#7c3aed]" : "border-slate-200 bg-white hover:border-slate-800"}`}
                  >
                    {p}
                  </button>
                ))}
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
      </section>
    </main>
  );
}
