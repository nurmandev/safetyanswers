"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What are your typical turnaround times?",
    a: "Turnaround varies by service type and complexity. Academic projects typically take 5–30 days, professional writing 3–14 days, and HSE consultancy 5–21 days. We provide a firm delivery date in your proposal before work begins.",
  },
  {
    q: "How is pricing determined?",
    a: "Pricing is based on project scope, academic level, word count, deadline urgency, and complexity. You receive a detailed quotation after our initial review. There are no hidden fees — the quoted price is the final price.",
  },
  {
    q: "How do you ensure confidentiality?",
    a: "We operate under strict Non-Disclosure Agreements (NDAs). All files are encrypted in transit and at rest. Your identity, documents, and project details are never shared with third parties.",
  },
  {
    q: "Can I request revisions after delivery?",
    a: "Yes, we offer unlimited free revisions on all services. Revision requests must stay within the original project scope. We continue revising until you are fully satisfied with the delivered work.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers. A 50% deposit is required to begin work, with the balance due upon final delivery.",
  },
  {
    q: "How does the consultation process work?",
    a: "Submit your project brief through our booking form. A subject-matter expert reviews your requirements and responds within 24 hours with a detailed proposal including scope, methodology, pricing, and timeline.",
  },
  {
    q: "What file formats do you deliver?",
    a: "We deliver in Microsoft Word (DOCX) and PDF formats by default. Additional formats (LaTeX, PowerPoint, Excel) are available upon request at no extra charge.",
  },
  {
    q: "What support do you offer after delivery?",
    a: "We provide unlimited post-delivery support including revisions, clarifications, and format adjustments. Your dedicated consultant remains available throughout the revision period.",
  },
];

export function ServicesFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Frequently asked questions</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Answers to common questions about our services</p>
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
