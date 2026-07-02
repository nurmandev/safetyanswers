"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Shield, FileText, Rss, DollarSign, Mail, Menu, X, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: BookOpen },
  { label: "Services", href: "/services", icon: Shield },
  { label: "Resources", href: "/resources", icon: FileText },
  { label: "Blog", href: "/blog", icon: Rss },
  { label: "Pricing", href: "/pricing", icon: DollarSign },
  { label: "Contact", href: "/contact", icon: Mail },
]

const NavLink = ({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) => {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap",
        isActive ? "text-[#7c3aed] dark:text-[#a78bfa]" : "text-foreground/70 hover:text-foreground"
      )}
    >
      <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
      <span>{label}</span>
    </Link>
  )
}

function ThemeToggleBtn() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-9 h-9 hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

export function NotchNavbar({ className, ...props }: React.HTMLAttributes<HTMLElement> & { logo?: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className={cn("fixed top-0 inset-x-0 z-50 h-16 flex px-0", className)} {...props}>

        {/* Left Side Bar */}
        <div className="flex-1 h-10 bg-zinc-50 dark:bg-black z-20 relative min-w-0">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
          </svg>
        </div>

        {/* Notch Container */}
        <div className="flex h-16 relative z-10 shrink-0 -ml-px">

          {/* Left Slice */}
          <div className="w-[50px] h-full relative shrink-0">
            <div className="absolute inset-0 bg-zinc-50 dark:bg-black" style={{ clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')" }} />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 39.5 C25 39.5 25 63.5 50 63.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
              <path d="M0 36.5 C25 36.5 25 60.5 50 60.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
            </svg>
          </div>

          {/* Center Slice */}
          <div className="flex-1 h-full relative min-w-0 -ml-px">
             <div className="absolute inset-0 bg-zinc-50 dark:bg-black">
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                   <line x1="0" y1="63.5" x2="100%" y2="63.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
                   <line x1="0" y1="60.5" x2="100%" y2="60.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
                 </svg>
             </div>

             <div className="relative w-full h-full flex items-end justify-between pb-2 px-4 md:px-8">

               {/* Desktop Left Nav */}
               <nav className="hidden md:flex gap-5 lg:gap-8 mb-1 shrink-0">
                {navItems.slice(0, 4).map(item => (
                  <NavLink key={item.label} {...item} />
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden mb-1 p-1 text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Logo */}
              <div className="flex justify-center shrink-0 mx-2 md:mx-4 mt-1">
                <Link href="/" className="flex items-center justify-center relative group">
                  <svg className="w-7 h-7 text-[#7c3aed] rotate-180 hover:scale-105 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795m-9 0L9.814 4.096 9.813 4.1a.75.75 0 011.396-.135L21 21M9.813 15.904L21 21m-11.188-5.096A9.75 9.75 0 013 12c0-5.385 4.365-9.75 9.75-9.75 2.11 0 4.06.669 5.64 1.8" />
                  </svg>
                </Link>
              </div>

              {/* Desktop Right Nav */}
              <nav className="hidden md:flex gap-5 lg:gap-8 items-center shrink-0">
                {navItems.slice(4).map(item => (
                  <NavLink key={item.label} {...item} />
                ))}

                <div className="flex gap-4 pl-4 border-l border-foreground/10 shrink-0 items-center">
                  <ThemeToggleBtn />
                  <Link href="/login" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                    Log in
                  </Link>
                  <Link href="/register" className="px-3 py-1.5 text-sm font-medium text-white bg-[#7c3aed] hover:bg-[#6d28d9] transition-colors shadow-sm whitespace-nowrap">
                    Register
                  </Link>
                </div>
              </nav>

              {/* Mobile Right */}
              <div className="md:hidden flex items-center gap-2 mb-1">
                <ThemeToggleBtn />
              </div>

             </div>
          </div>

          {/* Right Slice */}
          <div className="w-[50px] h-full relative shrink-0 -ml-px">
            <div className="absolute inset-0 bg-zinc-50 dark:bg-black" style={{ clipPath: "path('M0 0 H50 V40 C25 40 25 64 0 64 Z')" }} />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
              <path d="M0 60.5 C25 60.5 25 36.5 50 36.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
            </svg>
          </div>

        </div>

        {/* Right Side Bar */}
        <div className="flex-1 h-10 bg-zinc-50 dark:bg-black z-20 relative min-w-0 -ml-px">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
          </svg>
        </div>

      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-zinc-50 dark:bg-black border-b border-foreground/5 p-4 md:hidden shadow-lg"
          >
             <nav className="flex flex-col gap-2">
               {navItems.map(item => (
                 <Link
                   key={item.label}
                   href={item.href}
                   className="flex items-center gap-3 p-3 hover:bg-foreground/5 transition-colors"
                   onClick={() => setIsMobileMenuOpen(false)}
                 >
                   <item.icon className="w-5 h-5 opacity-70" />
                   <span className="font-medium text-foreground/90">{item.label}</span>
                 </Link>
               ))}
               <div className="h-px bg-foreground/10 my-2" />
               <div className="flex flex-col gap-2">
                 <Link
                    href="/login"
                    className="flex items-center gap-3 p-3 hover:bg-foreground/5 transition-colors font-medium text-foreground/90"
                    onClick={() => setIsMobileMenuOpen(false)}
                 >
                   Log in
                 </Link>
                 <Link
                    href="/register"
                    className="flex items-center justify-center gap-2 p-3 bg-[#7c3aed] text-white font-medium mt-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                 >
                   Register
                 </Link>
               </div>
             </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
