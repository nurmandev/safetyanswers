"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/* ---------- data ---------- */

const categories = [
  { title: "Academic Consultancy", count: "28 articles", icon: "academic", image: "/written.jpg" },
  { title: "Health & Safety", count: "22 articles", icon: "safety", image: "/employees.jpg" },
  { title: "Professional Writing", count: "18 articles", icon: "writing", image: "/business.jpg" },
  { title: "Research Methodology", count: "15 articles", icon: "method", image: "/written.jpg" },
  { title: "Statistical Analysis", count: "12 articles", icon: "data", image: "/business.jpg" },
  { title: "Career Development", count: "10 articles", icon: "career", image: "/employees.jpg" },
  { title: "Industry News", count: "8 articles", icon: "news", image: "/business.jpg" },
  { title: "Case Studies", count: "6 articles", icon: "case", image: "/written.jpg" },
];

const latestArticles = [
  { title: "Understanding Risk Assessment Methodologies for HSE Compliance", excerpt: "A comprehensive guide to risk assessment frameworks, hazard identification, and control measures for workplace safety.", category: "Health & Safety", author: "Marcus Vance", date: "Jun 28, 2026", readTime: "7 min read", views: "1.8k", image: "/employees.jpg", slug: "risk-assessment-methodologies-hse" },
  { title: "Mastering SPSS for Quantitative Data Analysis", excerpt: "Step-by-step guide to SPSS analysis including descriptive statistics, regression, ANOVA, and interpretation of results.", category: "Academic Support", author: "Dr. Robert Kimani", date: "Jun 25, 2026", readTime: "10 min read", views: "3.2k", image: "/written.jpg", slug: "mastering-spss-quantitative-analysis" },
  { title: "Writing a Persuasive SOP for International Study Applications", excerpt: "Your Statement of Purpose can make or break your application. Learn the five-block structure used by successful candidates.", category: "Professional Writing", author: "Emily Hartwell", date: "Jun 22, 2026", readTime: "6 min read", views: "4.1k", image: "/written.jpg", slug: "writing-a-persuasive-sop-for-international-study-applications" },
  { title: "NEBOSH Essentials for Modern Workplace Safety", excerpt: "Key NEBOSH principles every safety professional should know, from risk assessment to incident investigation.", category: "Health & Safety", author: "Marcus Vance", date: "Jun 18, 2026", readTime: "12 min read", views: "2.7k", image: "/employees.jpg", slug: "nebosh-essentials-for-modern-workplace-safety" },
  { title: "The Complete Guide to PhD Research Proposals", excerpt: "From identifying research gaps to crafting methodology, this guide walks you through every stage of proposal development.", category: "Academic Support", author: "Prof. James Okafor", date: "Jun 15, 2026", readTime: "9 min read", views: "5.6k", image: "/written.jpg", slug: "complete-guide-phd-research-proposals" },
  { title: "How to Write a CV That Gets Shortlisted", excerpt: "Stand out from the competition with a professionally crafted CV that highlights your achievements and impact.", category: "Professional Writing", author: "Emily Hartwell", date: "Jun 12, 2026", readTime: "5 min read", views: "6.3k", image: "/business.jpg", slug: "write-cv-gets-shortlisted" },
];

const premiumArticles = [
  { title: "Complete Dissertation Writing Guide", price: "$49", category: "Academic Manual", image: "/written.jpg" },
  { title: "NEBOSH Exam Preparation Kit", price: "$79", category: "Safety Handbook", image: "/employees.jpg" },
  { title: "SOP Writing Masterclass", price: "$39", category: "Writing Guide", image: "/business.jpg" },
  { title: "SPSS Data Analysis Handbook", price: "$59", category: "Academic Manual", image: "/written.jpg" },
];

const filterOptions = ["All", "Academic Support", "Health & Safety", "Professional Writing", "Research", "Career Development"];

const tags = [
  "Academic Writing", "Research", "SPSS", "STATA", "Dissertation",
  "NEBOSH", "Risk Assessment", "Health & Safety", "CV Writing",
  "Business Plans", "Grant Writing", "Professional Development",
  "Methodology", "Data Analysis", "Editing", "Proofreading",
];

/* ---------- article card ---------- */

function ArticleCard({ article }: { article: typeof latestArticles[0] }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-[#7c3aed]/30 dark:hover:border-[#a78bfa]/30 transition-all">
      <div className="relative h-48 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c3aed] dark:text-[#a78bfa]">{article.category}</span>
          <span className="text-[10px] text-slate-400">·</span>
          <span className="text-[10px] text-slate-400">{article.readTime}</span>
        </div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#7c3aed] dark:group-hover:text-[#a78bfa] transition-colors">{article.title}</h3>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400">
          <span>{article.author}</span>
          <span>{article.views} views</span>
        </div>
      </div>
    </Link>
  );
}

/* ---------- premium card ---------- */

function PremiumCard({ item }: { item: typeof premiumArticles[0] }) {
  return (
    <div className="group border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-5 hover:border-[#7c3aed] dark:hover:border-[#7c3aed] transition-all flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l3.09 6.26L20 9.27l-5 4.87 1.18 6.88L10 16.51l-6.18 3.25L5 14.14l-5-4.87 6.91-1.01L10 2z" /></svg>
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Premium</span>
      </div>
      <div className="relative h-32 border border-slate-200 dark:border-slate-700 overflow-hidden mb-3">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
          <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
        </div>
      </div>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">{item.category}</span>
      <div className="mt-auto pt-4 flex items-center justify-between">
        <span className="text-lg font-extrabold text-[#7c3aed]">{item.price}</span>
        <Link href="/premium" className="bg-[#7c3aed] text-white text-[10px] font-bold px-4 py-2 hover:bg-[#6d28d9] transition-colors">Unlock</Link>
      </div>
    </div>
  );
}

/* ---------- sidebar ---------- */

function Sidebar() {
  const sidebarPopular = [
    { title: "How to Write a CV That Gets Shortlisted", views: "6.3k" },
    { title: "The Complete Guide to PhD Research Proposals", views: "5.6k" },
    { title: "Writing a Persuasive SOP", views: "4.1k" },
    { title: "Mastering SPSS for Data Analysis", views: "3.2k" },
    { title: "NEBOSH Essentials for Workplace Safety", views: "2.7k" },
  ];

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Search</h4>
        <div className="relative">
          <input type="text" placeholder="Search articles..." className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 pr-10 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#7c3aed]" />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Categories</h4>
        <div className="space-y-2">
          {["Academic Support", "Health & Safety", "Professional Writing", "Research", "Career Development"].map((cat) => (
            <Link key={cat} href="/blog" className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 hover:text-[#7c3aed] dark:hover:text-[#a78bfa] transition-colors">
              <span>{cat}</span>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Popular Posts</h4>
        <div className="space-y-4">
          {sidebarPopular.map((p, i) => (
            <Link key={p.title} href="/blog" className="flex items-start gap-3 group">
              <span className="text-xs font-extrabold text-slate-300 dark:text-slate-600 w-5 shrink-0">0{i + 1}</span>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#7c3aed] dark:group-hover:text-[#a78bfa] transition-colors leading-snug">{p.title}</p>
                <span className="text-[10px] text-slate-400">{p.views} views</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#7c3aed] dark:text-[#a78bfa] mb-2">Newsletter</h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Get weekly insights delivered to your inbox</p>
        <form className="space-y-2">
          <input type="email" placeholder="Your email" className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#7c3aed]" />
          <button type="submit" className="w-full bg-[#7c3aed] text-white text-xs font-bold py-2.5 hover:bg-[#6d28d9] transition-colors">Subscribe</button>
        </form>
      </div>
    </aside>
  );
}

/* ---------- main export ---------- */

export function BlogContent() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? latestArticles
    : latestArticles.filter((a) => a.category === filter);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Articles</span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Latest articles</h2>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
            {filterOptions.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-bold px-3 py-1.5 border transition-colors ${
                  filter === f
                    ? "bg-[#7c3aed] text-white border-[#7c3aed]"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-[#7c3aed] dark:hover:border-[#a78bfa]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.slice(0, 2).map((a) => <ArticleCard key={a.title} article={a} />)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l3.09 6.26L20 9.27l-5 4.87 1.18 6.88L10 16.51l-6.18 3.25L5 14.14l-5-4.87 6.91-1.01L10 2z" /></svg>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Premium</span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">Premium library</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {premiumArticles.slice(0, 2).map((p) => <PremiumCard key={p.title} item={p} />)}
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
