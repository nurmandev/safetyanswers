const steps = [
  { step: 1, title: "Choose Service", desc: "Browse our services and select the one that matches your needs" },
  { step: 2, title: "Submit Details", desc: "Provide project brief, deadline, and any specific requirements" },
  { step: 3, title: "Upload Files", desc: "Securely upload your reference materials and supporting documents" },
  { step: 4, title: "Make Payment", desc: "Complete secure payment through our encrypted payment gateway" },
  { step: 5, title: "Work Begins", desc: "Your assigned consultant starts working on your project immediately" },
  { step: 6, title: "Receive Delivery", desc: "Get your completed work delivered before the deadline with revisions included" },
];

export function HowItWorks() {
  return (
    <section className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Process</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">How It Works</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">From brief to delivery in six simple steps</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-12 h-0.5 bg-slate-200 dark:bg-slate-700 -translate-x-6" />
              )}
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#7c3aed] dark:bg-[#7c3aed] text-white text-lg font-extrabold shadow-lg shadow-[#7c3aed]/20">0{s.step}</div>
                <div className="pt-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{s.title}</h3>
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
