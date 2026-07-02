import Image from "next/image";

const benefits = [
  {
    title: "Expert Consultants",
    desc: "PhD-qualified academics and certified HSE professionals with years of industry experience",
    icon: "users",
  },
  {
    title: "Plagiarism-Free Work",
    desc: "Every project undergoes rigorous plagiarism checking with detailed originality reports",
    icon: "check",
  },
  {
    title: "On-Time Delivery",
    desc: "We respect your deadlines with a proven track record of timely project completion",
    icon: "clock",
  },
  {
    title: "Confidential & Secure",
    desc: "Strict NDAs and encrypted document handling for complete data protection",
    icon: "shield",
  },
  {
    title: "Unlimited Revisions",
    desc: "Free revisions until you are fully satisfied with the delivered work",
    icon: "refresh",
  },
  {
    title: "24/7 Support",
    desc: "Round-the-clock customer support via email, chat, and phone",
    icon: "support",
  },
];

function BenefitIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    refresh: <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />,
    support: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />,
  };
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      {icons[icon] || icons.check}
    </svg>
  );
}

export function WhyChooseUs() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 z-0">
        <Image src="/employees.jpg" alt="Team" fill className="object-cover opacity-10 grayscale" />
        <div className="absolute inset-0 bg-slate-950/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a78bfa]">Why Choose Us</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">Engineered for excellence</h2>
          <p className="mt-4 text-sm text-slate-300">What sets us apart from the competition</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center bg-[#7c3aed]/20 text-[#a78bfa] mb-5 group-hover:bg-[#7c3aed] group-hover:text-white transition-colors">
                <BenefitIcon icon={b.icon} />
              </div>
              <h3 className="text-base font-bold text-white">{b.title}</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
