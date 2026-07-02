const testimonials = [
  {
    quote: "The SPSS analysis team was exceptional. They handled my complex dataset with precision and provided clear interpretation that strengthened my dissertation significantly.",
    author: "Dr. Amina Yusuf",
    country: "Nigeria",
    service: "Data Analysis",
    rating: 5,
    initials: "AY",
  },
  {
    quote: "safetyanswers transformed my CV and LinkedIn profile. I started receiving recruiter messages within a week. The quality was far beyond what I expected.",
    author: "Carlos Mendez",
    country: "Spain",
    service: "Professional Writing",
    rating: 5,
    initials: "CM",
  },
  {
    quote: "Our HSE documentation was completely overhauled. The consultants were thorough, professional, and delivered everything ahead of schedule. Highly recommend.",
    author: "Priya Sharma",
    country: "India",
    service: "Health & Safety",
    rating: 5,
    initials: "PS",
  },
  {
    quote: "My PhD dissertation was completed to an exceptionally high standard. The literature review was comprehensive and the methodology was rigorous and well-structured.",
    author: "James Thompson",
    country: "United Kingdom",
    service: "Academic Consultancy",
    rating: 5,
    initials: "JT",
  },
  {
    quote: "The risk assessment and compliance audit services were instrumental in our ISO 45001 certification. The team's expertise in safety management is outstanding.",
    author: "Fatima Al-Rashid",
    country: "UAE",
    service: "Health & Safety",
    rating: 5,
    initials: "FA",
  },
  {
    quote: "My SOP and personal statement were beautifully written. I received admission offers from three top universities. Thank you for the exceptional work.",
    author: "Wei Chen",
    country: "China",
    service: "Professional Writing",
    rating: 5,
    initials: "WC",
  },
];

export function ServicesTestimonials() {
  return (
    <section className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Client Success Stories</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Trusted by clients worldwide</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Real results from real clients across 30+ countries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] text-xs font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{t.author}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{t.country}</span>
                    <span className="text-[10px] font-semibold text-[#7c3aed] dark:text-[#a78bfa]">{t.service}</span>
                  </div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, r) => (
                    <svg key={r} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-xs italic text-slate-600 dark:text-slate-400 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
