import Image from "next/image";

export function ServicesIntro() {
  return (
    <section className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">What We Deliver</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Expert services tailored to your goals
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Whether you are a student working on a dissertation, a professional seeking a compelling CV, or an organization requiring certified HSE compliance, our team delivers results that exceed expectations.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              We serve undergraduate and postgraduate students, researchers, entrepreneurs, corporations, and government agencies across 30+ countries. Every engagement is assigned to a subject-matter expert with verified credentials and a proven track record.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Our integrated approach means you get end-to-end support — from initial consultation through final delivery, with unlimited revisions and responsive support at every stage.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-slate-200 dark:border-slate-800 pt-8">
              {[
                { value: "30+", label: "Services" },
                { value: "500+", label: "Projects Done" },
                { value: "98%", label: "Satisfaction" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-[#7c3aed] dark:text-[#a78bfa]">{s.value}</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[480px] border border-slate-200 dark:border-slate-700 shadow-lg">
            <Image src="/services.jpg" alt="Our consultancy services" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
