"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Send a Message</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Let&apos;s start a conversation</h2>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Fill in the form and our team will get back to you within 24 hours. Whether you need academic support, professional writing, or HSE consultancy — we&apos;re here to help.
            </p>

            <div className="mt-10 space-y-6">
              {[
                { label: "Quick Response", desc: "We reply within 24 hours on business days" },
                { label: "Expert Matching", desc: "Your query is routed to the right subject-matter expert" },
                { label: "Free Consultation", desc: "Initial consultations are always complimentary" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] mt-0.5">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 lg:p-10">
            {sent ? (
              <div className="text-center py-12">
                <div className="flex h-16 w-16 items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mx-auto mb-6">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message sent!</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Thank you for reaching out. Our team will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">First Name</label>
                    <input required className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#7c3aed]" placeholder="John" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">Last Name</label>
                    <input required className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#7c3aed]" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">Email</label>
                  <input required type="email" className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#7c3aed]" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">Service Interested In</label>
                  <select className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#7c3aed]">
                    <option>Academic Consultancy</option>
                    <option>Professional Writing</option>
                    <option>Health & Safety Consultancy</option>
                    <option>Multiple Services</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">Message</label>
                  <textarea required rows={5} className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#7c3aed] resize-y" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" className="w-full bg-[#7c3aed] text-white text-sm font-bold py-3.5 hover:bg-[#6d28d9] transition-colors shadow-lg shadow-[#7c3aed]/20">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
