"use client";

import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <section className="bg-slate-900 dark:bg-black py-20 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Stay informed with expert insights</h2>
            <p className="mt-3 text-sm text-slate-400 max-w-md">Receive peer-reviewed guidance, safety regulatory updates, and writing advice straight to your inbox monthly.</p>
          </div>
          <div className="border border-slate-700 bg-slate-800/50 p-6">
            {subscribed ? (
              <div className="text-center py-4">
                <svg className="h-10 w-10 text-green-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-bold text-green-400">Thank you for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="flex-1 bg-slate-800 border border-slate-700 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#7c3aed]" />
                <button type="submit" className="bg-[#7c3aed] px-6 py-3 text-sm font-bold text-white hover:bg-[#6d28d9] transition-colors shrink-0">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
