import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#7c3aed]/5 to-transparent dark:from-[#7c3aed]/10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          {/* Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
              Rigorous academic support.<br />
              <span className="text-[#7c3aed] dark:text-[#a78bfa]">Safe workplaces.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">
              We bridge the gap between academic excellence and operational compliance.
              Get certified support in health & safety audits, data analysis, and professional writing.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#7c3aed] px-8 py-4 text-sm font-bold text-white hover:bg-[#6d28d9] transition-all shadow-lg shadow-[#7c3aed]/25"
              >
                Book a Consultation
              </Link>
              <Link
                href="/blog"
                className="border-2 border-slate-300 dark:border-slate-600 px-8 py-4 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Browse Articles
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-200 dark:border-slate-800 pt-8 max-w-lg">
              {[
                { value: "500+", label: "Projects" },
                { value: "98%", label: "Success Rate" },
                { value: "24/7", label: "Support" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] lg:h-[560px] border border-slate-200 dark:border-slate-700 shadow-xl">
              <Image src="/business.jpg" alt="Executive Boardroom Meeting" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
