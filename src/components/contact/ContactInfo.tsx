import Link from "next/link";

const methods = [
  {
    title: "Email",
    value: "hello@safetyanswers.com",
    desc: "Send us an email anytime",
    icon: "email",
    action: "Send Email",
    href: "mailto:hello@safetyanswers.com",
  },
  {
    title: "WhatsApp",
    value: "+1 (555) 123-4567",
    desc: "Fast response on WhatsApp",
    icon: "chat",
    action: "Chat on WhatsApp",
    href: "https://wa.me/15551234567",
  },
  {
    title: "Phone",
    value: "+1 (555) 987-6543",
    desc: "Speak directly with our team",
    icon: "phone",
    action: "Call Us",
    href: "tel:+15559876543",
  },
  {
    title: "Office",
    value: "London, United Kingdom",
    desc: "Virtual consultations worldwide",
    icon: "location",
    action: "Get Directions",
    href: "#",
  },
];

function MethodIcon({ icon }: { icon: string }) {
  const map: Record<string, React.ReactNode> = {
    email: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />,
    chat: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />,
    phone: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />,
    location: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />,
  };
  return <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">{map[icon]}</svg>;
}

export function ContactInfo() {
  return (
    <section className="bg-white dark:bg-slate-950 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((m) => (
            <div key={m.title} className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 hover:border-[#7c3aed]/30 dark:hover:border-[#a78bfa]/30 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] mb-4">
                <MethodIcon icon={m.icon} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{m.title}</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{m.value}</p>
              <p className="mt-1 text-[10px] text-slate-400">{m.desc}</p>
              <Link href={m.href} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#7c3aed] dark:text-[#a78bfa] hover:underline">
                {m.action}
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
