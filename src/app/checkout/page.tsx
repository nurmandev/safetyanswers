"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const paymentGateways = [
  { id: "stripe", name: "Stripe Payment", description: "Credit / Debit Card (Global)" },
  { id: "paystack", name: "Paystack Portal", description: "Verve, Mastercard, Bank Transfer (Africa)" },
  { id: "flutterwave", name: "Flutterwave", description: "Mobile Money, Cards (Africa & LatAm)" },
  { id: "paypal", name: "PayPal Wallet", description: "Instant Checkout & Balance" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [gateway, setGateway] = useState("stripe");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    holder: "Jason Ranti",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to payment success mock. In a real app we'd validate here.
    router.push("/payment/success");
  };

  const handleFail = () => {
    router.push("/payment/failed");
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Secure Order Checkout
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            Secure SSL 256-Bit Encrypted Payment Coordinator
          </p>
        </div>
      </section>

      {/* Main Grid Checkout */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Checkout billing/payment form */}
          <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm p-8">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">
              1. Choose Payment Gateway
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              {paymentGateways.map((gw) => (
                <button
                  key={gw.id}
                  type="button"
                  onClick={() => setGateway(gw.id)}
                  className={`p-4 text-left border flex flex-col justify-between min-h-[90px] transition-all ${
                    gateway === gw.id
                      ? "border-blue-900 bg-blue-50/20"
                      : "border-slate-200 bg-white hover:border-slate-800"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900">{gw.name}</span>
                  <span className="text-[10px] text-slate-500 leading-snug mt-1">{gw.description}</span>
                </button>
              ))}
            </div>

            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">
              2. Transaction Coordinates
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={cardData.holder}
                  onChange={(e) => setCardData({ ...cardData, holder: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="xxxx xxxx xxxx xxxx"
                  value={cardData.number}
                  onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="MM / YY"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    CVC Code
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="***"
                    maxLength={4}
                    value={cardData.cvc}
                    onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleFail}
                  className="text-slate-400 hover:text-red-500 text-xs font-semibold self-start sm:self-center transition-colors"
                >
                  Test Fail Payment (Mock Failure)
                </button>
                
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-8 py-4 border border-slate-900 transition-colors w-full sm:w-auto"
                >
                  Confirm & Process Payment
                </button>
              </div>
            </form>
          </div>

          {/* Cart totals sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Summary */}
            <div className="bg-white border border-slate-200 shadow-sm p-6">
              <h4 className="text-sm font-bold text-slate-950 border-b border-slate-100 pb-3 mb-4">
                Order Summary
              </h4>

              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">NEBOSH Audit Checklist</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Premium Compliance Manual</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900">$120.00</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">dissertation-checklist</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Premium Article Unlock</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900">$29.00</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6 space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Subtotal</span>
                  <span>$149.00</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Processing Fee (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span>$149.00</span>
                </div>
              </div>
            </div>

            {/* Shield terms */}
            <div className="bg-slate-50 border border-slate-150 p-6">
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-900 leading-none">Security Assurance</p>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Payments are handled instantly. Unlocked articles appear immediately under your user dashboard library area.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
