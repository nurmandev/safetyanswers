"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center bg-[#7c3aed] text-white shadow-lg mb-4">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795m-9 0L9.814 4.096 9.813 4.1a.75.75 0 011.396-.135L21 21M9.813 15.904L21 21m-11.188-5.096A9.75 9.75 0 013 12c0-5.385 4.365-9.75 9.75-9.75 2.11 0 4.06.669 5.64 1.8" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Reset your password</h1>
          <p className="text-sm text-slate-500 mt-1">
            {sent ? "Check your email for the reset link" : "Enter your email and we'll send you a reset link"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 shadow-sm p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="inline-flex h-14 w-14 items-center justify-center bg-green-50 text-green-600 mb-4">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                We&apos;ve sent a password reset link to your email. Please check your inbox and follow the instructions.
              </p>
              <button
                onClick={() => setSent(false)}
                className="w-full bg-[#7c3aed] py-3 text-sm font-bold text-white hover:bg-[#6d28d9] transition-all shadow-sm"
              >
                Send again
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Email address
                </label>
                <input
                  type="email"
                  className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all placeholder:text-slate-400"
                  placeholder="you@example.com"
                />
              </div>

              <button className="w-full bg-[#7c3aed] py-3 text-sm font-bold text-white hover:bg-[#6d28d9] transition-all shadow-sm">
                Send reset link
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Remember your password?{" "}
          <Link href="/login" className="font-bold text-[#7c3aed] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
