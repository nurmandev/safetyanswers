import Link from "next/link";

export function ContactHero() {
  return (
    <section className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-[#7c3aed] dark:hover:text-[#a78bfa] transition-colors">Home</Link>
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-[#7c3aed] dark:text-[#a78bfa]">Contact</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">Get in touch</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-xl">
          Have a question or ready to start your project? Reach out to our team and we&apos;ll respond within 24 hours.
        </p>
      </div>
    </section>
  );
}
