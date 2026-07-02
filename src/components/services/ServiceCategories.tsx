import Link from "next/link";

const categories = [
  {
    title: "Academic Consultancy",
    desc: "End-to-end academic support from undergraduate projects to PhD dissertations, with rigorous research methodology, statistical analysis, and expert editing.",
    count: "15 Services",
    href: "#academic",
    icon: "academic",
  },
  {
    title: "Professional Writing",
    desc: "Compelling CVs, persuasive Statements of Purpose, grant proposals, business plans, and technical reports crafted by experienced professional writers.",
    count: "7 Services",
    href: "#writing",
    icon: "writing",
  },
  {
    title: "Health & Safety Consultancy",
    desc: "Certified HSE professionals delivering NEBOSH support, risk assessments, compliance audits, safety training, and complete HSE documentation.",
    count: "8 Services",
    href: "#safety",
    icon: "safety",
  },
];

function CatIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    academic: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a9 9 0 0 1 9 9m-9-9a9 9 0 0 0-9 9" />
      </>
    ),
    writing: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </>
    ),
    safety: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </>
    ),
  };
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      {icons[icon]}
    </svg>
  );
}

export function ServiceCategories() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Our Expertise</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Featured service categories</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Three practice areas, one standard of excellence</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.title} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 flex flex-col hover:border-[#7c3aed]/30 dark:hover:border-[#a78bfa]/30 transition-colors">
              <div className="flex h-14 w-14 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] mb-6">
                <CatIcon icon={cat.icon} />
              </div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{cat.title}</h3>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7c3aed] dark:text-[#a78bfa] bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 px-3 py-1">{cat.count}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">{cat.desc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={cat.href}
                  className="bg-[#7c3aed] px-5 py-3 text-xs font-bold text-white hover:bg-[#6d28d9] transition-all"
                >
                  Learn More
                </Link>
                <Link
                  href="/book"
                  className="border border-slate-300 dark:border-slate-600 px-5 py-3 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
