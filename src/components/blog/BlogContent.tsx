import Link from "next/link";
import Image from "next/image";

/* ---------- data ---------- */

const featured = {
  title: "How to Structure a Dissertation Proposal with Confidence",
  excerpt: "A well-structured dissertation proposal is the foundation of successful doctoral research. Learn the essential components, common pitfalls, and expert strategies for crafting a proposal that impresses your committee.",
  category: "Academic Support",
  author: "Dr. Sarah Jenkins",
  date: "Jun 24, 2026",
  readTime: "8 min read",
  views: "2.4k",
  image: "/written.jpg",
  slug: "how-to-structure-a-dissertation-proposal-with-confidence",
};

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

const popularArticles = [
  { title: "How to Write a CV That Gets Shortlisted", readTime: "5 min read", views: "6.3k", shares: "1.2k", image: "/business.jpg", slug: "write-cv-gets-shortlisted" },
  { title: "The Complete Guide to PhD Research Proposals", readTime: "9 min read", views: "5.6k", shares: "980", image: "/written.jpg", slug: "complete-guide-phd-research-proposals" },
  { title: "Writing a Persuasive SOP for International Study Applications", readTime: "6 min read", views: "4.1k", shares: "850", image: "/written.jpg", slug: "writing-a-persuasive-sop-for-international-study-applications" },
  { title: "Mastering SPSS for Quantitative Data Analysis", readTime: "10 min read", views: "3.2k", shares: "720", image: "/written.jpg", slug: "mastering-spss-quantitative-analysis" },
];

const recommended = [
  { title: "Literature Review Strategies for Social Sciences", category: "Academic Support", readTime: "7 min read", image: "/written.jpg" },
  { title: "HSE Documentation Best Practices", category: "Health & Safety", readTime: "6 min read", image: "/employees.jpg" },
  { title: "Grant Writing Tips for Researchers", category: "Professional Writing", readTime: "8 min read", image: "/business.jpg" },
  { title: "Understanding Statistical Significance", category: "Academic Support", readTime: "5 min read", image: "/written.jpg" },
];

const tags = [
  "Academic Writing", "Research", "SPSS", "STATA", "Dissertation",
  "NEBOSH", "Risk Assessment", "Health & Safety", "CV Writing",
  "Business Plans", "Grant Writing", "Professional Development",
  "Methodology", "Data Analysis", "Editing", "Proofreading",
];

/* ---------- helpers ---------- */

function CatIcon({ icon }: { icon: string }) {
  const map: Record<string, React.ReactNode> = {
    academic: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />,
    safety: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    writing: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />,
    method: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />,
    data: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
    career: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />,
    news: <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />,
    case: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />,
  };
  return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">{map[icon] || map.academic}</svg>;
}

/* ---------- featured ---------- */

function FeaturedArticle() {
  return (
    <section className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Featured Article</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Editor&apos;s pick</h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="relative h-[280px] lg:h-full min-h-[280px]">
            <Image src={featured.image} alt={featured.title} fill className="object-cover" />
          </div>
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c3aed] dark:text-[#a78bfa] bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 px-3 py-1">{featured.category}</span>
              <span className="text-[10px] text-slate-400">{featured.readTime}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">{featured.title}</h3>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-900 dark:text-white">{featured.author}</span>
              <span>·</span>
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.views} views</span>
            </div>
            <Link
              href={`/blog/${featured.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#7c3aed] dark:text-[#a78bfa] hover:text-[#6d28d9] dark:hover:text-[#c4b5fd] transition-colors group"
            >
              Continue Reading
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- categories ---------- */

function CategoryCards() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Categories</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Explore by topic</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Find the right content for your needs</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.title} href="/blog" className="group relative h-48 border border-slate-200 dark:border-slate-800 overflow-hidden">
              <Image src={cat.image} alt={cat.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex h-8 w-8 items-center justify-center bg-[#7c3aed] text-white mb-2">
                  <CatIcon icon={cat.icon} />
                </div>
                <h3 className="text-sm font-bold text-white">{cat.title}</h3>
                <p className="text-[10px] text-slate-300 mt-0.5">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <div className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 flex flex-col group hover:border-[#7c3aed] dark:hover:border-[#7c3aed] transition-all">
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

/* ---------- sections ---------- */

function LatestArticles() {
  return (
    <section id="latest">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Articles</span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Latest articles</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Sort by</span>
          <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <option>Newest</option>
            <option>Most Popular</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestArticles.map((a) => <ArticleCard key={a.title} article={a} />)}
      </div>
    </section>
  );
}

function PremiumSection() {
  return (
    <section className="mt-16">
      <div className="bg-gradient-to-r from-[#7c3aed]/5 to-[#5b21b6]/5 dark:from-[#7c3aed]/10 dark:to-[#5b21b6]/10 border border-slate-200 dark:border-slate-800 p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Premium</span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Premium library</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Unlock peer-reviewed guides, templates, and comprehensive resources</p>
          </div>
          <Link href="/premium" className="bg-[#7c3aed] px-6 py-3 text-sm font-bold text-white hover:bg-[#6d28d9] transition-all shrink-0 text-center">Browse All Premium</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {premiumArticles.map((p) => <PremiumCard key={p.title} item={p} />)}
        </div>
      </div>
    </section>
  );
}

function PopularArticles() {
  return (
    <section className="mt-16">
      <div className="flex items-center gap-2 mb-8">
        <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" /></svg>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Trending</span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Popular articles</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularArticles.map((a, i) => (
          <Link key={a.title} href={`/blog/${a.slug}`} className="group border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-[#7c3aed]/30 dark:hover:border-[#a78bfa]/30 transition-all">
            <div className="relative h-36 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
              <Image src={a.image} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5">#{i + 1}</div>
            </div>
            <div className="p-4">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#7c3aed] dark:group-hover:text-[#a78bfa] transition-colors">{a.title}</h3>
              <div className="mt-3 flex items-center justify-between text-[9px] text-slate-400">
                <span>{a.readTime}</span>
                <span>{a.views} views</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RecommendedReading() {
  return (
    <section className="mt-16">
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Recommended</span>
      <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">You might also like</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommended.map((a) => (
          <Link key={a.title} href="/blog" className="group border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-[#7c3aed]/30 dark:hover:border-[#a78bfa]/30 transition-all">
            <div className="relative h-36 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
              <Image src={a.image} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#7c3aed]">{a.category}</span>
              <h3 className="mt-1 text-xs font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#7c3aed] dark:group-hover:text-[#a78bfa] transition-colors">{a.title}</h3>
              <span className="mt-2 block text-[9px] text-slate-400">{a.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PopularTags() {
  return (
    <section className="mt-16">
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Tags</span>
      <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Browse by topic</h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag} href="/blog" className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-[#7c3aed] hover:text-white dark:hover:bg-[#7c3aed] dark:hover:text-white transition-colors">
            {tag}
          </Link>
        ))}
      </div>
    </section>
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

      {/* CTA */}
      <div className="bg-slate-900 dark:bg-black p-6 border border-slate-800">
        <h4 className="text-sm font-bold text-white">Need expert help?</h4>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed">Book a consultation with our PhD-qualified academics and certified HSE professionals.</p>
        <Link href="/book" className="mt-4 block text-center bg-[#7c3aed] text-white text-xs font-bold py-2.5 hover:bg-[#6d28d9] transition-colors">Book Consultation</Link>
      </div>
    </aside>
  );
}

/* ---------- main export ---------- */

export function BlogContent() {
  return (
    <>
      <FeaturedArticle />
      <CategoryCards />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-8">
            <LatestArticles />
            <PremiumSection />
            <PopularArticles />
            <RecommendedReading />
            <PopularTags />
          </div>
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
