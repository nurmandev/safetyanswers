"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  if (subscribed) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 p-4 text-center">
        <p className="text-xs font-bold text-green-400">
          Thank you for subscribing!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        className="w-full bg-slate-800/80 border border-slate-700 px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
      />
      <button
        type="submit"
        className="bg-white px-5 py-3 text-xs font-bold text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}
