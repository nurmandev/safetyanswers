"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does your pricing work?",
    a: "Pricing is based on project scope, academic level, complexity, and deadline. You receive a detailed quotation after our initial project review. The quoted price is the final price — no hidden fees or surprises.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Stripe (credit/debit cards), PayPal, Paystack, and Flutterwave. All payments are processed through encrypted gateways with instant confirmation and receipts.",
  },
  {
    q: "What is your refund policy?",
    a: "If the delivered work does not meet the agreed brief, we provide a full refund within 14 days of project initiation. Refund requests must be made in writing with clear justification.",
  },
  {
    q: "Are revisions included in the price?",
    a: "Yes, all plans include revisions. The number of revision rounds depends on your plan — Starter includes 1 round, Professional includes unlimited revisions, and Enterprise includes unlimited revisions with priority turnaround.",
  },
  {
    q: "Do you charge extra for urgent projects?",
    a: "Expedited delivery may incur a surcharge depending on the project scope and timeline. We provide the adjusted pricing in your quotation before work begins, so there are no surprises.",
  },
  {
    q: "Do you offer discounts for returning clients?",
    a: "Yes, we offer loyalty discounts for returning clients and bundle discounts for multiple services. Contact our sales team for a customized quote.",
  },
  {
    q: "Is the initial consultation free?",
    a: "Yes, all initial consultations are completely free. We review your project requirements and provide a detailed quotation with no obligation to proceed.",
  },
  {
    q: "Do you provide invoices for business clients?",
    a: "Yes, we provide professional invoices for all transactions. Invoices include all necessary details for business expense reporting and accounting purposes.",
  },
];

export function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Pricing FAQs</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Everything you need to know about our pricing and payment process</p>
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
