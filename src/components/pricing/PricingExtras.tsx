import Link from "next/link";

/* ---------- quote request ---------- */

function QuoteRequest() {
  return (
    <section id="quote" className="scroll-mt-20">
      <div className="border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-[#7c3aed]/5 to-[#5b21b6]/5 dark:from-[#7c3aed]/10 dark:to-[#5b21b6]/10 p-8 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Custom Quote</span>
            <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Need a custom quotation?</h3>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Complex projects, large-scale research, organizational consulting, or urgent deadlines require tailored pricing. Our team reviews your requirements and provides a detailed quotation within 24 hours.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Large research projects and dissertations",
                "Organizational HSE compliance packages",
                "Multi-service bundles and retainers",
                "Urgent or expedited delivery requests",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <svg className="h-4 w-4 text-[#7c3aed] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6">Request a free quote</h4>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">Project Type</label>
                <select className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#7c3aed]">
                  <option>Academic Consultancy</option>
                  <option>Professional Writing</option>
                  <option>Health & Safety Consultancy</option>
                  <option>Multiple Services</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">Budget Range</label>
                <select className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#7c3aed]">
                  <option>Under $100</option>
                  <option>$100 – $300</option>
                  <option>$300 – $500</option>
                  <option>$500 – $1,000</option>
                  <option>$1,000+</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">Deadline</label>
                <select className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#7c3aed]">
                  <option>Within 7 days</option>
                  <option>7–14 days</option>
                  <option>14–30 days</option>
                  <option>30+ days</option>
                  <option>Flexible</option>
                </select>
              </div>
              <Link href="/book" className="block w-full bg-[#7c3aed] text-white text-sm font-bold py-3.5 text-center hover:bg-[#6d28d9] transition-colors">
                Contact a Consultant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- what's included ---------- */

const included = [
  { title: "Expert Consultants", desc: "PhD-qualified academics and certified HSE professionals assigned to your project.", icon: "users" },
  { title: "Confidential Service", desc: "Strict NDAs and encrypted document handling for complete data protection.", icon: "shield" },
  { title: "Secure Payments", desc: "Encrypted payment gateway supporting multiple payment methods worldwide.", icon: "lock" },
  { title: "Unlimited Communication", desc: "Direct messaging with your consultant throughout the project lifecycle.", icon: "chat" },
  { title: "Quality Assurance", desc: "Rigorous plagiarism screening, expert review, and quality checks before delivery.", icon: "check" },
  { title: "Professional Formatting", desc: "Proper formatting in APA, MLA, Harvard, Chicago, IEEE, or your specified style.", icon: "doc" },
  { title: "Timely Delivery", desc: "95% on-time delivery rate with clear milestone tracking and progress updates.", icon: "clock" },
  { title: "Dedicated Support", desc: "Round-the-clock customer support via email, chat, and phone.", icon: "support" },
];

function InclIcon({ icon }: { icon: string }) {
  const map: Record<string, React.ReactNode> = {
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    lock: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />,
    chat: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    doc: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    support: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />,
  };
  return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">{map[icon]}</svg>;
}

function WhatIncluded() {
  return (
    <section className="mt-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">What&apos;s included</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Every project comes with these premium benefits at no extra cost</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {included.map((item) => (
          <div key={item.title} className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 hover:border-[#7c3aed]/30 dark:hover:border-[#a78bfa]/30 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] mb-4">
              <InclIcon icon={item.icon} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- payment methods ---------- */

function PaymentMethods() {
  const methods = [
    { name: "Stripe", desc: "Credit & debit cards", icon: "stripe" },
    { name: "PayPal", desc: "Global payment platform", icon: "paypal" },
    { name: "Paystack", desc: "African payment gateway", icon: "paystack" },
    { name: "Flutterwave", desc: "Pan-African payments", icon: "flutterwave" },
  ];

  return (
    <section className="mt-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Payment methods</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Secure, encrypted payments with instant confirmation and global support</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {methods.map((m) => (
          <div key={m.name} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 text-center hover:border-[#7c3aed]/30 dark:hover:border-[#a78bfa]/30 transition-colors">
            <div className="flex h-14 w-14 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] mx-auto mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{m.name}</h3>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{m.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-3">
          <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          All transactions are encrypted and processed securely. Instant payment confirmation with receipt.
        </div>
      </div>
    </section>
  );
}

/* ---------- how pricing works ---------- */

const factors = [
  { label: "Project Size", desc: "Word count, pages, or scope of work" },
  { label: "Academic Level", desc: "Undergraduate, Master's, or PhD" },
  { label: "Complexity", desc: "Research depth and technical requirements" },
  { label: "Research Needs", desc: "Literature review, data collection, analysis" },
  { label: "Delivery Deadline", desc: "Standard or expedited turnaround" },
  { label: "Revisions", desc: "Number of revision rounds included" },
  { label: "Consultation", desc: "Level of expert consultation required" },
];

function HowPricingWorks() {
  return (
    <section className="mt-16">
      <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 lg:p-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">How pricing is calculated</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Every quote is customized based on these key factors</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {factors.map((f, i) => (
            <div key={f.label} className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
              <span className="text-2xl font-extrabold text-[#7c3aed]/20 dark:text-[#a78bfa]/20">0{i + 1}</span>
              <h3 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{f.label}</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
          <div className="border border-[#7c3aed] dark:border-[#7c3aed] bg-[#7c3aed]/5 dark:bg-[#7c3aed]/10 p-6 flex items-center justify-center">
            <Link href="/book" className="text-sm font-bold text-[#7c3aed] dark:text-[#a78bfa] hover:underline">Get Your Quote →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- why choose us ---------- */

const reasons = [
  { title: "Transparent Pricing", desc: "Clear, upfront pricing with no hidden fees or surprise charges.", icon: "dollar" },
  { title: "Qualified Experts", desc: "PhD-qualified academics and certified professionals with proven track records.", icon: "users" },
  { title: "Fast Delivery", desc: "95% on-time delivery rate with expedited options for urgent projects.", icon: "clock" },
  { title: "Confidentiality", desc: "Strict NDAs and encrypted document handling for complete privacy.", icon: "shield" },
  { title: "Secure Payment", desc: "Encrypted transactions with multiple global payment options.", icon: "lock" },
  { title: "High Success Rate", desc: "98% client satisfaction rate with thousands of successful projects.", icon: "star" },
  { title: "Dedicated Support", desc: "24/7 customer support via email, chat, and phone.", icon: "support" },
  { title: "Client Satisfaction", desc: "Unlimited revisions and a 14-day satisfaction guarantee.", icon: "heart" },
];

function ReasonIcon({ icon }: { icon: string }) {
  const map: Record<string, React.ReactNode> = {
    dollar: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    lock: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />,
    star: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />,
    support: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />,
    heart: <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />,
  };
  return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">{map[icon]}</svg>;
}

function PricingWhyUs() {
  return (
    <section className="mt-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Why choose us</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Thousands of clients trust us for quality, transparency, and results</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r) => (
          <div key={r.title} className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 hover:border-[#7c3aed]/30 dark:hover:border-[#a78bfa]/30 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] mb-4">
              <ReasonIcon icon={r.icon} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{r.title}</h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */

const testimonials = [
  { name: "Dr. Amina Yusuf", country: "Nigeria", service: "Dissertation", quote: "The pricing was transparent and the quality exceeded my expectations. My dissertation was completed on time with unlimited revisions included.", rating: 5, initials: "AY" },
  { name: "Carlos Mendez", country: "Spain", service: "CV Writing", quote: "Excellent value for money. My professional CV was crafted with care and I received interview calls within two weeks.", rating: 5, initials: "CM" },
  { name: "Priya Sharma", country: "India", service: "HSE Documentation", quote: "Their pricing structure is clear and fair. The HSE documentation package was comprehensive and delivered ahead of schedule.", rating: 5, initials: "PS" },
  { name: "James Thompson", country: "UK", service: "PhD Proposal", quote: "Reasonable pricing for the level of expertise provided. The proposal was rigorous and well-structured.", rating: 5, initials: "JT" },
];

function PricingTestimonials() {
  return (
    <section className="mt-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">What our clients say</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Real feedback from clients who trust our services</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] text-xs font-bold">{t.initials}</div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-500"><span>{t.country}</span><span className="text-[#7c3aed]">·</span><span className="font-semibold text-[#7c3aed]">{t.service}</span></div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, r) => (
                  <svg key={r} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
            </div>
            <p className="text-xs italic text-slate-600 dark:text-slate-400 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- main export ---------- */

export function PricingExtras() {
  return (
    <section className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <QuoteRequest />
        <WhatIncluded />
        <PaymentMethods />
        <HowPricingWorks />
        <PricingWhyUs />
        <PricingTestimonials />
      </div>
    </section>
  );
}
