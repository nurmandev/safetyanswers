"use client";

import Link from "next/link";
import { useState } from "react";

const overviewLinks = [
 {
 href: "/account",
 label: "Dashboard",
 icon: (
 <svg
 className="h-5 w-5"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
 />
 </svg>
 ),
 },
 {
 href: "/account/notifications",
 label: "Inbox",
 icon: (
 <svg
 className="h-5 w-5"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
 />
 </svg>
 ),
 },
 {
 href: "/account/bookings",
 label: "Consultations",
 icon: (
 <svg
 className="h-5 w-5"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
 />
 </svg>
 ),
 },
 {
 href: "/book",
 label: "Book Consultation",
 icon: (
 <svg
 className="h-5 w-5"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M12 4.5v15m7.5-7.5h-15"
 />
 </svg>
 ),
 },
 {
 href: "/account/purchased",
 label: "Library",
 icon: (
 <svg
 className="h-5 w-5"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0112 3m0 0c2.917 0 5.747.294 8.5.862m-21 10.39c0-.621.504-1.125 1.125-1.125h13.5c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125H3.375a1.125 1.125 0 01-1.125-1.125V13.5z"
 />
 </svg>
 ),
 },
 {
 href: "/account/downloads",
 label: "Files",
 icon: (
 <svg
 className="h-5 w-5"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
 />
 </svg>
 ),
 },
 {
 href: "/account/payments",
 label: "Billing",
 icon: (
 <svg
 className="h-5 w-5"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
 />
 </svg>
 ),
 },
];

const settingsLinks = [
 {
 href: "/account/profile",
 label: "Profile",
 icon: (
 <svg
 className="h-5 w-5"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
 />
 </svg>
 ),
 },
 {
 href: "/account/settings",
 label: "Setting",
 icon: (
 <svg
 className="h-5 w-5"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"
 />
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
 />
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
 const [sidebarOpen, setSidebarOpen] = useState(false);

 return (
 <div className="min-h-screen bg-[#0d0d0d] flex flex-col lg:flex-row lg:overflow-hidden">
 <button
 onClick={() => setSidebarOpen(!sidebarOpen)}
 className="lg:hidden fixed top-4 left-4 z-50 flex h-11 w-11 items-center justify-center bg-[#c8ff00] text-black shadow-lg ring-1 ring-black/20"
 >
 {sidebarOpen ? (
 <svg
 className="h-6 w-6"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M6 18L18 6M6 6l12 12"
 />
 </svg>
 ) : (
 <svg
 className="h-6 w-6"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
 />
 </svg>
 )}
 </button>

 {sidebarOpen && (
 <div
 className="lg:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
 onClick={() => setSidebarOpen(false)}
 />
 )}

 <aside
  className={`fixed lg:sticky lg:top-0 left-0 h-screen lg:h-screen w-[84vw] max-w-[320px] bg-[#111111] border-r border-white/10 z-40 lg:z-auto transition-transform duration-300 ease-out shadow-2xl lg:shadow-none ${
  sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
  } lg:w-64 lg:flex lg:flex-col lg:border-b lg:border-r lg:border-b-0 lg:p-6 p-5 flex flex-col justify-between shrink-0`}
 >
 <div>
 <div className="flex items-center justify-between gap-3 mb-8">
 <div className="flex items-center gap-3">
 <div className="flex h-10 w-10 items-center justify-center bg-[#c8ff00] text-black">
 <svg
 className="h-5 w-5 animate-pulse-slow"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M9.813 15.904L9 21l8.982-11.795m-9 0L9.814 4.096 9.813 4.1a.75.75 0 011.396-.135L21 21M9.813 15.904L21 21m-11.188-5.096A9.75 9.75 0 013 12c0-5.385 4.365-9.75 9.75-9.75 2.11 0 4.06.669 5.64 1.8"
 />
 </svg>
 </div>
 <span className="text-lg lg:text-xl font-bold tracking-tight text-white">
 safetyanswers
 </span>
 </div>
 <button
 onClick={() => setSidebarOpen(false)}
 className="lg:hidden flex h-9 w-9 items-center justify-center border border-white/20 text-white/50 hover:bg-white/10"
 >
 <svg
 className="h-4 w-4"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.2"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M6 18L18 6M6 6l12 12"
 />
 </svg>
 </button>
 </div>

 <div className="mb-8 max-h-[calc(100vh-220px)] lg:max-h-none overflow-y-auto lg:overflow-y-visible">
 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4 px-3">
 Overview
 </p>
 <nav className="space-y-1">
 {overviewLinks.map((item) => {
 const isActive = currentPath === item.href;
 return (
 <Link
 key={item.href}
 href={item.href}
 onClick={() => setSidebarOpen(false)}
 className={`flex items-center gap-4 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap ${
 isActive
 ? "bg-[#c8ff00] text-black shadow-md"
 : "text-white/60 hover:bg-white/5 hover:text-white"
 }`}
 >
 <span className="flex-shrink-0">{item.icon}</span>
 <span className="inline">{item.label}</span>
 </Link>
 );
 })}
 </nav>
 </div>
 </div>

 <div className="space-y-1 pt-6 border-t border-white/10">
 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4 px-3 hidden lg:block">
 Settings
 </p>
 <nav className="space-y-1">
 {settingsLinks.map((item) => {
 const isActive = currentPath === item.href;
 return (
 <Link
 key={item.href}
 href={item.href}
 onClick={() => setSidebarOpen(false)}
 className={`flex items-center gap-4 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap ${
 isActive
 ? "bg-[#c8ff00] text-black shadow-md"
 : "text-white/60 hover:bg-white/5 hover:text-white"
 }`}
 >
 <span className="flex-shrink-0">{item.icon}</span>
 <span className="inline">{item.label}</span>
 </Link>
 );
 })}
 <Link
 href="/login"
 onClick={() => setSidebarOpen(false)}
 className="flex items-center gap-4 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all"
 >
 <svg
 className="h-5 w-5 flex-shrink-0"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
 />
 </svg>
 <span className="inline">Logout</span>
 </Link>
 </nav>
 </div>
 </aside>

      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-10 overflow-x-hidden lg:overflow-y-auto lg:max-h-screen pt-16 lg:pt-6 bg-[#0d0d0d]">
 <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8">
 <div className="relative w-full max-w-md">
 <span className="absolute inset-y-0 left-4 flex items-center text-white/30">
 <svg
 className="h-5 w-5"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="2.5"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z"
 />
 </svg>
 </span>
 <input
 type="text"
 placeholder="Search your consultancy file...."
 className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 shadow-sm focus:outline-none focus:border-[#c8ff00]"
 />
 </div>

 <div />
 </header>

 <div className="flex-1 flex flex-col">{children}</div>
 </div>
 </div>
 );
}
