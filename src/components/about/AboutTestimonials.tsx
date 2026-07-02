"use client";

import { useState } from "react";

const testimonials = [
  {
    quote: "safetyanswers provided exceptional dissertation support. My PhD supervisor was impressed by the depth of literature review and statistical rigor. I graduated with distinction.",
    author: "Dr. Sarah Jenkins",
    role: "PhD Graduate, Public Health",
    country: "United Kingdom",
    rating: 5,
    initials: "SJ",
  },
  {
    quote: "Their NEBOSH and compliance team helped us achieve a zero-incident audit. The documentation was thorough, professional, and perfectly aligned with regulatory standards.",
    author: "Marcus Vance",
    role: "HSE Director",
    country: "United States",
    rating: 5,
    initials: "MV",
  },
  {
    quote: "My CV and personal statement were completely transformed. I received interview invitations from three top business schools within weeks. Worth every penny.",
    author: "Amara Okafor",
    role: "MBA Candidate, London Business School",
    country: "Nigeria",
    rating: 5,
    initials: "AO",
  },
  {
    quote: "The editing service saved my dissertation. The feedback was constructive, detailed, and improved my writing significantly. Highly recommend for any postgraduate student.",
    author: "James Mwangi",
    role: "PhD Candidate",
    country: "Kenya",
    rating: 5,
    initials: "JM",
  },
  {
    quote: "We engaged safetyanswers for a comprehensive HSE policy overhaul. Their consultants were knowledgeable, responsive, and delivered well ahead of schedule.",
    author: "Lisa van der Berg",
    role: "Operations Director",
    country: "Netherlands",
    rating: 5,
    initials: "LV",
  },
];

export function AboutTestimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Testimonials</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">What our clients say</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Real feedback from clients across 30+ countries</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] text-sm font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t.author}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.country}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, r) => (
                      <svg key={r} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
