const team = [
  { name: "Dr. Amina Diallo", position: "Founder & Lead Consultant", specialization: "Public Health & HSE", initials: "AD" },
  { name: "Prof. James Okafor", position: "Head of Academic Research", specialization: "Research Methodology & Data Science", initials: "JO" },
  { name: "Sarah Chen", position: "Senior HSE Consultant", specialization: "NEBOSH & Compliance Audits", initials: "SC" },
  { name: "Dr. Robert Kimani", position: "Senior Academic Writer", specialization: "Dissertation & Thesis Support", initials: "RK" },
  { name: "Emily Hartwell", position: "Professional Writing Lead", specialization: "CV, SOP & Grant Writing", initials: "EH" },
  { name: "David Mendoza", position: "Data Analysis Specialist", specialization: "SPSS, STATA & Excel Analytics", initials: "DM" },
  { name: "Priya Sharma", position: "Quality Assurance Manager", specialization: "Editing & Plagiarism Control", initials: "PS" },
  { name: "Michael Torres", position: "Client Relations Director", specialization: "Account Management & Support", initials: "MT" },
];

export function Team() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Meet Our Team</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Experts behind the excellence</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">A diverse team of PhD-qualified academics and certified professionals</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 text-center hover:border-[#7c3aed]/30 dark:hover:border-[#a78bfa]/30 transition-colors">
              <div className="mx-auto flex h-24 w-24 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] text-2xl font-extrabold">
                {member.initials}
              </div>
              <h3 className="mt-6 text-base font-bold text-slate-900 dark:text-white">{member.name}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#7c3aed] dark:text-[#a78bfa]">{member.position}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{member.specialization}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
