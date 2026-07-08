"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api-client";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided.");
      return;
    }

    const verify = async () => {
      const res = await api.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);
      if (res.success) {
        setStatus("success");
        setMessage("Your email has been verified successfully!");
      } else {
        setStatus("error");
        setMessage(res.message || "Verification failed. The link may be expired.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center bg-[#7c3aed] text-white shadow-lg mb-4">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795m-9 0L9.814 4.096 9.813 4.1a.75.75 0 011.396-.135L21 21M9.813 15.904L21 21m-11.188-5.096A9.75 9.75 0 013 12c0-5.385 4.365-9.75 9.75-9.75 2.11 0 4.06.669 5.64 1.8" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Email Verification</h1>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm p-8 text-center">
          {status === "verifying" && (
            <div className="py-8">
              <div className="inline-flex h-14 w-14 items-center justify-center bg-purple-50 text-[#7c3aed] mb-4 animate-pulse">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
              </div>
              <p className="text-sm text-slate-600">Verifying your email...</p>
            </div>
          )}

          {status === "success" && (
            <div className="py-4">
              <div className="inline-flex h-14 w-14 items-center justify-center bg-green-50 text-green-600 mb-4">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-green-600 font-semibold mb-6">{message}</p>
              <Link
                href="/login"
                className="inline-block w-full bg-[#7c3aed] py-3 text-sm font-bold text-white hover:bg-[#6d28d9] transition-all shadow-sm"
              >
                Sign in to your account
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="py-4">
              <div className="inline-flex h-14 w-14 items-center justify-center bg-red-50 text-red-600 mb-4">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-sm text-red-600 font-semibold mb-2">{message}</p>
              <p className="text-xs text-slate-500 mb-6">
                You can request a new verification link below.
              </p>
              <Link
                href="/login"
                className="inline-block w-full bg-[#7c3aed] py-3 text-sm font-bold text-white hover:bg-[#6d28d9] transition-all shadow-sm"
              >
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
