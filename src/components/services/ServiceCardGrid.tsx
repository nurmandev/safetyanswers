import Link from "next/link";

interface ServiceItem {
  title: string;
  desc: string;
  turnaround: string;
  price: string;
  icon: string;
}

const academicServices: ServiceItem[] = [
  { title: "Undergraduate Projects", desc: "Comprehensive project support from topic selection to final presentation across all disciplines.", turnaround: "5–10 days", price: "From $150", icon: "academic" },
  { title: "Master's Thesis", desc: "End-to-end thesis writing with literature review, methodology, analysis, and conclusion chapters.", turnaround: "10–21 days", price: "From $400", icon: "thesis" },
  { title: "PhD Proposal", desc: "Research proposal development with clear objectives, theoretical framework, and methodology.", turnaround: "7–14 days", price: "From $350", icon: "proposal" },
  { title: "Dissertation Writing", desc: "Full dissertation writing service covering all chapters with rigorous academic standards.", turnaround: "14–30 days", price: "From $800", icon: "book" },
  { title: "Research Methodology", desc: "Methodology chapter design including research design, data collection, and analytical framework.", turnaround: "5–10 days", price: "From $200", icon: "method" },
  { title: "Literature Review", desc: "Systematic literature reviews with critical analysis and proper citation management.", turnaround: "5–10 days", price: "From $200", icon: "litreview" },
  { title: "Data Analysis", desc: "Comprehensive data analysis using SPSS, STATA, Excel, R, and NVivo with full interpretation.", turnaround: "5–14 days", price: "From $250", icon: "data" },
  { title: "SPSS Analysis", desc: "Statistical analysis including descriptive statistics, regression, ANOVA, and factor analysis.", turnaround: "3–7 days", price: "From $150", icon: "spss" },
  { title: "STATA Analysis", desc: "Econometric modeling, panel data analysis, time series, and statistical inference.", turnaround: "3–7 days", price: "From $180", icon: "stata" },
  { title: "Excel Analysis", desc: "Data cleaning, visualization, pivot tables, and advanced Excel modeling.", turnaround: "2–5 days", price: "From $120", icon: "excel" },
  { title: "Questionnaire Design", desc: "Survey instrument design with validated scales and proper sampling methodology.", turnaround: "3–5 days", price: "From $100", icon: "survey" },
  { title: "Research Editing", desc: "Structural and content editing to improve clarity, coherence, and academic tone.", turnaround: "3–7 days", price: "From $150", icon: "edit" },
  { title: "Proofreading", desc: "Meticulous proofreading for grammar, spelling, punctuation, and formatting.", turnaround: "2–4 days", price: "From $80", icon: "proof" },
  { title: "Referencing", desc: "Accurate APA, MLA, Harvard, Chicago, IEEE, and Vancouver citation formatting.", turnaround: "1–3 days", price: "From $50", icon: "ref" },
  { title: "Turnitin Reduction", desc: "Ethical paraphrasing to reduce similarity scores while maintaining academic integrity.", turnaround: "2–5 days", price: "From $80", icon: "check" },
];

const writingServices: ServiceItem[] = [
  { title: "CV Writing", desc: "Professional CVs and resumes tailored to your industry, experience level, and career goals.", turnaround: "3–5 days", price: "From $120", icon: "cv" },
  { title: "Statement of Purpose", desc: "Compelling SOPs that highlight your academic journey, research interests, and career aspirations.", turnaround: "5–7 days", price: "From $180", icon: "sop" },
  { title: "Personal Statement", desc: "Impactful personal statements for scholarships, admissions, and fellowship applications.", turnaround: "5–7 days", price: "From $160", icon: "person" },
  { title: "Grant Proposal", desc: "Persuasive grant applications with clear objectives, budgets, and impact statements.", turnaround: "7–14 days", price: "From $400", icon: "grant" },
  { title: "Business Proposal", desc: "Professional business proposals structured for investors, partners, and RFP responses.", turnaround: "7–10 days", price: "From $350", icon: "bizprop" },
  { title: "Business Plan", desc: "Comprehensive business plans with market analysis, financial projections, and growth strategy.", turnaround: "10–21 days", price: "From $600", icon: "bizplan" },
  { title: "Technical Reports", desc: "Clear and concise technical reports for engineering, IT, scientific, and industrial stakeholders.", turnaround: "5–10 days", price: "From $250", icon: "tech" },
];

const safetyServices: ServiceItem[] = [
  { title: "NEBOSH Support", desc: "Expert guidance for NEBOSH assignments, exams, and practical assessments with model answers.", turnaround: "5–10 days", price: "From $200", icon: "nebosh" },
  { title: "Health & Safety Consultancy", desc: "Strategic HSE consultancy for policy development, risk management, and organizational safety culture.", turnaround: "7–21 days", price: "From $500", icon: "hse" },
  { title: "Risk Assessment", desc: "Thorough risk assessments identifying hazards, evaluating risks, and recommending control measures.", turnaround: "5–10 days", price: "From $300", icon: "risk" },
  { title: "HSE Documentation", desc: "Complete HSE documentation including policies, procedures, forms, and compliance records.", turnaround: "7–14 days", price: "From $400", icon: "docs" },
  { title: "Compliance Audits", desc: "Regulatory compliance audits with gap analysis, corrective action plans, and follow-up support.", turnaround: "7–14 days", price: "From $500", icon: "audit" },
  { title: "Workplace Safety Training", desc: "Customized safety training programs covering fire safety, manual handling, COSHH, and more.", turnaround: "5–10 days", price: "From $350", icon: "training" },
  { title: "Emergency Response Planning", desc: "Emergency response plans including evacuation procedures, first aid arrangements, and crisis management.", turnaround: "5–10 days", price: "From $300", icon: "emergency" },
  { title: "Safety Management Systems", desc: "ISO 45001-aligned safety management systems with policy, planning, operation, and review.", turnaround: "10–21 days", price: "From $600", icon: "sms" },
];

function ItemIcon({ icon }: { icon: string }) {
  const paths: Record<string, React.ReactNode> = {
    academic: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />,
    thesis: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    proposal: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />,
    book: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />,
    method: <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />,
    litreview: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />,
    data: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
    spss: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
    stata: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
    excel: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
    survey: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />,
    proof: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    ref: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    cv: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    sop: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    person: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    grant: <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5 0h7.5m-7.5 0l-3-3m3 3l3-3" />,
    bizprop: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />,
    bizplan: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />,
    tech: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />,
    nebosh: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    hse: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />,
    risk: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />,
    docs: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    audit: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    training: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />,
    emergency: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />,
    sms: <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />,
  };
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      {paths[icon] || paths.nebosh}
    </svg>
  );
}

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 flex flex-col hover:border-[#7c3aed]/30 dark:hover:border-[#a78bfa]/30 transition-colors group">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] group-hover:bg-[#7c3aed] group-hover:text-white transition-colors">
          <ItemIcon icon={item.icon} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{item.turnaround}</span>
            <span className="text-[10px] font-bold text-[#7c3aed] dark:text-[#a78bfa]">{item.price}</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{item.desc}</p>
      <div className="mt-4 flex items-center gap-3">
        <Link
          href="/book"
          className="text-xs font-bold text-[#7c3aed] dark:text-[#a78bfa] hover:text-[#6d28d9] dark:hover:text-[#c4b5fd] transition-colors"
        >
          Book Now
        </Link>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <Link
          href="/book"
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

function Section({ id, title, subtitle, bg, items }: { id: string; title: string; subtitle: string; bg: string; items: ServiceItem[] }) {
  return (
    <section className={`py-24 sm:py-32 ${bg === "slate" ? "bg-slate-50 dark:bg-slate-900" : "bg-white dark:bg-slate-950"}`} id={id}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Our Services</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s) => <ServiceCard key={s.title} item={s} />)}
        </div>
      </div>
    </section>
  );
}

export function AcademicServicesGrid() {
  return <Section id="academic" title="Academic Consultancy" subtitle="Comprehensive academic support from proposal to publication" bg="white" items={academicServices} />;
}

export function ProfessionalWritingGrid() {
  return <Section id="writing" title="Professional Writing" subtitle="Compelling documents that open doors to new opportunities" bg="slate" items={writingServices} />;
}

export function HealthSafetyGrid() {
  return <Section id="safety" title="Health & Safety Consultancy" subtitle="Certified HSE solutions for safer workplaces" bg="white" items={safetyServices} />;
}
