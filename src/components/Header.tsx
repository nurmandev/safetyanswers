"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

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
  { href: "/services", label: "Services" },
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
      <header
        className={`sticky top-0 z-50 transition-all duration-300 bg-[#111111] border-b border-white/10 ${
          scrolled ? "shadow-lg shadow-black/30" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 py-4 lg:py-[18px] shrink-0">
            <div className="flex h-8 w-8 items-center justify-center bg-[#c8ff00]">
              <svg className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795m-9 0L9.814 4.096 9.813 4.1a.75.75 0 011.396-.135L21 21M9.813 15.904L21 21m-11.188-5.096A9.75 9.75 0 013 12c0-5.385 4.365-9.75 9.75-9.75 2.11 0 4.06.669 5.64 1.8" />
              </svg>
            </div>
            <span className={`font-bold tracking-tight text-white transition-all ${scrolled ? "text-sm" : "text-base"}`}>
              safetyanswers
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                if (item.hasDropdown) {
                  return (
                    <li key={item.href} onMouseEnter={() => handleMegaEnter("resources")} onMouseLeave={handleMegaLeave} className="relative">
                      <Link
                        href={item.href}
                        className={`flex items-center gap-1 px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                          isActive ? "text-[#c8ff00]" : "text-slate-300 hover:text-white"
                        }`}
                      >
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
                    <Link
                      href={item.href}
                      className={`block px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                        isActive ? "text-[#c8ff00]" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-bold text-white border border-white/20 hover:border-white/50 hover:bg-white/10 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 text-sm font-bold text-black bg-[#c8ff00] hover:bg-[#b8ef00] transition-colors shadow-sm"
            >
              Register
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex lg:hidden h-10 w-10 items-center justify-center border border-white/20 text-white hover:bg-white/10"
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Resources Dropdown */}
        {openMega === "resources" && (
          <div
            onMouseEnter={() => handleMegaEnter("resources")}
            onMouseLeave={handleMegaLeave}
            className="absolute left-1/2 -translate-x-1/2 top-full z-50 w-56 bg-[#1a1a1a] border border-white/10 shadow-2xl shadow-black/50 py-2"
          >
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-5 py-2.5 text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? "text-[#c8ff00] bg-white/5"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] bg-[#111111] border-l border-white/10 shadow-2xl lg:hidden transition-transform duration-300 ease-out flex flex-col ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
          <span className="text-sm font-bold text-white">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center border border-white/20 text-slate-400 hover:bg-white/10"
            aria-label="Close menu"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.hasDropdown) {
              const isOpen = mobileAccordion === item.label;
              return (
                <div key={item.href}>
                  <button
                    onClick={() => setMobileAccordion(isOpen ? null : item.label)}
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive ? "text-[#c8ff00]" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <svg className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {isOpen && item.label === "Resources" && (
                    <div className="ml-4 mt-1 space-y-0.5 pb-3">
                      {resourceLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                            pathname === link.href ? "text-[#c8ff00]" : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive ? "text-[#c8ff00]" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block border border-white/20 text-white text-sm font-bold py-3 text-center hover:bg-white/10 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="block bg-[#c8ff00] text-black text-sm font-bold py-3 text-center hover:bg-[#b8ef00] transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
