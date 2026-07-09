"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
 ShoppingBag,
 CalendarCheck,
 CheckCircle,
 Download,
 Bookmark,
 Award,
 Wallet,
 Gift,
 ArrowUpRight,
 ExternalLink,
 FileText,
 BookOpen,
 Shield,
 Clock,
 Users,
 ChevronRight,
 Mail,
 Megaphone,
 Lock,
 AlertCircle,
 HelpCircle,
 MessageSquare,
 Phone,
 Settings,
 User,
 MapPin,
 Mail as MailIcon,
 Phone as PhoneIcon,
 Search,
 Bell,
 Star,
 TrendingUp,
 BarChart3,
 Briefcase,
 PenTool,
 Eye,
 Calendar,
 DollarSign,
 CreditCard,
 Zap,
 Globe,
 Smartphone,
 RefreshCw,
 MoreHorizontal,
} from "lucide-react";
import { AccountLayout } from "@/components/AccountLayout";
import { useAuth } from "@/lib/auth-context";
import { dashboardApi, type DashboardData } from "@/lib/dashboard-api";

const containerVariants = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function StatusBadge({ status }: { status: string }) {
 const getStatusStyle = (s: string) => {
 const lower = s.toLowerCase();
 if (["completed", "successful", "published"].includes(lower))
 return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400";
 if (["in progress", "approved"].includes(lower))
 return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400";
 if (["pending"].includes(lower))
 return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400";
 if (["rescheduled", "degraded"].includes(lower))
 return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:border-purple-900 dark:text-purple-400";
 if (["failed", "cancelled"].includes(lower))
 return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400";
 return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/20 dark:border-slate-900 dark:text-slate-400";
 };
 return (
 <span
 className={cn(
 "inline-block px-2 py-0.5 text-[10px] font-bold border",
 getStatusStyle(status),
 )}
 >
 {status}
 </span>
 );
}

function SectionHeader({ title, href }: { title: string; href?: string }) {
 return (
 <div className="flex items-center justify-between mb-5">
 <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
 {title}
 </h3>
 {href && (
 <Link
 href={href}
 className="text-xs font-bold text-[#7c3aed] hover:underline flex items-center gap-0.5"
 >
 See all <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 )}
 </div>
 );
}

function ProgressBar({
 value,
 color = "bg-[#7c3aed]",
}: {
 value: number;
 color?: string;
}) {
 return (
 <div className="w-full h-2 bg-slate-100 dark:bg-[#1a1a1f] overflow-hidden">
 <div
 className={cn("h-full transition-all duration-500", color)}
 style={{ width: `${value}%` }}
 />
 </div>
 );
}

function Card({
 children,
 className,
}: {
 children: React.ReactNode;
 className?: string;
}) {
 return (
 <div
 className={cn(
 "bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm",
 className,
 )}
 >
 {children}
 </div>
 );
}

export default function AccountPage() {
 const [activeTab, setActiveTab] = useState("all");
 const [isLoading, setIsLoading] = useState(true);
 const [dashboard, setDashboard] = useState<DashboardData | null>(null);
 const { user } = useAuth();

 useEffect(() => {
   const fetchDashboard = async () => {
     try {
       const res = await dashboardApi.getDashboard();
       if (res.success && res.data) {
         setDashboard(res.data as unknown as DashboardData);
       }
     } catch {
       // silently fail
     } finally {
       setIsLoading(false);
     }
   };
   fetchDashboard();
 }, []);

 const userName = user?.name || dashboard?.user?.name || "User";
 const stats = dashboard?.statistics;
 const profileCompletion = dashboard?.profileCompletion || 0;
 const upcomingBookings = dashboard?.upcomingBookings || [];
 const recentPurchases = dashboard?.recentPurchases || [];
 const recentDownloads = dashboard?.recentDownloads || [];
 const recentNotifications = dashboard?.recentNotifications || [];
 const recentActivity = dashboard?.recentActivity || [];

 const summaryCards = [
   { label: "Total Purchases", value: String(stats?.totalPurchases || 0), icon: "ShoppingBag", color: "text-purple-600" },
   { label: "Consultations", value: String(stats?.totalBookings || 0), icon: "CalendarCheck", color: "text-blue-600" },
   { label: "Completed", value: String(stats?.completedBookings || 0), icon: "CheckCircle", color: "text-green-600" },
   { label: "Downloads", value: String(stats?.totalDownloads || 0), icon: "Download", color: "text-amber-600" },
 ];

 if (isLoading) {
 return (
 <AccountLayout currentPath="/account">
 <div className="space-y-4 sm:space-y-6 lg:space-y-8">
 <div className="h-48 animate-pulse bg-slate-200/80 dark:bg-[#1a1a1f]" />
 <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
 {Array.from({ length: 4 }).map((_, index) => (
 <div
 key={index}
 className="h-24 animate-pulse bg-slate-200/80 dark:bg-[#1a1a1f]"
 />
 ))}
 </div>
 <div className="grid gap-4 lg:grid-cols-12">
 <div className="lg:col-span-8 space-y-4">
 <div className="h-56 animate-pulse bg-slate-200/80 dark:bg-[#1a1a1f]" />
 <div className="h-56 animate-pulse bg-slate-200/80 dark:bg-[#1a1a1f]" />
 </div>
 <div className="lg:col-span-4 space-y-4">
 <div className="h-40 animate-pulse bg-slate-200/80 dark:bg-[#1a1a1f]" />
 <div className="h-40 animate-pulse bg-slate-200/80 dark:bg-[#1a1a1f]" />
 </div>
 </div>
 </div>
 </AccountLayout>
 );
 }

 return (
 <AccountLayout currentPath="/account">
 <motion.div
 className="space-y-4 sm:space-y-6 lg:space-y-8"
 variants={containerVariants}
 initial="hidden"
 animate="visible"
 >
 {/* 1. Welcome Card */}
 <motion.div variants={itemVariants}>
 <div className="relative bg-[#7c3aed] text-white p-4 sm:p-6 lg:p-8 overflow-hidden flex flex-col justify-between min-h-[220px] shadow-sm">
 <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#5b21b6]" />
 <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden md:block">
 <Award className="h-40 w-40 text-white" />
 </div>
 <div className="relative z-10 space-y-2">
 <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-200">
 CLIENT PORTAL
 </p>
 <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight max-w-lg leading-snug">
 Hello, {userName}
 </h2>
 <p className="text-sm text-purple-200 max-w-md">
 Welcome back to your dashboard. You have {stats?.pendingBookings || 0} pending consultation{stats?.pendingBookings !== 1 ? "s" : ""} and {stats?.unreadNotifications || 0} unread notification{stats?.unreadNotifications !== 1 ? "s" : ""}.
 </p>
 </div>
 <div className="relative z-10 mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
 <Link
 href="/book"
 className="bg-white text-[#7c3aed] px-4 sm:px-6 py-3 text-xs font-bold hover:bg-purple-50 transition-all shadow-md inline-flex items-center justify-center gap-2"
 >
 Book Consultation <ArrowUpRight className="h-3.5 w-3.5" />
 </Link>
 <Link
 href="/account/bookings"
 className="bg-white/10 text-white border border-white/20 px-4 sm:px-6 py-3 text-xs font-bold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
 >
 View My Projects
 </Link>
 </div>
 </div>
 </motion.div>

 {/* 2. User Summary Cards */}
 <motion.div variants={itemVariants}>
 <SectionHeader title="Your Overview" />
 <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
 {summaryCards.map((card, i) => {
 const IconComponent =
 {
   ShoppingBag,
   CalendarCheck,
   CheckCircle,
   Download,
   Bookmark,
   Award,
   Wallet,
   Gift,
 }[card.icon] || ShoppingBag;
 return (
   <Card key={i} className="p-5">
     <div className="flex items-center justify-between mb-3">
       <div
         className={cn(
           "flex h-9 w-9 items-center justify-center",
           card.color
             .replace("text-", "bg-")
             .replace("600", "50") +
             " dark:" +
             card.color
               .replace("text-", "bg-")
               .replace("600", "950/20"),
         )}
       >
         <IconComponent
           className={cn("h-4.5 w-4.5", card.color)}
         />
       </div>
     </div>
     <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
       {card.label}
     </p>
     <p className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight mt-0.5">
       {card.value}
     </p>
   </Card>
 );
 })}
 </div>
 </motion.div>

 {/* Main 2-column layout */}
 <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-12 items-start">
 {/* Left Column */}
  <div className="lg:col-span-8 space-y-4 sm:space-y-6 lg:space-y-8">

  {/* Consultation Progress */}
 <motion.div variants={itemVariants}>
 <SectionHeader title="Consultation Progress" />
 <Card className="p-6">
 <div className="relative">
 {[
   { label: "Booking Submitted", completed: true, date: "Complete" },
   { label: "Under Review", completed: true, date: "Complete" },
   { label: "Consultant Assigned", completed: false, date: "Pending" },
   { label: "In Progress", completed: false, date: "Pending" },
   { label: "Completed", completed: false, date: "Pending" },
 ].map((step, i) => (
   <div
     key={i}
     className="flex items-start gap-4 pb-6 last:pb-0 relative"
   >
     <div className="flex flex-col items-center">
       <div
         className={cn(
           "flex h-8 w-8 shrink-0 items-center justify-center border-2 z-10",
           step.completed
             ? "bg-[#7c3aed] border-[#7c3aed] text-white"
             : "bg-white dark:bg-[#0c0c0e] border-slate-300 dark:border-slate-600 text-slate-400",
         )}
       >
         {step.completed ? (
           <CheckCircle className="h-4 w-4" />
         ) : (
           <span className="text-xs font-bold">{i + 1}</span>
         )}
       </div>
       {i < 4 && (
         <div
           className={cn(
             "w-0.5 h-full absolute top-8 left-4 -translate-x-1/2",
             step.completed
               ? "bg-[#7c3aed]"
               : "bg-slate-200 dark:bg-[#1a1a1f]",
           )}
         />
       )}
     </div>
     <div className="pt-1">
       <p
         className={cn(
           "text-sm font-bold",
           step.completed
             ? "text-slate-900 dark:text-white"
             : "text-slate-400 dark:text-slate-500",
         )}
       >
         {step.label}
       </p>
       <p className="text-[10px] text-slate-400 mt-0.5">
         {step.date}
       </p>
     </div>
   </div>
 ))}
 </div>
 </Card>
 </motion.div>

 {/* 6. Recent Payments */}
 <motion.div variants={itemVariants}>
 <SectionHeader title="Recent Payments" href="/account/payments" />
 <Card className="p-6 text-center">
 <CreditCard className="h-8 w-8 mx-auto text-slate-300 mb-2" />
 <p className="text-xs text-slate-400">Payment history will appear here</p>
 </Card>
 </motion.div>

  </div>

  {/* Right Column - Sidebar */}
  <div className="lg:col-span-4 space-y-4 sm:space-y-6 lg:space-y-8">
  {/* Upcoming Deadlines */}
  <motion.div variants={itemVariants}>
  <SectionHeader title="Upcoming Deadlines" />
  <Card className="p-5">
  <div className="space-y-4">
  {upcomingBookings.length === 0 ? (
    <div className="text-center py-4">
      <Calendar className="h-6 w-6 mx-auto text-slate-300 mb-2" />
      <p className="text-xs text-slate-400">No upcoming deadlines</p>
    </div>
  ) : (
    upcomingBookings.slice(0, 3).map((b, i) => (
      <div
        key={i}
        className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-[#1a1a1f] last:border-0 last:pb-0"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-purple-50 dark:bg-purple-950/20 text-[#7c3aed]">
          <Calendar className="h-4.5 w-4.5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-900 dark:text-white">
            {b.title}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {new Date(b.preferredDate).toLocaleDateString()} at {b.preferredTime}
          </p>
        </div>
        <span className="shrink-0 text-[9px] font-bold px-2 py-0.5 border bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400">
          {b.meetingType}
        </span>
      </div>
    ))
  )}
  </div>
  </Card>
  </motion.div>

  {/* Profile Summary */}
 <motion.div variants={itemVariants}>
 <SectionHeader title="Profile Summary" />
 <Card className="p-6">
 <div className="flex flex-col items-center text-center">
   <div className="flex h-16 w-16 items-center justify-center bg-[#7c3aed] text-white text-xl font-bold font-mono shadow-md mb-4 overflow-hidden">
     {dashboard?.user?.avatar ? (
       <img src={dashboard.user.avatar} alt={userName} className="w-full h-full object-cover" />
     ) : (
       userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
     )}
   </div>
   <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
     {userName}
   </h4>
   <span className="inline-block mt-1 px-2.5 py-0.5 text-[9px] font-bold border bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400 uppercase tracking-wider">
     {user?.isVerified ? "Verified Member" : "Member"}
   </span>
 </div>
 <div className="mt-6 space-y-3 text-xs">
   <div className="flex items-center justify-between">
     <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
       <MapPin className="h-3.5 w-3.5" /> Country
     </div>
     <span className="font-bold text-slate-900 dark:text-white">
       {dashboard?.user?.country || "Not set"}
     </span>
   </div>
   <div className="flex items-center justify-between">
     <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
       <MailIcon className="h-3.5 w-3.5" /> Email
     </div>
     <span className="font-bold text-slate-900 dark:text-white text-[10px]">
       {dashboard?.user?.email || user?.email}
     </span>
   </div>
   <div className="flex items-center justify-between">
     <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
       <PhoneIcon className="h-3.5 w-3.5" /> Phone
     </div>
     <span className="font-bold text-slate-900 dark:text-white">
       {dashboard?.user?.phone || "Not set"}
     </span>
   </div>
 </div>
 <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#1a1a1f]">
   <div className="flex items-center justify-between mb-2">
     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
       Profile Completion
     </span>
     <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
       {profileCompletion}%
     </span>
   </div>
   <ProgressBar value={profileCompletion} />
 </div>
 <Link
   href="/account/profile"
   className="block mt-4 text-center w-full border border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white text-xs font-bold py-2.5 transition-all"
 >
   Edit Profile
 </Link>
  </Card>
  </motion.div>


  {/* Support Card */}
 <motion.div variants={itemVariants}>
 <Card className="p-6 bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white border-0">
 <div className="text-center">
 <HelpCircle className="h-10 w-10 mx-auto mb-3 text-purple-200" />
 <h4 className="text-base font-extrabold">Need Help?</h4>
 <p className="text-xs text-purple-200 mt-1 mb-6">
 Our support team is available 24/7 to assist you.
 </p>
 <div className="grid grid-cols-2 gap-3">
 <button className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white text-[10px] font-bold py-3 hover:bg-white/20 transition-all">
 <MessageSquare className="h-3.5 w-3.5" /> Live Chat
 </button>
 <button className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white text-[10px] font-bold py-3 hover:bg-white/20 transition-all">
 <PhoneIcon className="h-3.5 w-3.5" /> WhatsApp
 </button>
 <button className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white text-[10px] font-bold py-3 hover:bg-white/20 transition-all">
 <MailIcon className="h-3.5 w-3.5" /> Email
 </button>
 <button className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white text-[10px] font-bold py-3 hover:bg-white/20 transition-all">
 <HelpCircle className="h-3.5 w-3.5" /> FAQs
 </button>
 </div>
 </div>
 </Card>
 </motion.div>
 </div>
 </div>
 </motion.div>
 </AccountLayout>
 );
}
