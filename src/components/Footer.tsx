import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/premium", label: "Premium Articles" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

const services = [
  { href: "/services/academic", label: "Academic Consultancy" },
  { href: "/services/professional-writing", label: "Professional Writing" },
  { href: "/services/health-safety", label: "Health & Safety" },
  { href: "/book", label: "Book Consultation" },
];

const resources = [
  { href: "/resources", label: "Research Templates" },
  { href: "/blog", label: "Free Articles" },
  { href: "/premium", label: "Premium Library" },
  { href: "/account/downloads", label: "Downloads" },
  { href: "/faqs", label: "FAQs" },
];

const support = [
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center bg-[#7c3aed] text-white shadow-sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795m-9 0L9.814 4.096 9.813 4.1a.75.75 0 011.396-.135L21 21M9.813 15.904L21 21m-11.188-5.096A9.75 9.75 0 013 12c0-5.385 4.365-9.75 9.75-9.75 2.11 0 4.06.669 5.64 1.8" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">safetyanswers</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Premium consultancy platform for academic support, professional writing, and health & safety services.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <span className="text-xs text-slate-500">Follow us:</span>
              {["twitter", "linkedin", "facebook", "instagram"].map((s) => (
                <Link key={s} href="/contact" className="text-slate-500 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-300 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-300 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">Support</h4>
            <ul className="space-y-3">
              {support.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-300 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5 mt-8">Resources</h4>
            <ul className="space-y-3">
              {resources.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-300 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} safetyanswers. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
