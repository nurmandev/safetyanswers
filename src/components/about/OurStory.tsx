const milestones = [
  {
    year: "2014",
    title: "Founded",
    desc: "safetyanswers was established with a vision to bridge the gap between academic research and practical workplace safety consultancy.",
  },
  {
    year: "2016",
    title: "First 100 Projects",
    desc: "Reached the milestone of 100 completed projects across academic writing, data analysis, and HSE documentation.",
  },
  {
    year: "2018",
    title: "International Expansion",
    desc: "Expanded operations to serve clients in 15+ countries, hiring PhD-level consultants and certified HSE professionals.",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    desc: "Launched the online platform with secure client portals, real-time project tracking, and encrypted document delivery.",
  },
  {
    year: "2022",
    title: "500+ Projects Delivered",
    desc: "Surpassed 500 successful projects with a 98% client satisfaction rate. Introduced premium article publishing.",
  },
  {
    year: "2024",
    title: "Global Recognition",
    desc: "Recognized as a trusted consultancy partner by universities, corporations, and government agencies across 30+ countries.",
  },
  {
    year: "2025+",
    title: "The Future",
    desc: "Expanding our service portfolio with AI-enhanced research tools, compliance automation, and strategic partnerships worldwide.",
  },
];

export function OurStory() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Our Story</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">From vision to global impact</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">A decade of growth, excellence, and client trust</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700 -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-16">
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative flex flex-col lg:flex-row items-start gap-8 lg:gap-16 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                {/* Content */}
                <div className={`lg:w-1/2 ${i % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                  <div className={`bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 shadow-sm inline-block max-w-md ${i % 2 === 0 ? "lg:ml-auto" : ""}`}>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7c3aed] dark:text-[#a78bfa]">{m.year}</span>
                    <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{m.title}</h3>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10">
                  <div className="h-5 w-5 bg-[#7c3aed] dark:bg-[#a78bfa] border-4 border-slate-50 dark:border-slate-900 shadow-sm" />
                </div>

                {/* Spacer for the other side */}
                <div className="hidden lg:block lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
