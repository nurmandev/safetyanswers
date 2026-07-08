"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/api-client";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid reset link. No token provided.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    const res = await api.post("/auth/reset-password", { token, password });
    if (res.success) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="text-center py-4">
        <div className="inline-flex h-14 w-14 items-center justify-center bg-red-50 text-red-600 mb-4">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-sm text-red-600 font-semibold mb-4">Invalid or missing reset token.</p>
        <Link href="/forgot-password" className="text-[#7c3aed] font-bold text-sm hover:underline">
          Request a new reset link
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="inline-flex h-14 w-14 items-center justify-center bg-green-50 text-green-600 mb-4">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm text-green-600 font-semibold mb-2">Password reset successful!</p>
        <p className="text-xs text-slate-500">Redirecting you to login...</p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all placeholder:text-slate-400 pr-11"
            placeholder="New password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
          Confirm New Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all placeholder:text-slate-400"
          placeholder="Confirm new password"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#7c3aed] py-3 text-sm font-bold text-white hover:bg-[#6d28d9] transition-all shadow-sm disabled:opacity-50"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center bg-[#7c3aed] text-white shadow-lg mb-4">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795m-9 0L9.814 4.096 9.813 4.1a.75.75 0 011.396-.135L21 21M9.813 15.904L21 21m-11.188-5.096A9.75 9.75 0 013 12c0-5.385 4.365-9.75 9.75-9.75 2.11 0 4.06.669 5.64 1.8" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Set new password</h1>
          <p className="text-sm text-slate-500 mt-1">Enter your new password below</p>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm p-8">
          <Suspense fallback={<div className="text-center py-8 text-sm text-slate-500">Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>

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
