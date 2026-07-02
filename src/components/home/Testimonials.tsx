"use client";

import { useState } from "react";

const testimonials = [
  {
    quote: "Their data analysis support was instrumental in my doctoral dissertation. The SPSS validation was rigorous and mathematically flawless. I received my PhD with distinction.",
    author: "Dr. Sarah Jenkins",
    role: "PhD Graduate, Public Health",
    rating: 5,
  },
  {
    quote: "Superb NEBOSH and compliance guidance. They helped us overhaul our workplace risk assessments, ensuring a perfect pass rate in our external audit.",
    author: "Marcus Vance",
    role: "HSE Director, Vancor Group",
    rating: 5,
  },
  {
    quote: "The professional writing team transformed my CV and personal statement. I received three interview invitations within two weeks of submitting my applications.",
    author: "Amara Okafor",
    role: "MBA Candidate, London Business School",
    rating: 5,
  },
  {
    quote: "Their dissertation editing service saved me months of work. The structure and clarity improvements were remarkable. Highly recommended for any postgraduate student.",
    author: "James Mwangi",
    role: "PhD Candidate, University of Cape Town",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Testimonials</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Trusted by academics and business leaders</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, r) => (
                    <svg key={r} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{t.author}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
