"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does the consultancy process work?",
    a: "Submit your project brief through our booking form. We review your requirements and assign a subject-matter expert within 24 hours. You will receive a detailed proposal with pricing and timeline before work begins.",
  },
  {
    q: "What academic services do you offer?",
    a: "We cover the full academic spectrum: undergraduate projects, master's thesis, PhD dissertation, research proposals, methodology design, statistical analysis (SPSS, STATA, Excel), editing, and proofreading across all major disciplines.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers. Payments are processed through our encrypted gateway. A 50% deposit is required to begin work, with the balance due on delivery.",
  },
  {
    q: "What is your typical turnaround time?",
    a: "Turnaround varies by project scope. Standard academic projects take 7-14 days, while complex dissertations may require 4-8 weeks. We always provide a firm delivery date in your proposal.",
  },
  {
    q: "How do you ensure confidentiality?",
    a: "We operate under strict Non-Disclosure Agreements. All documents are encrypted in transit and at rest. Your work is never shared with third parties, and you retain full ownership of all deliverables.",
  },
  {
    q: "Can I request revisions?",
    a: "Yes, we offer unlimited free revisions until you are fully satisfied with the delivered work. Revision requests must align with the original project brief and scope.",
  },
];

export function AboutFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Frequently asked questions</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Everything you need to know about working with us</p>
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
