import Link from "next/link";

const services = [
  {
    title: "Academic Consultancy",
    description: "Strategic dissertation, thesis, and research proposal support. Editing, formatting, and advanced statistical data analysis.",
    href: "/services/academic",
    items: ["Undergraduate Projects", "Master's Thesis", "PhD Proposal", "Dissertation Writing", "Literature Review", "Research Methodology", "Data Analysis"],
  },
  {
    title: "Professional Writing",
    description: "Premium CVs, persuasive SOPs, compelling personal statements, grant applications, and high-impact business proposals.",
    href: "/services/professional-writing",
    items: ["CV Writing", "Personal Statement", "Statement of Purpose", "Grant Proposal", "Business Proposal", "Business Plan", "Technical Reports"],
  },
  {
    title: "Health & Safety Consultancy",
    description: "Comprehensive HSE documentation, risk assessments, NEBOSH writing guidance, and organizational safety audit preparation.",
    href: "/services/health-safety",
    items: ["NEBOSH Writer", "Risk Assessment", "HSE Documentation", "Safety Consultancy", "Compliance", "Training"],
  },
];

export function ServicesOverview() {
  return (
    <section className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Core Capabilities</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Professional consultancy services.</h2>
          </div>
          <Link href="/services" className="group inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            View All Services
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2.3" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <div key={service.title} className="group border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-[#7c3aed] dark:hover:border-[#7c3aed] transition-all duration-300">
              <div className="mb-6 flex h-12 w-12 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] group-hover:bg-[#7c3aed] group-hover:text-white transition-colors duration-300">
                <span className="font-mono text-sm font-bold">{`0${i + 1}`}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{service.description}</p>
              <ul className="mt-6 space-y-2">
                {service.items.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <svg className="h-3.5 w-3.5 text-[#7c3aed] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={service.href} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#7c3aed] dark:text-[#a78bfa] group-hover:underline">
                Learn More
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
