"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const overviewLinks = [
  {
    href: "/account",
    label: "Dashboard",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    href: "/account/notifications",
    label: "Notifications",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
  {
    href: "/account/bookings",
    label: "Consultations",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    href: "/account/purchased",
    label: "Library",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    href: "/account/downloads",
    label: "Downloads",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
  {
    href: "/account/payments",
    label: "Billing",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    href: "/account/messages",
    label: "Messages",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    href: "/account/support",
    label: "Support",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
];

const settingsLinks = [
  {
    href: "/account/profile",
    label: "Profile",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    href: "/account/settings",
    label: "Settings",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function AccountLayout({
  currentPath,
  children,
}: {
  title?: string;
  description?: string;
  currentPath: string;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=" + encodeURIComponent(currentPath));
    }
  }, [user, loading, router, currentPath]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 bg-[#7c3aed] animate-pulse" />
          <div className="h-2 w-24 bg-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col lg:flex-row lg:overflow-hidden">
      {/* Sidebar overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-slate-950/55 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-slate-100 z-40 transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none flex flex-col overflow-hidden shrink-0 ${
          sidebarOpen
            ? "w-full sm:w-[280px] lg:w-60 translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:w-20"
        }`}
      >
        {/* Sidebar logo */}
        <div className={`flex items-center h-16 shrink-0 border-b border-slate-200/60 transition-all duration-300 overflow-hidden ${sidebarOpen ? "justify-between px-4" : "justify-center px-0"}`}>
          <Link href="/account" className="flex items-center gap-2.5 shrink-0" title="Dashboard">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#7c3aed] text-white shadow-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795m-9 0L9.814 4.096 9.813 4.1a.75.75 0 011.396-.135L21 21M9.813 15.904L21 21m-11.188-5.096A9.75 9.75 0 013 12c0-5.385 4.365-9.75 9.75-9.75 2.11 0 4.06.669 5.64 1.8" />
              </svg>
            </div>
            <span className={`text-base font-bold tracking-tight text-[#0f172a] transition-all duration-300 whitespace-nowrap ${sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"}`}>
              safetyanswers
            </span>
          </Link>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className={`flex h-7 w-7 shrink-0 items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors lg:hidden ${!sidebarOpen ? "hidden" : ""}`}
            title="Close sidebar"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Sidebar nav */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 pt-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 transition-all duration-300 whitespace-nowrap ${sidebarOpen ? "px-3" : "opacity-0 h-0 overflow-hidden mb-0"}`}>
            Menu
          </p>
          <nav className="space-y-1">
            {overviewLinks.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  title={!sidebarOpen ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold transition-all ${
                    isActive
                      ? "bg-[#7c3aed] text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  } ${!sidebarOpen ? "justify-center px-0" : ""}`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className={`transition-all duration-300 whitespace-nowrap ${sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"}`}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 transition-all duration-300 whitespace-nowrap ${sidebarOpen ? "px-3" : "opacity-0 h-0 overflow-hidden mb-0"}`}>
              Account
            </p>
            <nav className="space-y-1">
              {settingsLinks.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    title={!sidebarOpen ? item.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold transition-all ${
                      isActive
                        ? "bg-[#7c3aed] text-white shadow-sm"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    } ${!sidebarOpen ? "justify-center px-0" : ""}`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className={`transition-all duration-300 whitespace-nowrap ${sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"}`}>{item.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  logout();
                }}
                title={!sidebarOpen ? "Logout" : undefined}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-all ${!sidebarOpen ? "justify-center px-0" : ""}`}
              >
                <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <span className={`transition-all duration-300 whitespace-nowrap ${sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"}`}>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className={`flex-1 flex flex-col min-h-0 min-w-0 transition-all duration-300 ease-in-out ${sidebarOpen ? "lg:ml-60" : "lg:ml-20"}`}>
        {/* Premium Navbar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-4 sm:px-6 h-16 shrink-0 transition-all">
          {/* Left section: Sidebar toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-9 w-9 items-center justify-center text-slate-500 hover:bg-slate-100/80 hover:text-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20"
              aria-label="Toggle Sidebar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </button>
          </div>

          {/* Mobile Search Modal moved to root for full-page coverage */}

          {/* Center section: Search */}
          <div className="flex-1 max-w-xl mx-auto px-4 hidden sm:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400 group-focus-within:text-[#7c3aed] transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search resources, bookings..."
                className="w-full pl-10 pr-12 py-2 bg-slate-50/50 hover:bg-slate-100/50 border border-slate-200/80 text-sm text-slate-700 focus:outline-none focus:bg-white focus:border-[#7c3aed]/40 focus:ring-4 focus:ring-[#7c3aed]/10 transition-all placeholder:text-slate-400"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="hidden lg:flex items-center justify-center px-1.5 h-5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 shadow-sm">
                  ⌘K
                </span>
              </div>
            </div>
          </div>

          {/* Right section: Actions & User */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* Mobile search button */}
            <button 
              onClick={() => setMobileSearchOpen(true)}
              className="sm:hidden flex h-9 w-9 items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
              </svg>
            </button>

            {/* Notification Bell Removed */}

            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-1 sm:pl-0">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-semibold text-slate-700 leading-none">
                  {user.name}
                </span>
                <span className="text-[11px] font-medium text-slate-500 mt-1">
                  Client Account
                </span>
              </div>
              <div className="relative h-9 w-9 bg-gradient-to-tr from-[#7c3aed] to-[#a78bfa] flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-white cursor-pointer hover:ring-[#7c3aed]/20 transition-all">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              
              <button
                onClick={() => logout()}
                className="ml-1 flex h-8 w-8 items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                title="Logout"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-3 sm:px-5 lg:px-6 pt-4 sm:pt-6 lg:pt-8 pb-3 sm:pb-5 lg:pb-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Search Modal */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4 bg-slate-950/60 backdrop-blur-sm sm:hidden">
          <div className="w-full max-w-sm bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">Search</h3>
              <button 
                onClick={() => setMobileSearchOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
                </svg>
              </div>
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 text-base text-slate-700 focus:outline-none focus:border-[#7c3aed]/40 focus:ring-2 focus:ring-[#7c3aed]/10 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
