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
import {
 userSummaryCards,
 userPurchases,
 userConsultations,
 consultationProgressSteps,
 userPayments,
 downloadItems,
 savedArticles,
 recommendedArticles,
 upcomingDeadlines,
 userNotifications,
 userRecentActivity,
} from "@/lib/mock-data";

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

 useEffect(() => {
 const timer = window.setTimeout(() => setIsLoading(false), 650);
 return () => window.clearTimeout(timer);
 }, []);

 const filteredPurchases =
 activeTab === "all" ? userPurchases : userPurchases.slice(0, 3);

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
 Hello, John ðŸ‘‹ Welcome back.
 </h2>
 <p className="text-sm text-purple-200 max-w-md">
 You're making great progress! Your PhD dissertation audit is 35%
 complete. Continue where you left off and keep up the excellent
 work.
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
 {userSummaryCards.map((card, i) => {
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
 {/* 3. My Purchases */}
 <motion.div variants={itemVariants}>
 <SectionHeader title="My Purchases" href="/account/purchased" />
 <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
 {userPurchases.slice(0, 4).map((purchase, i) => (
 <Card key={i} className="p-5 flex flex-col justify-between">
 <div>
 <div className="flex items-center gap-3 mb-3">
 <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-purple-50 dark:bg-purple-950/20 text-[#7c3aed]">
 <FileText className="h-5 w-5" />
 </div>
 <div className="min-w-0">
 <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
 {purchase.title}
 </p>
 <p className="text-[10px] text-slate-400 mt-0.5">
 {purchase.purchaseDate}
 </p>
 </div>
 </div>
 </div>
 <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#1a1a1f] mt-3">
 <span className="text-xs font-bold text-[#7c3aed]">
 {purchase.price}
 </span>
 <div className="flex gap-2">
 <button className="text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#1a1a1f] px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-[#121215] transition-all">
 Download
 </button>
 <button className="text-[10px] font-bold bg-[#7c3aed] text-white px-3 py-1.5 hover:bg-[#6d28d9] transition-all">
 Read
 </button>
 </div>
 </div>
 </Card>
 ))}
 </div>
 </motion.div>

 {/* 4. My Consultations */}
 <motion.div variants={itemVariants}>
 <SectionHeader
 title="My Consultations"
 href="/account/bookings"
 />
 <Card className="overflow-hidden">
 <div className="hidden lg:block overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] text-slate-400 font-bold uppercase tracking-wider text-[9px]">
 <th className="pb-3 px-4">Service</th>
 <th className="pb-3 px-4">Status</th>
 <th className="pb-3 px-4">Deadline</th>
 <th className="pb-3 px-4">Consultant</th>
 <th className="pb-3 px-4">Progress</th>
 <th className="pb-3 px-4 text-right">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f]">
 {userConsultations.map((c, i) => (
 <tr
 key={i}
 className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors"
 >
 <td className="py-4 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
 {c.service}
 </td>
 <td className="py-4 px-4">
 <StatusBadge status={c.status} />
 </td>
 <td className="py-4 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
 {c.deadline}
 </td>
 <td className="py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold whitespace-nowrap">
 {c.consultant}
 </td>
 <td className="py-4 px-4">
 <div className="flex items-center gap-2">
 <div className="w-16 h-1.5 bg-slate-100 dark:bg-[#1a1a1f] overflow-hidden">
 <div
 className="h-full bg-[#7c3aed] transition-all"
 style={{ width: `${c.progress}%` }}
 />
 </div>
 <span className="text-[10px] font-bold text-slate-400">
 {c.progress}%
 </span>
 </div>
 </td>
 <td className="py-4 px-4 text-right">
 <button className="text-[10px] font-bold text-[#7c3aed] border border-[#7c3aed] px-3 py-1.5 hover:bg-[#7c3aed] hover:text-white transition-all">
 View
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <div className="lg:hidden p-4 space-y-3">
 {userConsultations.map((c, i) => (
 <div
 key={i}
                className="border border-slate-200 dark:border-[#1a1a1f] bg-slate-50/70 dark:bg-[#121215]/50 p-4"
 >
 <div className="flex items-start justify-between gap-3">
 <div>
 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
 {c.service}
 </p>
 <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
 {c.consultant}
 </p>
 </div>
 <StatusBadge status={c.status} />
 </div>
 <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
 <span>{c.deadline}</span>
 <span>{c.progress}%</span>
 </div>
 <div className="mt-2 h-1.5 w-full bg-slate-200 dark:bg-[#1a1a1f] overflow-hidden">
 <div
 className="h-full bg-[#7c3aed]"
 style={{ width: `${c.progress}%` }}
 />
 </div>
 </div>
 ))}
 </div>
 </Card>
 </motion.div>

 {/* 5. Consultation Progress Timeline */}
 <motion.div variants={itemVariants}>
 <SectionHeader title="Consultation Progress" />
 <Card className="p-6">
 <div className="relative">
 {consultationProgressSteps.map((step, i) => (
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
 {i < consultationProgressSteps.length - 1 && (
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
 <Card className="overflow-hidden">
 <div className="hidden lg:block overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] text-slate-400 font-bold uppercase tracking-wider text-[9px]">
 <th className="pb-3 px-4">Invoice</th>
 <th className="pb-3 px-4">Amount</th>
 <th className="pb-3 px-4">Gateway</th>
 <th className="pb-3 px-4">Receipt</th>
 <th className="pb-3 px-4">Status</th>
 <th className="pb-3 px-4 text-right">Date</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f]">
 {userPayments.map((p, i) => (
 <tr
 key={i}
 className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors"
 >
 <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
 {p.invoice}
 </td>
 <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
 {p.amount}
 </td>
 <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
 {p.gateway}
 </td>
 <td className="py-4 px-4">
 <button className="text-[10px] font-bold text-[#7c3aed] hover:underline flex items-center gap-1">
 <Download className="h-3 w-3" /> PDF
 </button>
 </td>
 <td className="py-4 px-4">
 <StatusBadge status={p.status} />
 </td>
 <td className="py-4 px-4 text-right text-slate-500 dark:text-slate-400">
 {p.date}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <div className="lg:hidden p-4 space-y-3">
 {userPayments.map((p, i) => (
 <div
 key={i}
                className="border border-slate-200 dark:border-[#1a1a1f] bg-slate-50/70 dark:bg-[#121215]/50 p-4"
 >
 <div className="flex items-start justify-between gap-3">
 <div>
 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
 {p.invoice}
 </p>
 <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
 {p.amount}
 </p>
 </div>
 <StatusBadge status={p.status} />
 </div>
 <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
 <span>{p.gateway}</span>
 <span>{p.date}</span>
 </div>
 </div>
 ))}
 </div>
 </Card>
 </motion.div>

 {/* 7. Download Center */}
 <motion.div variants={itemVariants}>
 <SectionHeader
 title="Download Center"
 href="/account/downloads"
 />
 <Card className="overflow-hidden">
 <div className="hidden lg:block overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] text-slate-400 font-bold uppercase tracking-wider text-[9px]">
 <th className="pb-3 px-4">Name</th>
 <th className="pb-3 px-4">Type</th>
 <th className="pb-3 px-4">Date</th>
 <th className="pb-3 px-4">Size</th>
 <th className="pb-3 px-4 text-right">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f]">
 {downloadItems.map((item, i) => (
 <tr
 key={i}
 className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors"
 >
 <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
 {item.name}
 </td>
 <td className="py-4 px-4">
 <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-[#1a1a1f] px-2 py-0.5">
 {item.type}
 </span>
 </td>
 <td className="py-4 px-4 text-slate-500 dark:text-slate-400">
 {item.date}
 </td>
 <td className="py-4 px-4 text-slate-500 dark:text-slate-400">
 {item.size}
 </td>
 <td className="py-4 px-4 text-right">
 <button className="text-[10px] font-bold bg-[#7c3aed] text-white px-3 py-1.5 hover:bg-[#6d28d9] transition-all inline-flex items-center gap-1">
 <Download className="h-3 w-3" /> Download
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <div className="lg:hidden p-4 space-y-3">
 {downloadItems.map((item, i) => (
 <div
 key={i}
                className="border border-slate-200 dark:border-[#1a1a1f] bg-slate-50/70 dark:bg-[#121215]/50 p-4"
 >
 <div className="flex items-start justify-between gap-3">
 <div>
 <p className="text-sm font-bold text-slate-900 dark:text-white">
 {item.name}
 </p>
 <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
 {item.type} â€¢ {item.size}
 </p>
 </div>
 <button className="text-[10px] font-bold bg-[#7c3aed] text-white px-3 py-1.5 hover:bg-[#6d28d9] transition-all inline-flex items-center gap-1">
 <Download className="h-3 w-3" />
 </button>
 </div>
 <p className="mt-3 text-[10px] text-slate-400">
 {item.date}
 </p>
 </div>
 ))}
 </div>
 </Card>
 </motion.div>
 </div>

 {/* Right Column - Sidebar */}
 <div className="lg:col-span-4 space-y-4 sm:space-y-6 lg:space-y-8">
 {/* 8. Saved Articles */}
 <motion.div variants={itemVariants}>
 <SectionHeader title="Saved Articles" href="/premium" />
 <div className="space-y-3">
 {savedArticles.map((article, i) => (
 <Card
 key={i}
 className="p-4 flex items-start justify-between gap-3"
 >
 <div className="min-w-0">
 <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
 {article.title}
 </p>
 <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
 <span className="font-semibold text-[#7c3aed]">
 {article.category}
 </span>
 <span>Â·</span>
 <span>{article.savedDate}</span>
 </p>
 </div>
 <button className="shrink-0 text-[10px] font-bold text-[#7c3aed] border border-[#7c3aed] px-3 py-1.5 hover:bg-[#7c3aed] hover:text-white transition-all whitespace-nowrap">
 Read
 </button>
 </Card>
 ))}
 </div>
 </motion.div>

 {/* 9. Recommended Articles */}
 <motion.div variants={itemVariants}>
 <SectionHeader title="Recommended For You" />
 <div className="space-y-3">
 {recommendedArticles.map((article, i) => (
 <Card key={i} className="p-4">
 <div className="flex items-start justify-between gap-3">
 <div className="min-w-0">
 <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
 {article.title}
 </p>
 <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
 <Star className="h-3 w-3 text-amber-400" />
 {article.reason}
 </p>
 </div>
 <div className="shrink-0 text-right">
 <p className="text-xs font-bold text-[#7c3aed]">
 {article.price}
 </p>
 <button className="text-[10px] font-bold text-slate-500 hover:text-[#7c3aed] transition-colors mt-1">
 View
 </button>
 </div>
 </div>
 </Card>
 ))}
 </div>
 </motion.div>

 {/* 10. Upcoming Deadlines */}
 <motion.div variants={itemVariants}>
 <SectionHeader title="Upcoming Deadlines" />
 <Card className="p-5">
 <div className="space-y-4">
 {upcomingDeadlines.map((d, i) => (
 <div
 key={i}
 className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-[#1a1a1f] last:border-0 last:pb-0"
 >
 <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-purple-50 dark:bg-purple-950/20 text-[#7c3aed]">
 <Calendar className="h-4.5 w-4.5" />
 </div>
 <div className="min-w-0 flex-1">
 <p className="text-xs font-bold text-slate-900 dark:text-white">
 {d.title}
 </p>
 <p className="text-[10px] text-slate-400 mt-0.5">
 {d.date} at {d.time}
 </p>
 </div>
 <span
 className={cn(
 "shrink-0 text-[9px] font-bold px-2 py-0.5 border",
 d.type === "Consultation"
 ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400"
 : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400",
 )}
 >
 {d.type}
 </span>
 </div>
 ))}
 </div>
 </Card>
 </motion.div>

 {/* 11. Notifications */}
 <motion.div variants={itemVariants}>
 <SectionHeader
 title="Recent Notifications"
 href="/account/notifications"
 />
 <div className="space-y-2">
 {userNotifications.slice(0, 4).map((n, i) => (
 <Card key={i} className="p-4 flex items-start gap-3">
 <div
 className={cn(
 "flex h-8 w-8 shrink-0 items-center justify-center",
 n.type === "Booking Update"
 ? "bg-blue-50 text-blue-600 dark:bg-blue-950/20"
 : n.type === "Payment Confirmed"
 ? "bg-green-50 text-green-600 dark:bg-green-950/20"
 : n.type === "Content Unlocked"
 ? "bg-purple-50 text-purple-600 dark:bg-purple-950/20"
 : "bg-slate-50 text-slate-600 dark:bg-slate-950/20",
 )}
 >
 {n.type === "Booking Update" ? (
 <Calendar className="h-4 w-4" />
 ) : n.type === "Payment Confirmed" ? (
 <DollarSign className="h-4 w-4" />
 ) : n.type === "Content Unlocked" ? (
 <Lock className="h-4 w-4" />
 ) : n.type === "Newsletter" ? (
 <Mail className="h-4 w-4" />
 ) : (
 <Megaphone className="h-4 w-4" />
 )}
 </div>
 <div className="min-w-0 flex-1">
 <p className="text-xs font-bold text-slate-900 dark:text-white">
 {n.message}
 </p>
 <p className="text-[10px] text-slate-400 mt-0.5">
 {n.time}
 </p>
 </div>
 </Card>
 ))}
 </div>
 </motion.div>

 {/* 12. Profile Summary */}
 <motion.div variants={itemVariants}>
 <SectionHeader title="Profile Summary" />
 <Card className="p-6">
 <div className="flex flex-col items-center text-center">
 <div className="flex h-16 w-16 items-center justify-center bg-[#7c3aed] text-white text-xl font-bold font-mono shadow-md mb-4">
 JR
 </div>
 <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
 John Ranti
 </h4>
 <span className="inline-block mt-1 px-2.5 py-0.5 text-[9px] font-bold border bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400 uppercase tracking-wider">
 Premium Member
 </span>
 </div>
 <div className="mt-6 space-y-3 text-xs">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
 <MapPin className="h-3.5 w-3.5" /> Country
 </div>
 <span className="font-bold text-slate-900 dark:text-white">
 Nigeria
 </span>
 </div>
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
 <MailIcon className="h-3.5 w-3.5" /> Email
 </div>
 <span className="font-bold text-slate-900 dark:text-white text-[10px]">
 john.ranti@email.com
 </span>
 </div>
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
 <PhoneIcon className="h-3.5 w-3.5" /> Phone
 </div>
 <span className="font-bold text-slate-900 dark:text-white">
 +234 801 234 5678
 </span>
 </div>
 </div>
 <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#1a1a1f]">
 <div className="flex items-center justify-between mb-2">
 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
 Profile Completion
 </span>
 <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
 75%
 </span>
 </div>
 <ProgressBar value={75} />
 </div>
 <Link
 href="/account/profile"
 className="block mt-4 text-center w-full border border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white text-xs font-bold py-2.5 transition-all"
 >
 Edit Profile
 </Link>
 </Card>
 </motion.div>


 {/* 14. Quick Actions */}
 <motion.div variants={itemVariants}>
 <SectionHeader title="Quick Actions" />
 <Card className="p-5">
 <div className="grid grid-cols-2 gap-3">
 <Link
 href="/book"
 className="flex flex-col items-center gap-2 p-4 border border-slate-200 dark:border-[#1a1a1f] hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed] transition-all group"
 >
 <Calendar className="h-5 w-5 text-slate-400 group-hover:text-white" />
 <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-white text-center">
 Book Consultation
 </span>
 </Link>
 <Link
 href="/premium"
 className="flex flex-col items-center gap-2 p-4 border border-slate-200 dark:border-[#1a1a1f] hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed] transition-all group"
 >
 <BookOpen className="h-5 w-5 text-slate-400 group-hover:text-white" />
 <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-white text-center">
 Browse Premium
 </span>
 </Link>
 <Link
 href="/blog"
 className="flex flex-col items-center gap-2 p-4 border border-slate-200 dark:border-[#1a1a1f] hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed] transition-all group"
 >
 <FileText className="h-5 w-5 text-slate-400 group-hover:text-white" />
 <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-white text-center">
 Read Blog
 </span>
 </Link>
 <Link
 href="/account/downloads"
 className="flex flex-col items-center gap-2 p-4 border border-slate-200 dark:border-[#1a1a1f] hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed] transition-all group"
 >
 <Download className="h-5 w-5 text-slate-400 group-hover:text-white" />
 <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-white text-center">
 Download Files
 </span>
 </Link>
 <Link
 href="/account/profile"
 className="flex flex-col items-center gap-2 p-4 border border-slate-200 dark:border-[#1a1a1f] hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed] transition-all group"
 >
 <User className="h-5 w-5 text-slate-400 group-hover:text-white" />
 <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-white text-center">
 Update Profile
 </span>
 </Link>
 <Link
 href="/contact"
 className="flex flex-col items-center gap-2 p-4 border border-slate-200 dark:border-[#1a1a1f] hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed] transition-all group"
 >
 <HelpCircle className="h-5 w-5 text-slate-400 group-hover:text-white" />
 <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-white text-center">
 Contact Support
 </span>
 </Link>
 </div>
 </Card>
 </motion.div>

 {/* 15. Recent Activity */}
 <motion.div variants={itemVariants}>
 <SectionHeader title="Recent Activity" />
 <Card className="p-5">
 <div className="space-y-4">
 {userRecentActivity.map((a, i) => (
 <div
 key={i}
 className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-[#1a1a1f] last:border-0 last:pb-0"
 >
 <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-slate-50 dark:bg-slate-950/20 text-slate-500">
 {a.action.includes("Purchased") ? (
 <ShoppingBag className="h-4 w-4" />
 ) : a.action.includes("Downloaded") ? (
 <Download className="h-4 w-4" />
 ) : a.action.includes("Booked") ? (
 <Calendar className="h-4 w-4" />
 ) : a.action.includes("Payment") ? (
 <DollarSign className="h-4 w-4" />
 ) : a.action.includes("Profile") ? (
 <User className="h-4 w-4" />
 ) : (
 <Bookmark className="h-4 w-4" />
 )}
 </div>
 <div className="min-w-0">
 <p className="text-xs font-bold text-slate-900 dark:text-white">
 {a.action}
 </p>
 <p className="text-[10px] text-slate-500 dark:text-slate-400">
 {a.description}
 </p>
 <p className="text-[9px] text-slate-400 mt-0.5">
 {a.time}
 </p>
 </div>
 </div>
 ))}
 </div>
 </Card>
 </motion.div>

 {/* 16. Support Card */}
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
