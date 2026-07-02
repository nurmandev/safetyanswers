import Image from "next/image";

export function CompanyIntro() {
  return (
    <section className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Who We Are</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Bridging academic excellence and workplace safety
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              safetyanswers is a premium consultancy that brings together PhD-qualified academics, certified HSE professionals, and expert writers under one roof. We serve students, researchers, corporations, and public-sector organizations who demand rigorous, ethical, and results-driven support.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Our team spans multiple disciplines — from data science and public health to engineering, business management, and occupational safety. Every engagement is assigned to a subject-matter expert with proven credentials and a track record of delivering excellence.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              We serve clients across 30+ countries, including top-tier universities, multinational corporations, government agencies, and solo entrepreneurs — all united by a commitment to quality and integrity.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-slate-200 dark:border-slate-800 pt-8">
              {[
                { value: "30+", label: "Countries Served" },
                { value: "500+", label: "Projects Completed" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "10+", label: "Years of Expertise" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-[#7c3aed] dark:text-[#a78bfa]">{s.value}</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[520px] border border-slate-200 dark:border-slate-700 shadow-lg">
            <Image src="/employees.jpg" alt="Our team of professionals" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
