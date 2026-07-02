"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const serviceCategories = [
  {
    title: "Academic Consultancy",
    description: "Expert guidance for your academic journey from proposal to submission",
    items: [
      "Undergraduate Projects", "Master's Thesis", "PhD Proposal", "Dissertation Writing",
      "Literature Review", "Research Methodology", "Data Analysis", "SPSS Analysis",
      "STATA Analysis", "Excel Analysis", "Questionnaire Design", "Referencing",
      "Proofreading", "Editing", "Turnitin Similarity Reduction",
    ],
  },
  {
    title: "Professional Writing",
    description: "Compelling professional documents that open doors to opportunities",
    items: [
      "CV Writing", "Personal Statement", "Statement of Purpose", "Grant Proposal",
      "Business Proposal", "Business Plan", "Technical Reports",
    ],
  },
  {
    title: "Health & Safety Consultancy",
    description: "Comprehensive safety solutions for regulatory compliance and risk management",
    items: [
      "NEBOSH Writer", "Risk Assessment", "HSE Documentation", "Safety Consultancy",
      "Compliance", "Training",
    ],
  },
];

const resourceLinks = [
  { href: "/blog", label: "Free Articles" },
  { href: "/premium", label: "Premium Articles" },
  { href: "/resources", label: "Research Templates" },
  { href: "/account/downloads", label: "Downloads" },
  { href: "/faqs", label: "FAQs" },
];

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasMega: true },
  { href: "/resources", label: "Resources", hasDropdown: true },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMega(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) { document.body.style.overflow = ""; return; }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMegaEnter = (type: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setOpenMega(type);
  };
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setOpenMega(null), 150);
  };

  useEffect(() => () => { if (megaTimeout.current) clearTimeout(megaTimeout.current); }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm"
          : "bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
      }`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 py-4 lg:py-5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center bg-[#7c3aed] text-white shadow-sm">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795m-9 0L9.814 4.096 9.813 4.1a.75.75 0 011.396-.135L21 21M9.813 15.904L21 21m-11.188-5.096A9.75 9.75 0 013 12c0-5.385 4.365-9.75 9.75-9.75 2.11 0 4.06.669 5.64 1.8" />
              </svg>
            </div>
            <span className={`font-bold tracking-tight text-slate-900 dark:text-white transition-all ${scrolled ? "text-base" : "text-lg"}`}>safetyanswers</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                if (item.hasMega) {
                  return (
                    <li key={item.href} onMouseEnter={() => handleMegaEnter("services")} onMouseLeave={handleMegaLeave} className="relative">
                      <Link href={item.href} className={`flex items-center gap-1 px-3.5 py-2.5 text-sm font-semibold transition-colors ${isActive ? "text-[#7c3aed] dark:text-[#a78bfa]" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"}`}>
                        {item.label}
                        <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${openMega === "services" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </Link>
                    </li>
                  );
                }
                if (item.hasDropdown) {
                  return (
                    <li key={item.href} onMouseEnter={() => handleMegaEnter("resources")} onMouseLeave={handleMegaLeave} className="relative">
                      <Link href={item.href} className={`flex items-center gap-1 px-3.5 py-2.5 text-sm font-semibold transition-colors ${isActive ? "text-[#7c3aed] dark:text-[#a78bfa]" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"}`}>
                        {item.label}
                        <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${openMega === "resources" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={`block px-3.5 py-2.5 text-sm font-semibold transition-colors ${isActive ? "text-[#7c3aed] dark:text-[#a78bfa]" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"}`}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/login" className="px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Log in</Link>
            <Link href="/register" className="px-4 py-2.5 text-sm font-bold text-white bg-[#7c3aed] hover:bg-[#6d28d9] transition-colors shadow-sm">Register</Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(true)} className="flex lg:hidden h-10 w-10 items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800" aria-label="Open menu">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Services Mega Menu */}
        {openMega === "services" && (
          <div onMouseEnter={() => handleMegaEnter("services")} onMouseLeave={handleMegaLeave} className="absolute left-0 right-0 top-full z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="mx-auto max-w-7xl px-6 py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {serviceCategories.map((cat) => (
                  <div key={cat.title}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 text-[#7c3aed]">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{cat.title}</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{cat.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {cat.items.map((item) => (
                        <li key={item}>
                          <Link href={`/services/${item.toLowerCase().replace(/\s+/g, "-")}`} className="block text-sm text-slate-600 dark:text-slate-400 hover:text-[#7c3aed] dark:hover:text-[#a78bfa] hover:bg-slate-50 dark:hover:bg-slate-900/50 px-3 py-1.5 transition-colors">{item}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#7c3aed] dark:text-[#a78bfa] hover:underline">
                  View all services <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Resources Dropdown */}
        {openMega === "resources" && (
          <div onMouseEnter={() => handleMegaEnter("resources")} onMouseLeave={handleMegaLeave} className="absolute left-1/2 -translate-x-1/2 top-full z-50 w-56 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg py-2">
            {resourceLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`block px-5 py-2.5 text-sm font-semibold transition-colors ${pathname === link.href ? "text-[#7c3aed] dark:text-[#a78bfa] bg-slate-50 dark:bg-slate-900/50" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white"}`}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && <div className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}
      <div className={`fixed top-0 right-0 z-50 h-full w-[300px] bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl lg:hidden transition-transform duration-300 ease-out flex flex-col ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-100 dark:border-slate-800">
          <span className="text-sm font-bold text-slate-900 dark:text-white">Menu</span>
          <button onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800" aria-label="Close menu">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.hasMega || item.hasDropdown) {
              const isOpen = mobileAccordion === item.label;
              return (
                <div key={item.href}>
                  <button onClick={() => setMobileAccordion(isOpen ? null : item.label)} className={`flex items-center justify-between w-full px-4 py-3 text-sm font-semibold transition-colors ${isActive ? "text-[#7c3aed]" : "text-slate-700 dark:text-slate-300 hover:text-[#7c3aed]"}`}>
                    {item.label}
                    <svg className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </button>
                  {isOpen && item.label === "Services" && (
                    <div className="ml-4 mt-1 space-y-3 pb-3">
                      {serviceCategories.map((cat) => (
                        <div key={cat.title}>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-4 mb-1.5">{cat.title}</p>
                          <div className="space-y-0.5">
                            {cat.items.map((sub) => (
                              <Link key={sub} href={`/services/${sub.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[#7c3aed] dark:hover:text-[#a78bfa] hover:bg-slate-50 dark:hover:bg-slate-900/50">{sub}</Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {isOpen && item.label === "Resources" && (
                    <div className="ml-4 mt-1 space-y-0.5 pb-3">
                      {resourceLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${pathname === link.href ? "text-[#7c3aed]" : "text-slate-600 dark:text-slate-400 hover:text-[#7c3aed]"}`}>{link.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`block px-4 py-3 text-sm font-semibold transition-colors ${isActive ? "text-[#7c3aed]" : "text-slate-700 dark:text-slate-300 hover:text-[#7c3aed]"}`}>{item.label}</Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <Link href="/login" onClick={() => setMobileOpen(false)} className="block border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-bold py-3 text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Log in</Link>
            <Link href="/register" onClick={() => setMobileOpen(false)} className="block bg-[#7c3aed] text-white text-sm font-bold py-3 text-center hover:bg-[#6d28d9] transition-colors">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}
