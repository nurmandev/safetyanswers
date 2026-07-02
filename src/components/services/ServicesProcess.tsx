const steps = [
  { step: 1, title: "Choose a Service", desc: "Browse our service categories and select the one that best matches your needs.", icon: "choose" },
  { step: 2, title: "Submit Requirements", desc: "Provide your project brief, academic level, deadline, and any specific instructions.", icon: "submit" },
  { step: 3, title: "Upload Files", desc: "Securely upload reference materials, guidelines, rubrics, and supporting documents.", icon: "upload" },
  { step: 4, title: "Receive Quotation", desc: "Get a detailed proposal with pricing, timeline, and deliverables within 24 hours.", icon: "quote" },
  { step: 5, title: "Project Execution", desc: "Your assigned expert begins work with regular progress updates and milestone reviews.", icon: "exec" },
  { step: 6, title: "Delivery & Support", desc: "Receive your completed work with unlimited revisions and ongoing post-delivery support.", icon: "deliver" },
];

function StepIcon({ icon }: { icon: string }) {
  const paths: Record<string, React.ReactNode> = {
    choose: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    submit: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    upload: <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />,
    quote: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75c0 .414.336.75.75.75h-1.5m0 0h-1.5" />,
    exec: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />,
    deliver: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  };
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      {paths[icon] || paths.choose}
    </svg>
  );
}

export function ServicesProcess() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Our Process</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">How our services work</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">From selecting a service to final delivery in six simple steps</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-12 h-0.5 bg-slate-200 dark:bg-slate-700 -translate-x-6" />
              )}
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#7c3aed] dark:bg-[#7c3aed] text-white shadow-lg shadow-[#7c3aed]/20">
                  <StepIcon icon={s.icon} />
                </div>
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7c3aed] dark:text-[#a78bfa]">Step 0{s.step}</span>
                  <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
