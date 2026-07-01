import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "@/components/NewsletterForm";

const services = [
  {
    title: "Academic Consultancy",
    description:
      "Strategic dissertation, thesis, and research proposal support. Editing, formatting, and advanced statistical data analysis (SPSS, STATA, Excel) to match rigorous institutional guidelines.",
    href: "/services/academic",
  },
  {
    title: "Professional Writing",
    description:
      "Premium CVs, persuasive SOPs, compelling personal statements, grant applications, and high-impact business proposals tailored to secure opportunities.",
    href: "/services/professional-writing",
  },
  {
    title: "Health & Safety",
    description:
      "Comprehensive HSE documentation, risk assessments, NEBOSH writing guidance, and organizational safety audit preparation for corporate compliance.",
    href: "/services/health-safety",
  },
];

const highlights = [
  { value: "500+", label: "Academic & Corporate Projects" },
  { value: "98%", label: "Client Success Rate" },
  { value: "24/7", label: "Consultant Availability" },
];

const testimonials = [
  {
    quote:
      "Their data analysis support was instrumental in my doctoral dissertation. The SPSS validation was rigorous and mathematically flawless.",
    author: "Dr. Sarah Jenkins",
    role: "PhD Graduate, Public Health",
  },
  {
    quote:
      "Superb NEBOSH and compliance guidance. They helped us overhaul our workplace risk assessments, ensuring a perfect pass rate in our audit.",
    author: "Marcus Vance",
    role: "HSE Director, Vancor Group",
  },
];

const faqs = [
  {
    question: "How does the consultancy booking process work?",
    answer:
      "Every engagement starts with a strategic project review. Submit your brief, deadline, and reference files via our Booking Form. Our coordinating consultant will review your material and assign a subject-matter expert within 24 hours.",
  },
  {
    question: "Is my research data and organizational documentation kept confidential?",
    answer:
      "Absolutely. We operate under strict Non-Disclosure Agreements (NDAs). All uploaded documents, academic drafts, and corporate reports are encrypted in transit and at rest.",
  },
  {
    question: "How do I access premium educational resources and articles?",
    answer:
      "You can browse and purchase individual premium articles directly. Once payment is processed through our secure gateway, the article is unlocked and remains permanently accessible inside your user account dashboard.",
  },
];

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen selection:bg-primary selection:text-primary-foreground">
      
      {/* Hero Section */}
      <section className="relative bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Hero Text Content */}
            <div className="lg:col-span-7 flex flex-col justify-center animate-slide-up opacity-0">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-800 bg-blue-50 px-3 py-1.5 self-start mb-6">
                Premium Academic & Corporate Consultancy
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.05]">
                Rigorous academic support. Safe workplaces.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-xl">
                We bridge the gap between academic excellence and operational compliance. 
                Get certified support in health & safety audits, data analysis, and professional writing.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="bg-slate-900 px-8 py-4 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  Schedule Consultation
                </Link>
                <Link
                  href="/services"
                  className="border border-slate-300 bg-transparent px-8 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Explore Services
                </Link>
              </div>
              
              {/* Core features indicators */}
              <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 max-w-md">
                <div className="flex items-center gap-3">
                  <Image src="/globe.svg" alt="Globe" width={20} height={20} className="opacity-80" />
                  <span className="text-xs font-medium text-slate-600">Compliance Audited</span>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="/file.svg" alt="File" width={20} height={20} className="opacity-80" />
                  <span className="text-xs font-medium text-slate-600">Secure Data Protocols</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image Container */}
            <div className="lg:col-span-5 relative h-[480px] border border-slate-200 animate-slide-up opacity-0 delay-100">
              <Image
                src="/business.jpg"
                alt="Executive Boardroom Meeting"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
              <div className="absolute bottom-6 left-6 right-6 bg-white p-6 border border-slate-200 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-1">
                  Global Standards
                </p>
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  Providing enterprise-grade consulting solutions globally.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Accreditation Row */}
      <section className="bg-slate-50 border-b border-slate-200 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-400 mb-6">
            Supported Frameworks & Technologies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 hover:opacity-60 transition-opacity">
            <Image src="/next.svg" alt="Next.js Platform" width={110} height={26} className="h-6 w-auto" />
            <Image src="/vercel.svg" alt="Vercel Infrastructure" width={110} height={24} className="h-5 w-auto" />
            <Image src="/window.svg" alt="Window Framework" width={28} height={28} className="h-7 w-auto" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-800">
                Core Capabilities
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Professional consultancy services.
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              View Detailed Service Directory
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2.3" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group flex flex-col justify-between border border-slate-200 bg-white p-8 hover:border-slate-800 transition-all duration-300"
              >
                <div>
                  <div className="mb-8 flex h-12 w-12 items-center justify-center bg-slate-50 border border-slate-200 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                    <span className="font-mono text-sm">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </div>
                
                <Link
                  href={service.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 group-hover:text-blue-800 transition-colors"
                >
                  Request Proposal
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Metrics & Why Choose Us Block */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/employees.jpg"
            alt="Consulting Professionals at Work"
            fill
            className="object-cover opacity-15 grayscale"
          />
          <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
                Institutional Confidence
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Engineered for strict standards & zero compromise.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-300 max-w-lg">
                We assist corporate boards, HSE executives, and postgraduate researchers. 
                Our workflows are built to guarantee premium formatting, sound statistical data proofing, and strict compliance with health & safety legislation.
              </p>
              
              <div className="mt-8 space-y-4 max-w-md">
                {[
                  "Double-blind peer review of academic projects",
                  "Qualified HSE consultants with active NEBOSH registration",
                  "Turnitin and compliance certification provided",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <svg className="h-5 w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                >
                  <p className="text-4xl font-extrabold text-white">{item.value}</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Publications / Content Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid gap-12 lg:grid-cols-12">
            
            {/* Premium locked content card */}
            <div className="lg:col-span-5 flex flex-col justify-between border border-slate-200 bg-slate-50 p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/written.jpg"
                  alt="Reports and Documents"
                  fill
                  className="object-cover opacity-5"
                />
              </div>
              
              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-800">
                  Premium Library
                </span>
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                  Unlock peer-reviewed guidance.
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-slate-600">
                  Get full access to detailed compliance manuals, statistics models, and professional templates. Pay once, read permanently.
                </p>
              </div>
              
              <div className="relative z-10 mt-12">
                <Link
                  href="/premium"
                  className="inline-flex bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  Browse Premium Documents
                </Link>
              </div>
            </div>
            
            {/* Featured Articles list */}
            <div className="lg:col-span-7 border border-slate-200 bg-white p-8 lg:p-12 relative">
              <div className="absolute inset-0 z-0 opacity-5">
                <Image src="/404.jpg" alt="Technical Layout Grid" fill className="object-cover" />
              </div>
              
              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Featured Publications
                </span>
                <h3 className="mt-4 text-2xl font-bold text-slate-900 mb-8">
                  Recent insights from our lead editors
                </h3>
                
                <div className="space-y-4">
                  {[
                    "How to structure a dissertation proposal with confidence",
                    "NEBOSH essentials for modern workplace safety",
                    "Writing a persuasive SOP for international study applications",
                  ].map((item) => (
                    <Link
                      href="/premium"
                      key={item}
                      className="group block border border-slate-100 bg-slate-50/50 p-5 hover:border-slate-300 hover:bg-slate-50 transition-all"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-900 transition-colors">
                          {item}
                        </span>
                        <svg
                          className="h-5 w-5 text-slate-400 group-hover:text-slate-900 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="bg-slate-50 border-y border-slate-200 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-800">
              Verified Success
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Trusted by academics and business leaders.
            </h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-white border border-slate-200 p-8 shadow-sm">
                <p className="text-base italic text-slate-700 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.author}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
                    Verified Client
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Frequently Asked Questions
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Got questions? We have answers.
            </h2>
          </div>
          
          <div className="border-t border-slate-200 divide-y divide-slate-200">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-6 sm:py-8">
                <h4 className="text-base font-bold text-slate-900">{faq.question}</h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action & Newsletter Section */}
      <section className="bg-slate-900 text-white py-20 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Initiate your project brief today.
              </h2>
              <p className="mt-4 text-sm text-slate-300 max-w-md">
                Our consultancy leads are standing by to review your academic methodologies, audit plans, or personal statements.
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/book"
                  className="bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Book Consultation Slot
                </Link>
                <Link
                  href="/contact"
                  className="border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Contact Coordinator
                </Link>
              </div>
            </div>
            
            <div className="border border-white/10 bg-white/5 p-8">
              <h4 className="text-sm font-bold tracking-wider uppercase text-blue-400 mb-2">
                HSE & Academic Research Digest
              </h4>
              <p className="text-xs text-slate-300 mb-6">
                Receive peer-reviewed guidance, safety regulatory updates, and writing advice straight to your inbox monthly.
              </p>
              <NewsletterForm />
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
