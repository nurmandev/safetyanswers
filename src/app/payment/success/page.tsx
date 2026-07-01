import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl p-8 text-center space-y-6">
        
        {/* Animated check circle */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center bg-green-50 text-green-600 border border-green-200">
          <svg className="h-8 w-8 animate-bounce" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">Payment Approved</h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Your transaction has been processed. Unlocked manuals are now permanently active inside your profile library.
          </p>
        </div>

        {/* Invoice details list */}
        <div className="border border-slate-100 bg-slate-50 p-5 text-left text-xs space-y-3">
          <div className="flex justify-between font-bold text-slate-400 uppercase tracking-wider text-[9px]">
            <span>Receipt Details</span>
            <span>Transaction #73919</span>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="space-y-1.5 text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">Unlocks</span>
              <span className="font-semibold text-slate-900">NEBOSH Safety Manual</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount Charged</span>
              <span className="font-semibold text-slate-900">$149.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Method</span>
              <span className="font-semibold text-slate-900">Stripe Card Platform</span>
            </div>
          </div>
        </div>

        {/* Navigation triggers */}
        <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
          <Link
            href="/account/purchased"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3.5 transition-colors"
          >
            Access Unlocked Library
          </Link>
          
          <Link
            href="/account/payments"
            className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold py-3.5 transition-colors"
          >
            Download PDF Invoice Receipt
          </Link>
        </div>

        <Link href="/" className="inline-block text-slate-400 hover:text-slate-600 text-xs font-semibold">
          Return to home page
        </Link>

      </div>
    </main>
  );
}
