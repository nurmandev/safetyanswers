"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider, useTheme } from "./ThemeContext";
import {
  LayoutDashboard,
  FileText,
  Lock,
  FolderOpen,
  Tag,
  BookOpen,
  PenTool,
  Shield,
  Calendar,
  DollarSign,
  Users,
  MessageSquare,
  Mail,
  FolderHeart,
  TrendingUp,
  FileSpreadsheet,
  Settings,
  ShieldAlert,
  History,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  Activity,
  Menu
} from "lucide-react";

const sidebarGroups = [
  {
    title: "Core",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard }
    ]
  },
  {
    title: "Content",
    items: [
      { href: "/admin/posts", label: "Blog Posts", icon: FileText },
      { href: "/admin/premium", label: "Premium Articles", icon: Lock },
      { href: "/admin/categories", label: "Categories", icon: FolderOpen },
      { href: "/admin/tags", label: "Tags List", icon: Tag }
    ]
  },
  {
    title: "Services",
    items: [
      { href: "/admin/academic", label: "Academic", icon: BookOpen },
      { href: "/admin/professional-writing", label: "Professional Writing", icon: PenTool },
      { href: "/admin/health-safety", label: "Health & Safety", icon: Shield }
    ]
  },
  {
    title: "Bookings",
    items: [
      { href: "/admin/bookings", label: "All Bookings", icon: Calendar },
      { href: "/admin/bookings?status=pending", label: "Pending", icon: Calendar, query: "pending" },
      { href: "/admin/bookings?status=approved", label: "Approved", icon: Calendar, query: "approved" },
      { href: "/admin/bookings?status=completed", label: "Completed", icon: Calendar, query: "completed" },
      { href: "/admin/bookings?status=cancelled", label: "Cancelled", icon: Calendar, query: "cancelled" }
    ]
  },
  {
    title: "Payments",
    items: [
      { href: "/admin/payments", label: "Transactions", icon: DollarSign },
      { href: "/admin/payments?refund=true", label: "Refund Requests", icon: DollarSign, query: "refund" },
      { href: "/admin/gateways", label: "Payment Gateways", icon: Settings }
    ]
  },
  {
    title: "Users",
    items: [
      { href: "/admin/users", label: "All Users", icon: Users },
      { href: "/admin/users?role=registered", label: "Registered Users", icon: Users, query: "registered" },
      { href: "/admin/guests", label: "Guest Purchases", icon: Users }
    ]
  },
  {
    title: "Engagement",
    items: [
      { href: "/admin/testimonials", label: "Testimonials", icon: FolderHeart },
      { href: "/admin/newsletter", label: "Newsletter", icon: Mail }
    ]
  },
  {
    title: "Assets & Reporting",
    items: [
      { href: "/admin/media", label: "Media Library", icon: FolderOpen },
      { href: "/admin/uploads", label: "File Uploads", icon: FileSpreadsheet },
      { href: "/admin/reports", label: "Reports", icon: FileText },
      { href: "/admin/analytics", label: "Analytics", icon: TrendingUp }
    ]
  },
  {
    title: "Settings & System",
    items: [
      { href: "/admin/settings", label: "Website Settings", icon: Settings },
      { href: "/admin/roles", label: "Roles & Permissions", icon: ShieldAlert },
      { href: "/admin/logs", label: "Activity Logs", icon: History },
      { href: "/admin/support", label: "Support Messages", icon: MessageSquare },
      { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
      { href: "/admin/health", label: "System Health", icon: Activity }
    ]
  }
];

function AdminLayoutInner({
  title,
  children
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const pathParts = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const href = "/" + pathParts.slice(0, index + 1).join("/");
    const label = part.charAt(0).toUpperCase() + part.slice(1).replace("-", " ");
    return { href, label };
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#09090b] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between bg-white dark:bg-[#0c0c0e] border-r border-slate-100 dark:border-[#1a1a1f] transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} lg:sticky lg:h-screen lg:top-0`}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 scrollbar-thin">

          {/* Logo */}
          <div className="flex items-center justify-between px-4 mb-8">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#7c3aed] text-white shadow-md">
                <Shield className="h-5 w-5" />
              </div>
              {!collapsed && (
                <span className="text-base font-bold tracking-tight text-[#0f172a] dark:text-white truncate">
                  safetyanswers.com
                </span>
              )}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex h-6 w-6 items-center justify-center border border-slate-100 dark:border-[#1e1e24] bg-slate-50 dark:bg-[#121215] text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Groups */}
          <div className="space-y-6">
            {sidebarGroups.map((group) => (
              <div key={group.title} className="px-3">
                {!collapsed && (
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2 px-3">
                    {group.title}
                  </p>
                )}
                <nav className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.query ? pathname.startsWith(item.href.split("?")[0]) : false);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-4 px-4 py-3 text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-[#7c3aed] text-white shadow-md"
                            : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#131317] hover:text-slate-800 dark:hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-[#1a1a1f] space-y-0.5">
          <Link
            href="/admin/profile"
            className="flex items-center gap-4 px-4 py-3 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#131317] hover:text-slate-800 transition-all"
          >
            <Users className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Admin Profile</span>}
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-4 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* ── Main Workspace ── */}
      <div className="flex-1 flex flex-col min-w-0 lg:h-screen lg:overflow-hidden">

        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-[#0c0c0e] border-b border-slate-100 dark:border-[#1a1a1f] px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">

          {/* Left: mobile trigger + search */}
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex lg:hidden h-10 w-10 items-center justify-center border border-slate-100 text-slate-600 hover:bg-slate-50"
            >
              <Menu className="h-5 w-5" />
            </button>

            <form onSubmit={handleGlobalSearch} className="relative w-full">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="Search users, bookings, payments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#121215] border border-slate-100 dark:border-[#1a1a1f] text-sm text-slate-700 dark:text-slate-100 shadow-sm focus:outline-none focus:border-[#7c3aed]"
              />
            </form>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3">

            {/* Quick Actions */}
            <div className="relative">
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] transition-colors shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Quick Add</span>
              </button>
              {showQuickActions && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowQuickActions(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0c0c0e] border border-slate-100 dark:border-[#1a1a1f] shadow-lg z-20 py-1 text-sm">
                    <Link href="/admin/posts" className="block px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-[#131317] font-semibold text-slate-700 dark:text-slate-300" onClick={() => setShowQuickActions(false)}>Create Blog Post</Link>
                    <Link href="/admin/premium" className="block px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-[#131317] font-semibold text-slate-700 dark:text-slate-300" onClick={() => setShowQuickActions(false)}>Upload Premium File</Link>
                    <Link href="/admin/bookings" className="block px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-[#131317] font-semibold text-slate-700 dark:text-slate-300" onClick={() => setShowQuickActions(false)}>Review Bookings</Link>
                  </div>
                </>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-[#1a1a1f]" />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center border border-slate-100 dark:border-[#1e1e24] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#131317] shadow-sm transition-all"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="flex h-10 w-10 items-center justify-center border border-slate-100 dark:border-[#1e1e24] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#131317] shadow-sm transition-all relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 border-2 border-white" />
              </button>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0c0c0e] border border-slate-100 dark:border-[#1a1a1f] shadow-lg z-20 p-4 space-y-3">
                    <p className="font-bold border-b pb-2 text-slate-900 dark:text-white text-sm">Recent Admin Alerts</p>
                    <div className="space-y-2 text-sm">
                      <div className="p-3 bg-[#f8fafc] dark:bg-[#121215] border border-slate-100">
                        <p className="font-bold text-[10px] text-[#7c3aed] uppercase tracking-wider">NEW BOOKING</p>
                        <p className="text-slate-700 dark:text-slate-300 mt-1 font-semibold">Alicia booked SPSS dissertation audit.</p>
                      </div>
                      <div className="p-3 bg-[#f8fafc] dark:bg-[#121215] border border-slate-100">
                        <p className="font-bold text-[10px] text-green-600 uppercase tracking-wider">PAYMENT RECEIVED</p>
                        <p className="text-slate-700 dark:text-slate-300 mt-1 font-semibold">INV-1042 settled successfully ($149.00).</p>
                      </div>
                    </div>
                    <Link href="/admin/notifications" className="block text-center text-[#7c3aed] font-bold text-xs pt-1" onClick={() => setShowNotifications(false)}>
                      View All Alerts →
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center bg-slate-900 text-white font-bold font-mono shadow-sm border border-slate-100 dark:border-[#1a1a1f]">
                  AD
                </div>
                <span className="hidden sm:block text-sm font-bold text-slate-900 dark:text-white">Admin</span>
              </button>
              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0c0c0e] border border-slate-100 dark:border-[#1a1a1f] shadow-lg z-20 py-1 text-sm">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-[#1a1a1f]">
                      <p className="font-bold text-slate-900 dark:text-white">Admin Coordinator</p>
                      <p className="text-xs text-slate-400 mt-0.5">admin@safetyanswers.com</p>
                    </div>
                    <Link href="/admin/profile" className="block px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#131317]" onClick={() => setShowProfileMenu(false)}>My Profile</Link>
                    <Link href="/admin/settings" className="block px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#131317]" onClick={() => setShowProfileMenu(false)}>Settings</Link>
                    <Link href="/login" className="block px-4 py-2.5 font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20" onClick={() => setShowProfileMenu(false)}>Logout</Link>
                  </div>
                </>
              )}
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">

          {/* Breadcrumbs + Title */}
          <div className="mb-8 space-y-1">
            <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <Link href="/admin" className="hover:text-slate-700 dark:hover:text-slate-300">Admin</Link>
              {breadcrumbs.map((bc, index) => {
                if (index === 0) return null;
                return (
                  <React.Fragment key={bc.href}>
                    <span>/</span>
                    <Link href={bc.href} className="hover:text-slate-700 dark:hover:text-slate-300">
                      {bc.label}
                    </Link>
                  </React.Fragment>
                );
              })}
            </nav>
            <h2 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">
              {title || "Control Center"}
            </h2>
          </div>

          <div className="space-y-8">{children}</div>

          {/* Footer */}
          <footer className="mt-16 pt-6 border-t border-slate-100 dark:border-[#1a1a1f] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>© {new Date().getFullYear()} safetyanswers.com — All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/admin/settings" className="hover:text-slate-700">Platform System</Link>
              <Link href="/admin/health" className="hover:text-slate-700">System Health</Link>
            </div>
          </footer>
        </main>
      </div>

    </div>
  );
}

export function AdminLayout({
  title,
  children,
  currentPath
}: {
  title?: string;
  children: React.ReactNode;
  currentPath?: string;
}) {
  return (
    <ThemeProvider>
      <AdminLayoutInner title={title}>{children}</AdminLayoutInner>
    </ThemeProvider>
  );
}
