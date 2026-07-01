import Link from "next/link";

export default function PaymentFailedPage() {
  return (
    <main className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl p-8 text-center space-y-6">
        
        {/* Animated warning circle */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center bg-red-50 text-red-600 border border-red-250">
          <svg className="h-8 w-8 animate-pulse-slow" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">Transaction Declined</h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Your bank or gateway has declined the transaction. Check card details, expiry dates, or sufficient balance limits and try again.
          </p>
        </div>

        {/* Support context */}
        <div className="border border-slate-100 bg-slate-50 p-5 text-left text-xs space-y-2">
          <p className="font-bold text-slate-800">Support Coordinate Details</p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            If payment deductions occurred without article activation, email our portal coordinator at <span className="font-semibold text-slate-800">coordinators@example.com</span> or WhatsApp us.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
          <Link
            href="/checkout"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3.5 transition-colors"
          >
            Retry Checkout Payment
          </Link>
          
          <Link
            href="/contact"
            className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold py-3.5 transition-colors"
          >
            Contact System Support
          </Link>
        </div>

        <Link href="/" className="inline-block text-slate-400 hover:text-slate-600 text-xs font-semibold">
          Return to home page
        </Link>

      </div>
    </main>
  );
}
