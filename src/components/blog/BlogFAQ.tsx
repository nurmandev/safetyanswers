"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Are all articles on the blog free to read?",
    a: "Yes, all standard articles are completely free to read. We also offer premium articles that provide in-depth guides, templates, and comprehensive resources available for a one-time purchase.",
  },
  {
    q: "What is included in premium articles?",
    a: "Premium articles include comprehensive guides, ready-to-use templates, detailed checklists, and exclusive resources not available in free articles. Each premium article is locked and can be unlocked with a one-time payment.",
  },
  {
    q: "Do I need a membership to read articles?",
    a: "No membership is required. All free articles are accessible to everyone without registration. Premium articles require a one-time payment per article. You can create an account to track your purchases and downloads.",
  },
  {
    q: "Can I download articles for offline reading?",
    a: "Free articles can be read online in your browser. Premium articles are available for download as PDF files after purchase, allowing you to read them offline at your convenience.",
  },
  {
    q: "How often are new articles published?",
    a: "We publish new articles weekly, covering academic research, professional writing, health & safety, career development, and industry insights. Subscribe to our newsletter to receive updates.",
  },
  {
    q: "Can I request a specific topic for an article?",
    a: "Absolutely. We welcome topic suggestions from our readers. Contact us through our form with your request, and our editorial team will consider it for future publications.",
  },
];

export function BlogFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Frequently asked questions</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Everything you need to know about our blog and premium content</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex items-center justify-between w-full p-6 text-left">
                <span className="text-sm font-bold text-slate-900 dark:text-white pr-4">{faq.q}</span>
                <svg className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
