import Link from "next/link";

const plans = [
  {
    name: "Academic",
    price: "$49",
    period: "per project",
    desc: "Perfect for students seeking academic writing and analysis support",
    features: ["Expert academic consultation", "Plagiarism-free guarantee", "APA/MLA/Harvard formatting", "One round of revisions", "Email support", "7-day delivery"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "per project",
    desc: "Ideal for professionals needing CVs, SOPs, and business documents",
    features: ["Professional writing consultation", "Unlimited revisions", "Priority turnaround", "Direct consultant access", "Phone & email support", "5-day delivery"],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "per project",
    desc: "For organizations requiring comprehensive safety and compliance solutions",
    features: ["HSE compliance consultation", "Unlimited revisions", "48-hour delivery", "Dedicated project manager", "24/7 priority support", "NDA & data protection"],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Pricing</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Simple, transparent pricing</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Choose the plan that fits your needs. All plans include free revisions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`border ${plan.popular ? "border-[#7c3aed] dark:border-[#7c3aed] ring-1 ring-[#7c3aed]" : "border-slate-200 dark:border-slate-800"} bg-white dark:bg-slate-950 p-8 flex flex-col ${plan.popular ? "scale-105" : ""}`}>
              {plan.popular && <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c3aed] mb-2">Most Popular</span>}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{plan.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{plan.period}</span>
              </div>
              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <svg className="h-4 w-4 text-[#7c3aed] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/book" className={`mt-8 block w-full py-3 text-sm font-bold text-center transition-all ${plan.popular ? "bg-[#7c3aed] text-white hover:bg-[#6d28d9] shadow-lg shadow-[#7c3aed]/20" : "border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
