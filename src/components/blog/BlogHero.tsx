import Link from "next/link";
import Image from "next/image";

export function BlogHero() {
  return (
    <section className="relative bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/business.jpg" alt="Blog" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/70 dark:from-slate-950/95 dark:via-slate-950/90 dark:to-slate-950/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-[#7c3aed] dark:hover:text-[#a78bfa] transition-colors">Home</Link>
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-[#7c3aed] dark:text-[#a78bfa]">Blog</span>
        </nav>

        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa] bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 px-4 py-2 inline-block mb-6">
            Knowledge Hub
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
            Insights, Articles & <span className="text-[#7c3aed] dark:text-[#a78bfa]">Resources</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">
            Expert guidance on academic research, professional writing, and workplace safety — written by PhD-qualified academics and certified HSE professionals.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#latest"
              className="bg-[#7c3aed] px-8 py-4 text-sm font-bold text-white hover:bg-[#6d28d9] transition-all shadow-lg shadow-[#7c3aed]/25"
            >
              Browse Articles
            </Link>
            <Link
              href="/premium"
              className="border-2 border-slate-300 dark:border-slate-600 px-8 py-4 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Premium Articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
