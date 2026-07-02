import Link from "next/link";
import Image from "next/image";

const articles = [
  { title: "How to structure a dissertation proposal with confidence", category: "Academic", readTime: "8 min read", image: "/written.jpg" },
  { title: "NEBOSH essentials for modern workplace safety teams", category: "Health & Safety", readTime: "6 min read", image: "/business.jpg" },
  { title: "Writing a persuasive SOP for international study applications", category: "Writing", readTime: "10 min read", image: "/written.jpg" },
  { title: "Understanding risk assessment methodologies for HSE compliance", category: "Health & Safety", readTime: "7 min read", image: "/employees.jpg" },
];

const premium = [
  { title: "Complete Dissertation Writing Guide", price: "$49", category: "Academic Manual" },
  { title: "NEBOSH Exam Preparation Kit", price: "$79", category: "Safety Handbook" },
  { title: "SOP Writing Masterclass", price: "$39", category: "Writing Guide" },
  { title: "SPSS Data Analysis Handbook", price: "$59", category: "Academic Manual" },
];

export function FeaturedArticles() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Articles</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Featured Articles</h2>
          </div>
          <Link href="/blog" className="text-sm font-bold text-[#7c3aed] dark:text-[#a78bfa] hover:underline">View all articles →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((a) => (
            <Link key={a.title} href="/blog" className="group border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
                <Image src={a.image} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c3aed]">{a.category}</span>
                  <span className="text-[10px] text-slate-400">·</span>
                  <span className="text-[10px] text-slate-400">{a.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#7c3aed] dark:group-hover:text-[#a78bfa] transition-colors">{a.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PremiumArticles() {
  return (
    <section className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Premium</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Premium Library</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Unlock peer-reviewed guidance and professional templates</p>
          </div>
          <Link href="/premium" className="text-sm font-bold text-[#7c3aed] dark:text-[#a78bfa] hover:underline">Browse all premium →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {premium.map((p) => (
            <div key={p.title} className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 flex flex-col justify-between group hover:border-[#7c3aed] dark:hover:border-[#7c3aed] transition-all">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l3.09 6.26L20 9.27l-5 4.87 1.18 6.88L10 16.51l-6.18 3.25L5 14.14l-5-4.87 6.91-1.01L10 2z" /></svg>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Premium</span>
                </div>
                <svg className="h-8 w-8 text-slate-300 dark:text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{p.title}</h3>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">{p.category}</span>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-extrabold text-[#7c3aed]">{p.price}</span>
                <Link href="/premium" className="bg-[#7c3aed] text-white text-[10px] font-bold px-4 py-2 hover:bg-[#6d28d9] transition-colors">Unlock</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
