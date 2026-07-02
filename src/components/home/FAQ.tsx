"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does the consultancy booking process work?",
    a: "Every engagement starts with a strategic project review. Submit your brief, deadline, and reference files via our Booking Form. Our coordinating consultant will review your material and assign a subject-matter expert within 24 hours.",
  },
  {
    q: "Is my research data and organizational documentation kept confidential?",
    a: "Absolutely. We operate under strict Non-Disclosure Agreements (NDAs). All uploaded documents, academic drafts, and corporate reports are encrypted in transit and at rest. We never share your work with third parties.",
  },
  {
    q: "How do I access premium educational resources and articles?",
    a: "You can browse and purchase individual premium articles directly. Once payment is processed through our secure gateway, the article is unlocked and remains permanently accessible inside your user account dashboard.",
  },
  {
    q: "What is your revision and refund policy?",
    a: "We offer unlimited free revisions until you are satisfied. If the work does not meet the agreed brief, we provide a full refund within 14 days of project initiation.",
  },
  {
    q: "How do you ensure plagiarism-free work?",
    a: "Every project is written from scratch and passed through advanced plagiarism detection software. You receive a detailed originality report with your final delivery.",
  },
  {
    q: "Can I communicate directly with my assigned consultant?",
    a: "Yes. Once your project is assigned, you get direct access to your consultant via our messaging system. You can share feedback, ask questions, and track progress in real-time.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Got questions? We have answers.</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
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
