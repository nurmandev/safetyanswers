import Link from "next/link";

const academicServices = [
  { title: "Undergraduate Projects", desc: "Comprehensive guidance for undergraduate research projects across all disciplines" },
  { title: "Master's Thesis", desc: "End-to-end thesis support from proposal to final defense preparation" },
  { title: "Dissertation", desc: "Expert dissertation writing assistance with rigorous methodology" },
  { title: "PhD Proposal", desc: "Craft compelling PhD research proposals that secure approval" },
  { title: "SPSS Analysis", desc: "Advanced statistical analysis using SPSS with full interpretation" },
  { title: "STATA Analysis", desc: "Econometric and statistical modeling with STATA expertise" },
  { title: "Excel Analysis", desc: "Data analysis, visualization, and modeling in Excel" },
  { title: "Literature Review", desc: "Systematic literature reviews with proper citation management" },
  { title: "Referencing", desc: "Accurate APA, MLA, Harvard, Chicago, and IEEE referencing" },
  { title: "Editing", desc: "Professional academic editing for clarity, flow, and structure" },
  { title: "Proofreading", desc: "Meticulous proofreading for grammar, spelling, and punctuation" },
  { title: "Turnitin Reduction", desc: "Ethical paraphrasing to reduce similarity indices" },
];

const writingServices = [
  { title: "CV Writing", desc: "Professional CVs that highlight your achievements and secure interviews" },
  { title: "Statement of Purpose", desc: "Compelling SOPs for university admissions worldwide" },
  { title: "Personal Statement", desc: "Impactful personal statements for scholarships and programs" },
  { title: "Grant Proposal", desc: "Persuasive grant proposals that secure research funding" },
  { title: "Business Proposal", desc: "Professional business proposals for investors and partners" },
  { title: "Business Plan", desc: "Comprehensive business plans with financial projections" },
  { title: "Technical Reports", desc: "Clear and concise technical reports for stakeholders" },
];

const safetyServices = [
  { title: "NEBOSH Writer", desc: "Expert NEBOSH assignment and exam preparation support" },
  { title: "Risk Assessment", desc: "Thorough risk assessments for workplace safety compliance" },
  { title: "HSE Documentation", desc: "Complete HSE documentation packages for your organization" },
  { title: "Compliance", desc: "Regulatory compliance audits and gap analysis" },
  { title: "Safety Consultancy", desc: "Strategic safety consultancy for organizational excellence" },
  { title: "Training", desc: "Customized safety training programs for your team" },
];

function ServiceCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:border-[#7c3aed] dark:hover:border-[#7c3aed] hover:shadow-lg hover:shadow-[#7c3aed]/5 transition-all duration-300 group">
      <div className="flex h-10 w-10 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] mb-4 group-hover:bg-[#7c3aed] group-hover:text-white transition-colors">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
        </svg>
      </div>
      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h4>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
      <Link href="/book" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#7c3aed] dark:text-[#a78bfa] opacity-0 group-hover:opacity-100 transition-opacity">
        Request <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
      </Link>
    </div>
  );
}

export function AcademicServices() {
  return (
    <Section id="academic" title="Academic Consultancy" subtitle="Comprehensive academic support services" bg="white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {academicServices.map((s) => <ServiceCard key={s.title} title={s.title} desc={s.desc} />)}
      </div>
    </Section>
  );
}

export function ProfessionalWritingServices() {
  return (
    <Section id="writing" title="Professional Writing" subtitle="Compelling documents that open doors" bg="slate">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {writingServices.map((s) => <ServiceCard key={s.title} title={s.title} desc={s.desc} />)}
      </div>
    </Section>
  );
}

export function HealthSafetyServices() {
  return (
    <Section id="health-safety" title="Health & Safety Consultancy" subtitle="Comprehensive safety solutions" bg="white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {safetyServices.map((s) => <ServiceCard key={s.title} title={s.title} desc={s.desc} />)}
      </div>
    </Section>
  );
}

function Section({ id, title, subtitle, bg, children }: { id: string; title: string; subtitle: string; bg: string; children: React.ReactNode }) {
  return (
    <section className={`py-24 sm:py-32 ${bg === "slate" ? "bg-slate-50 dark:bg-slate-900" : "bg-white dark:bg-slate-950"}`} id={id}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Our Services</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
