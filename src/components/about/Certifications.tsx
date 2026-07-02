const certifications = [
  {
    title: "Health & Safety Standards",
    desc: "NEBOSH and IOSH certified consultants delivering compliance-ready HSE documentation and risk management solutions.",
    icon: "safety",
  },
  {
    title: "Academic Excellence",
    desc: "PhD-qualified researchers adhering to rigorous academic standards, ethical research practices, and citation protocols.",
    icon: "academic",
  },
  {
    title: "Research Quality",
    desc: "Every project undergoes advanced plagiarism screening, statistical validation, and expert peer review before delivery.",
    icon: "quality",
  },
  {
    title: "Professional Ethics",
    desc: "Strict adherence to confidentiality agreements, data protection regulations, and professional codes of conduct.",
    icon: "ethics",
  },
];

function CertIcon({ icon }: { icon: string }) {
  const paths: Record<string, React.ReactNode> = {
    safety: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    academic: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />,
    quality: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />,
    ethics: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  };
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      {paths[icon] || paths.safety}
    </svg>
  );
}

export function Certifications() {
  return (
    <section className="bg-slate-950 dark:bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a78bfa]">Certifications & Standards</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">Professional excellence, certified</h2>
          <p className="mt-4 text-sm text-slate-400">Our work is guided by recognized industry standards and ethical frameworks</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <div key={cert.title} className="border border-slate-700 bg-slate-900 p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#7c3aed]/20 text-[#a78bfa] mb-5">
                <CertIcon icon={cert.icon} />
              </div>
              <h3 className="text-base font-bold text-white">{cert.title}</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
