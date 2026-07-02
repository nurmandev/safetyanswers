"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
 DollarSign,
 TrendingUp,
 Calendar,
 Users,
 FileText,
 Clock,
 CheckCircle,
 Briefcase,
 PenTool,
 Award,
 Mail,
 Activity as ActivityIcon,
 UserPlus,
 ShoppingCart,
 Lock,
 ArrowUpRight,
 ArrowDownRight,
 ChevronRight,
 ShieldCheck,
 AlertTriangle,
 RotateCcw,
 Star,
 Database,
 Bell,
 Megaphone,
 BookOpen,
 Shield,
 Globe,
 Smartphone,
 Search,
 Eye,
 FileSpreadsheet,
 CreditCard,
 User as UserIcon,
 RefreshCw,
 HardDrive,
 Server,
 Wifi,
 Zap,
 BarChart3,
 Download,
 Bookmark,
 ShoppingBag,
 CalendarCheck,
 Wallet,
 Gift,
 MapPin,
 FolderOpen,
 MessageSquare,
 MoreHorizontal,
 X,
 Plus,
 ExternalLink,
 HelpCircle,
 Info,
 Flag,
 AlertCircle,
 CheckCircle2,
 XCircle,
 Loader2,
 Image,
 Layers,
 List,
 PieChartIcon,
 LineChartIcon,
 BarChartIcon,
 Heart,
 ThumbsUp,
 Share2,
 Send,
 Settings,
 Trash2,
 Edit,
 Copy,
 EyeOff,
} from "lucide-react";
import {
 LineChart,
 Line,
 BarChart,
 Bar,
 PieChart,
 Pie,
 Cell,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip as RechartsTooltip,
 ResponsiveContainer,
 Area,
 AreaChart,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
 adminKpiCards,
 revenueData,
 bookingAnalytics,
 servicePerformance,
 paymentByGateway,
 recentBookings,
 recentPayments,
 latestUsers,
 latestBlogPosts,
 popularServices,
 topPremiumArticles,
 activityTimeline,
 notificationsData,
 systemHealthData,
 reportsSnapshot,
 type AdminKpiCard,
 type RevenueDataPoint,
 type BookingAnalytics,
 type ServicePerformance,
 type PaymentGatewayData,
 type Booking,
 type Payment,
 type User,
 type BlogPost,
 type PopularService,
 type PremiumArticle,
 type Activity as ActivityItem,
 type Notification,
 type SystemHealth,
 type ReportSnapshot,
} from "@/lib/mock-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
 DollarSign,
 TrendingUp,
 Calendar,
 Users,
 FileText,
 Clock,
 CheckCircle,
 Briefcase,
 PenTool,
 Award,
 Mail,
 ActivityIcon,
 UserPlus,
 ShoppingCart,
 Lock,
 ShieldCheck,
 AlertTriangle,
 RotateCcw,
 Star,
 Database,
 Bell,
 Megaphone,
 BookOpen,
 Shield,
 Globe,
 Smartphone,
 Search,
 Eye,
 BarChart3,
 Download,
 Bookmark,
 ShoppingBag,
 CalendarCheck,
 Wallet,
 Gift,
 MapPin,
 FolderOpen,
 MessageSquare,
 UserIcon,
 CreditCard,
 RefreshCw,
 HardDrive,
 Server,
 Wifi,
 Zap,
 Heart,
 ThumbsUp,
 Share2,
 Send,
 Settings,
 Trash2,
 Edit,
 Copy,
 EyeOff,
};

const statusStyles: Record<string, string> = {
 Approved:
 "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400",
 "In Progress":
 "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400",
 Completed:
 "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400",
 Pending:
 "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400",
 Cancelled:
 "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400",
 Rescheduled:
 "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/20 dark:border-purple-900 dark:text-purple-400",
 Successful:
 "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400",
 Failed:
 "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400",
 Published:
 "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400",
 Draft:
 "bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-950/20 dark:border-slate-800 dark:text-slate-400",
 Scheduled:
 "bg-cyan-50 border-cyan-200 text-cyan-700 dark:bg-cyan-950/20 dark:border-cyan-900 dark:text-cyan-400",
 Operational:
 "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400",
 Degraded:
 "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/20 dark:border-purple-900 dark:text-purple-400",
};

function StatusBadge({ status }: { status: string }) {
 const style =
 statusStyles[status] ||
 "bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-950/20 dark:border-slate-800 dark:text-slate-400";
 return (
 <span
 className={cn(
 "inline-block px-2 py-0.5 text-[10px] font-extrabold border",
 style,
 )}
 >
 {status}
 </span>
 );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
 const w = 80;
 const h = 28;
 const min = Math.min(...data);
 const max = Math.max(...data);
 const range = max - min || 1;
 const points = data.map((v, i) => {
 const x = (i / (data.length - 1)) * w;
 const y = h - ((v - min) / range) * (h - 4) - 2;
 return `${x},${y}`;
 });
 return (
 <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
 <polyline
 fill="none"
 stroke={color}
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 points={points.join(" ")}
 />
 </svg>
 );
}

function getIcon(name: string) {
 return iconMap[name] || ActivityIcon;
}

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: { staggerChildren: 0.04 },
 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
  opacity: 1,
  y: 0,
  transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const PIE_COLORS = ["#635bff", "#0ba95b", "#f7a440", "#003087", "#64748b"];

export function DashboardOverview() {
 const [time, setTime] = useState(new Date());
 const [revenuePeriod, setRevenuePeriod] = useState<string>("daily");
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
 const timer = setInterval(() => setTime(new Date()), 60000);
 const loadingTimer = window.setTimeout(() => setIsLoading(false), 700);
 return () => {
 clearInterval(timer);
 window.clearTimeout(loadingTimer);
 };
 }, []);

 const today = useMemo(() => {
 const d = new Date();
 return d.toLocaleDateString("en-US", {
 weekday: "long",
 month: "long",
 day: "numeric",
 year: "numeric",
 });
 }, []);

 const currentTime = useMemo(
 () =>
 time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
 [time],
 );

 const greeting = useMemo(() => {
 const h = time.getHours();
 if (h < 12) return "Good Morning, Admin ðŸ‘‹";
 if (h < 17) return "Good Afternoon, Admin ðŸ‘‹";
 return "Good Evening, Admin ðŸ‘‹";
 }, [time]);

 const revenueChartData = useMemo(() => {
 const data = revenueData[revenuePeriod] || revenueData.daily;
 return data.map((d) => ({
 name: d.date,
 value: d.revenue,
 }));
 }, [revenuePeriod]);

 const periodLabels: Record<string, string> = {
 daily: "7D",
 weekly: "30D",
 monthly: "90D",
 yearly: "1Y",
 };

 if (isLoading) {
 return (
 <div className="space-y-6">
 <div className="grid gap-6 lg:grid-cols-3">
 <div className="lg:col-span-2 h-40 animate-pulse bg-slate-200/80 dark:bg-[#1a1a1f]" />
 <div className="h-40 animate-pulse bg-slate-200/80 dark:bg-[#1a1a1f]" />
 </div>
 <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
 {Array.from({ length: 8 }).map((_, index) => (
 <div
 key={index}
 className="h-28 animate-pulse bg-slate-200/80 dark:bg-[#1a1a1f]"
 />
 ))}
 </div>
 <div className="h-80 animate-pulse bg-slate-200/80 dark:bg-[#1a1a1f]" />
 </div>
 );
 }

 return (
 <motion.div
 variants={containerVariants}
 initial="hidden"
 animate="visible"
 className="space-y-6"
 >
 {/* 1. Welcome Section */}
 <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-3">
 <div className="lg:col-span-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
 <div>
 <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
 {greeting}
 </h1>
 <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">
 {today} &middot; {currentTime}
 </p>
 <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-3 leading-relaxed max-w-xl">
 Today you received{" "}
 <span className="text-green-600 dark:text-green-400">
 12 new bookings
 </span>
 , earned{" "}
 <span className="text-green-600 dark:text-green-400">
 $3,240.00
 </span>
 , and sold{" "}
 <span className="text-green-600 dark:text-green-400">
 8 premium articles
 </span>
 .
 </p>
 </div>
 <div className="flex gap-2 shrink-0">
 <Link
 href="/admin/bookings"
 className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
 >
 <Plus className="h-4 w-4" />
 <span>New Booking</span>
 </Link>
 <Link
 href="/admin/posts"
 className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] text-slate-700 dark:text-slate-300 text-xs font-bold hover:border-slate-400 dark:hover:border-slate-600 transition-all shadow-sm"
 >
 <PenTool className="h-4 w-4" />
 <span>Write Post</span>
 </Link>
 </div>
 </div>
 </div>
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <div className="flex items-center gap-3 mb-3">
 <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600">
 <Zap className="h-5 w-5" />
 </div>
 <div>
 <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Productivity Score
 </p>
 <p className="text-lg font-extrabold text-slate-900 dark:text-white">
 92/100
 </p>
 </div>
 </div>
 <div className="w-full bg-slate-100 dark:bg-[#1a1a1f] h-2 overflow-hidden">
 <div className="h-full w-[92%] bg-indigo-500 transition-all duration-700" />
 </div>
 <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-2">
 You are 8% away from your weekly target.
 </p>
 </div>
 </motion.div>

 {/* 2. KPI Cards Grid */}
 <motion.div
 variants={itemVariants}
 className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4"
 >
 {adminKpiCards.map((card) => {
 const Icon = getIcon(card.icon);
 const isPositive = card.positive;
 return (
 <div
 key={card.id}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-4 shadow-sm hover:border-slate-300 dark:hover:border-slate-800 transition-colors"
 >
 <div className="flex items-center justify-between gap-2 mb-2">
 <Icon className={cn("h-4 w-4", card.color)} />
 <div
 className={cn(
 "flex items-center gap-0.5 text-[9px] font-bold",
 isPositive ? "text-green-600" : "text-red-500",
 )}
 >
 {isPositive ? (
 <ArrowUpRight className="h-2.5 w-2.5" />
 ) : (
 <ArrowDownRight className="h-2.5 w-2.5" />
 )}
 <span>{card.change}</span>
 </div>
 </div>
 <div className="space-y-0.5">
 <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">
 {card.label}
 </p>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight truncate">
 {card.value}
 </p>
 </div>
 <div className="mt-2 flex justify-end">
 <Sparkline
 data={card.sparklineData}
 color={isPositive ? "#16a34a" : "#dc2626"}
 />
 </div>
 </div>
 );
 })}
 </motion.div>

 {/* 3. Revenue Analytics */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm"
 >
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Revenue Analytics
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 $
 {revenueChartData
 .reduce((s, d) => s + d.value, 0)
 .toLocaleString()}{" "}
 total
 </p>
 </div>
 <div className="flex items-center gap-1.5">
 {Object.entries(periodLabels).map(([key, label]) => (
 <button
 key={key}
 onClick={() => setRevenuePeriod(key)}
 className={cn(
 "px-3 py-1.5 text-[10px] font-extrabold border transition-all",
 revenuePeriod === key
 ? "bg-blue-600 border-blue-600 text-white"
 : "bg-white dark:bg-[#0c0c0e] border-slate-200 dark:border-[#1a1a1f] text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600",
 )}
 >
 {label}
 </button>
 ))}
 </div>
 </div>
 <div className="h-72">
 <ResponsiveContainer width="100%" height="100%">
 <AreaChart
 data={revenueChartData}
 margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
 >
 <defs>
 <linearGradient
 id="revenueGradient"
 x1="0"
 y1="0"
 x2="0"
 y2="1"
 >
 <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
 <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
 </linearGradient>
 </defs>
 <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
 <XAxis
 dataKey="name"
 tick={{ fontSize: 10, fontWeight: 600, fill: "#94a3b8" }}
 axisLine={false}
 tickLine={false}
 />
 <YAxis
 tick={{ fontSize: 10, fontWeight: 600, fill: "#94a3b8" }}
 axisLine={false}
 tickLine={false}
 tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
 />
 <RechartsTooltip
 contentStyle={{
 background: "#fff",
 border: "1px solid #e2e8f0",
 borderRadius: "0",
 fontSize: "11px",
 fontWeight: 700,
 boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
 }}
  formatter={(value: unknown) => [
  `$${typeof value === "number" ? value.toLocaleString() : value}`,
  "Revenue",
  ]}
 />
 <Area
 type="monotone"
 dataKey="value"
 stroke="#3b82f6"
 strokeWidth={2}
 fill="url(#revenueGradient)"
 />
 </AreaChart>
 </ResponsiveContainer>
 </div>
 </motion.div>

 {/* 4. Booking Analytics */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm"
 >
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Booking Analytics
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 {bookingAnalytics.reduce((s, b) => s + b.count, 0)} total bookings
 </p>
 </div>
 <Link
 href="/admin/bookings"
 className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
 >
 <span>View all</span>
 <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 <div className="h-64">
 <ResponsiveContainer width="100%" height="100%">
 <BarChart
 data={bookingAnalytics}
 margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
 >
 <CartesianGrid
 strokeDasharray="3 3"
 stroke="#e2e8f0"
 vertical={false}
 />
 <XAxis
 dataKey="status"
 tick={{ fontSize: 10, fontWeight: 600, fill: "#94a3b8" }}
 axisLine={false}
 tickLine={false}
 />
 <YAxis
 tick={{ fontSize: 10, fontWeight: 600, fill: "#94a3b8" }}
 axisLine={false}
 tickLine={false}
 />
 <RechartsTooltip
 contentStyle={{
 background: "#fff",
 border: "1px solid #e2e8f0",
 borderRadius: "0",
 fontSize: "11px",
 fontWeight: 700,
 }}
 />
 <Bar dataKey="count" radius={[2, 2, 0, 0]} barSize={48}>
 {bookingAnalytics.map((entry) => (
 <Cell key={entry.status} fill={entry.color} />
 ))}
 </Bar>
 </BarChart>
 </ResponsiveContainer>
 </div>
 </motion.div>

 {/* 5. Service Performance */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm"
 >
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Service Performance
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 Key metrics by service
 </p>
 </div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
 {servicePerformance.map((s, i) => (
 <div
 key={i}
 className="bg-slate-50 dark:bg-[#121215] border border-slate-100 dark:border-[#1a1a1f] p-4"
 >
 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
 {s.label}
 </p>
 <p className="text-lg font-extrabold text-slate-900 dark:text-white">
 {s.value}
 </p>
 <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
 {s.sub}
 </p>
 </div>
 ))}
 </div>
 </motion.div>

 {/* 6. Payment Overview */}
 <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Payment Overview
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 By gateway
 </p>
 </div>
 <Link
 href="/admin/payments"
 className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
 >
 <span>View all</span>
 <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 <div className="flex flex-col sm:flex-row items-center gap-6">
 <div className="h-52 w-52 shrink-0">
 <ResponsiveContainer width="100%" height="100%">
 <PieChart>
 <Pie
 data={paymentByGateway}
 cx="50%"
 cy="50%"
 innerRadius={55}
 outerRadius={80}
 dataKey="value"
 stroke="none"
 >
 {paymentByGateway.map((entry, i) => (
 <Cell
 key={entry.name}
 fill={PIE_COLORS[i % PIE_COLORS.length]}
 />
 ))}
 </Pie>
 <RechartsTooltip
 contentStyle={{
 background: "#fff",
 border: "1px solid #e2e8f0",
 borderRadius: "0",
 fontSize: "11px",
 fontWeight: 700,
 }}
  formatter={(value: unknown, name: any) => [
  `${typeof value === "number" ? value : ""}%`,
  name,
  ]}
 />
 </PieChart>
 </ResponsiveContainer>
 </div>
 <div className="flex-1 space-y-2.5 w-full">
 {paymentByGateway.map((g, i) => (
 <div
 key={g.name}
 className="flex items-center justify-between text-[11px] font-bold"
 >
 <div className="flex items-center gap-2">
 <span
 className="h-2.5 w-2.5 shrink-0"
 style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
 />
 <span className="text-slate-600 dark:text-slate-400">
 {g.name}
 </span>
 </div>
 <span className="text-slate-900 dark:text-white">
 {g.value}%
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* 7. Recent Bookings Table */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Recent Bookings
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 {recentBookings.length} entries
 </p>
 </div>
 <Link
 href="/admin/bookings"
 className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
 >
 <span>View all</span>
 <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] text-slate-400 font-bold uppercase tracking-wider text-[9px]">
 <th className="pb-3 pr-2">ID</th>
 <th className="pb-3 pr-2">Customer</th>
 <th className="pb-3 pr-2">Service</th>
 <th className="pb-3 pr-2">Deadline</th>
 <th className="pb-3 pr-2">Budget</th>
 <th className="pb-3 pr-2">Consultant</th>
 <th className="pb-3 pr-2">Status</th>
 <th className="pb-3 text-right">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {recentBookings.slice(0, 5).map((bk) => (
 <tr
 key={bk.id}
 className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors"
 >
 <td className="py-3 pr-2 font-mono text-[10px] text-slate-500">
 {bk.id}
 </td>
 <td className="py-3 pr-2 font-bold text-slate-900 dark:text-white whitespace-nowrap">
 {bk.customer}
 </td>
 <td className="py-3 pr-2 font-semibold truncate max-w-[120px]">
 {bk.service}
 </td>
 <td className="py-3 pr-2 text-slate-500 dark:text-slate-450 whitespace-nowrap">
 {bk.deadline}
 </td>
 <td className="py-3 pr-2 font-bold text-slate-900 dark:text-white whitespace-nowrap">
 {bk.budget}
 </td>
 <td className="py-3 pr-2 text-slate-500 dark:text-slate-400 text-[10px] whitespace-nowrap">
 {bk.consultant}
 </td>
 <td className="py-3 pr-2">
 <StatusBadge status={bk.status} />
 </td>
 <td className="py-3 text-right">
 <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
 <MoreHorizontal className="h-4 w-4" />
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </motion.div>

 {/* 8. Recent Payments Table */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm"
 >
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Recent Payments
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 {recentPayments.length} transactions
 </p>
 </div>
 <Link
 href="/admin/payments"
 className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
 >
 <span>View all</span>
 <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] text-slate-400 font-bold uppercase tracking-wider text-[9px]">
 <th className="pb-3 pr-2">Customer</th>
 <th className="pb-3 pr-2">Amount</th>
 <th className="pb-3 pr-2">Gateway</th>
 <th className="pb-3 pr-2">Invoice</th>
 <th className="pb-3 pr-2">Date</th>
 <th className="pb-3 text-right">Status</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {recentPayments.map((p, i) => (
 <tr
 key={i}
 className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors"
 >
 <td className="py-3 pr-2 font-bold text-slate-900 dark:text-white whitespace-nowrap">
 {p.customer}
 </td>
 <td className="py-3 pr-2 font-bold text-slate-900 dark:text-white whitespace-nowrap">
 {p.amount}
 </td>
 <td className="py-3 pr-2 text-slate-500 dark:text-slate-400">
 {p.gateway}
 </td>
 <td className="py-3 pr-2 font-mono text-[10px] text-slate-500">
 {p.invoice}
 </td>
 <td className="py-3 pr-2 text-slate-500 dark:text-slate-450 whitespace-nowrap">
 {p.date}
 </td>
 <td className="py-3 text-right">
 <StatusBadge status={p.status} />
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </motion.div>

 {/* 9. Latest Users */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm"
 >
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Latest Users
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 {latestUsers.length} new registrations
 </p>
 </div>
 <Link
 href="/admin/users"
 className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
 >
 <span>View all</span>
 <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] text-slate-400 font-bold uppercase tracking-wider text-[9px]">
 <th className="pb-3 pr-2">User</th>
 <th className="pb-3 pr-2">Country</th>
 <th className="pb-3 pr-2">Registered</th>
 <th className="pb-3 pr-2">Membership</th>
 <th className="pb-3 text-right">Purchases</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {latestUsers.map((u, i) => (
 <tr
 key={i}
 className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors"
 >
 <td className="py-3 pr-2">
 <div className="flex items-center gap-2.5">
 <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-slate-900 dark:bg-slate-700 text-white text-[10px] font-extrabold font-mono">
 {u.avatar}
 </div>
 <div>
 <p className="font-bold text-slate-900 dark:text-white whitespace-nowrap">
 {u.name}
 </p>
 <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[140px]">
 {u.email}
 </p>
 </div>
 </div>
 </td>
 <td className="py-3 pr-2 text-slate-500 dark:text-slate-400">
 {u.country}
 </td>
 <td className="py-3 pr-2 text-slate-500 dark:text-slate-450 whitespace-nowrap">
 {u.registered}
 </td>
 <td className="py-3 pr-2">
 <span
 className={cn(
 "inline-block px-2 py-0.5 text-[10px] font-extrabold border",
 u.membership === "Premium" &&
 "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400",
 u.membership === "Enterprise" &&
 "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/20 dark:border-purple-900 dark:text-purple-400",
 u.membership === "Free" &&
 "bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-950/20 dark:border-slate-800 dark:text-slate-400",
 )}
 >
 {u.membership}
 </span>
 </td>
 <td className="py-3 text-right font-bold text-slate-900 dark:text-white">
 {u.purchases}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </motion.div>

 {/* 10. Latest Blog Posts */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm"
 >
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Latest Blog Posts
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 {latestBlogPosts.length} articles
 </p>
 </div>
 <Link
 href="/admin/posts"
 className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
 >
 <span>View all</span>
 <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] text-slate-400 font-bold uppercase tracking-wider text-[9px]">
 <th className="pb-3 pr-2">Title</th>
 <th className="pb-3 pr-2">Category</th>
 <th className="pb-3 pr-2">Views</th>
 <th className="pb-3 pr-2">Type</th>
 <th className="pb-3 pr-2">Published</th>
 <th className="pb-3 text-right">Status</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {latestBlogPosts.map((post, i) => (
 <tr
 key={i}
 className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors"
 >
 <td className="py-3 pr-2 font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
 {post.title}
 </td>
 <td className="py-3 pr-2">
 <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#1a1a1f] px-2 py-0.5">
 {post.category}
 </span>
 </td>
 <td className="py-3 pr-2 font-bold text-slate-900 dark:text-white">
 {post.views.toLocaleString()}
 </td>
 <td className="py-3 pr-2">
 <span
 className={cn(
 "text-[10px] font-extrabold px-2 py-0.5 border",
 post.premium
 ? "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400"
 : "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400",
 )}
 >
 {post.premium ? "Premium" : "Free"}
 </span>
 </td>
 <td className="py-3 pr-2 text-slate-500 dark:text-slate-450 whitespace-nowrap">
 {post.published}
 </td>
 <td className="py-3 text-right">
 <StatusBadge status={post.status} />
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </motion.div>

 {/* 11. Popular Services */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm"
 >
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Popular Services
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 Top performing services
 </p>
 </div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
 {popularServices.map((s, i) => (
 <div
 key={i}
 className="bg-slate-50 dark:bg-[#121215] border border-slate-100 dark:border-[#1a1a1f] p-4 hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
 >
 <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate mb-2">
 {s.name}
 </p>
 <div className="space-y-1">
 <div className="flex items-center justify-between text-[10px]">
 <span className="text-slate-400 dark:text-slate-500 font-semibold">
 Bookings
 </span>
 <span className="font-bold text-slate-900 dark:text-white">
 {s.bookings}
 </span>
 </div>
 <div className="flex items-center justify-between text-[10px]">
 <span className="text-slate-400 dark:text-slate-500 font-semibold">
 Revenue
 </span>
 <span className="font-bold text-slate-900 dark:text-white">
 {s.revenue}
 </span>
 </div>
 <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100 dark:border-[#1a1a1f]">
 <span className="text-slate-400 dark:text-slate-500 font-semibold">
 Growth
 </span>
 <span
 className={cn(
 "font-extrabold",
 s.positive ? "text-green-600" : "text-red-500",
 )}
 >
 {s.growth}
 </span>
 </div>
 </div>
 </div>
 ))}
 </div>
 </motion.div>

 {/* 12. Top Selling Premium Articles */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm"
 >
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Top Selling Premium Articles
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 Best performers
 </p>
 </div>
 <Link
 href="/admin/premium"
 className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
 >
 <span>View all</span>
 <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] text-slate-400 font-bold uppercase tracking-wider text-[9px]">
 <th className="pb-3 pr-2">Article</th>
 <th className="pb-3 pr-2">Price</th>
 <th className="pb-3 pr-2">Sales</th>
 <th className="pb-3 text-right">Revenue</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {topPremiumArticles.map((a, i) => (
 <tr
 key={i}
 className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors"
 >
 <td className="py-3 pr-2">
 <div className="flex items-center gap-2.5">
 <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-slate-100 dark:bg-[#1a1a1f] text-slate-400 border border-slate-200 dark:border-[#1a1a1f]">
 <Lock className="h-4 w-4" />
 </div>
 <span className="font-bold text-slate-900 dark:text-white truncate max-w-[220px]">
 {a.title}
 </span>
 </div>
 </td>
 <td className="py-3 pr-2 font-bold text-slate-900 dark:text-white">
 {a.price}
 </td>
 <td className="py-3 pr-2 font-bold text-slate-900 dark:text-white">
 {a.sales}
 </td>
 <td className="py-3 text-right font-bold text-green-600">
 {a.revenue}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </motion.div>

 {/* 13. Activity Timeline + 14. Notifications Panel */}
 <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
 {/* Activity Timeline */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Activity Timeline
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 Recent platform activity
 </p>
 </div>
 <Link
 href="/admin/logs"
 className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
 >
 <span>View all</span>
 <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 <div className="relative pl-6 space-y-0">
 {activityTimeline.slice(0, 8).map((act, i) => {
 const Icon = getIcon(act.icon);
 return (
 <div key={i} className="relative pb-5 last:pb-0">
 {i < activityTimeline.slice(0, 8).length - 1 && (
 <div className="absolute left-[-7px] top-[18px] bottom-0 w-px bg-slate-200 dark:bg-[#1a1a1f]" />
 )}
 <div className="absolute left-[-14px] top-[2px]">
 <div className="flex h-6 w-6 items-center justify-center bg-white dark:bg-[#0c0c0e] border-2 border-slate-200 dark:border-[#1a1a1f]">
 <Icon className={cn("h-3 w-3", act.color)} />
 </div>
 </div>
 <div className="pl-3">
 <p className="text-[11px] font-bold text-slate-900 dark:text-white">
 {act.action}
 </p>
 <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
 {act.description}
 </p>
 <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">
 {act.time}
 </p>
 </div>
 </div>
 );
 })}
 </div>
 </div>

 {/* Notifications Panel */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Notifications
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 {notificationsData.filter((n) => n.urgent).length} urgent
 </p>
 </div>
 <Link
 href="/admin/notifications"
 className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
 >
 <span>View all</span>
 <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 <div className="space-y-3">
 {notificationsData.map((n, i) => {
 const urgencyColors = n.urgent
 ? "border-l-2 border-l-red-500 bg-red-50/30 dark:bg-red-950/10"
 : "border-l-2 border-l-transparent";
 return (
 <div
 key={i}
 className={cn(
 "p-4 bg-slate-50 dark:bg-[#121215] border border-slate-100 dark:border-[#1a1a1f] transition-colors",
 urgencyColors,
 n.urgent && "hover:bg-red-50/50 dark:hover:bg-red-950/20",
 )}
 >
 <div className="flex items-start justify-between gap-2">
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2">
 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 {n.type}
 </p>
 {n.urgent && (
 <span className="flex h-1.5 w-1.5 bg-red-500 animate-pulse" />
 )}
 </div>
 <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
 {n.message}
 </p>
 </div>
 <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 shrink-0 whitespace-nowrap">
 {n.time}
 </span>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </motion.div>

 {/* 15. Quick Actions */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm"
 >
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Quick Actions
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 Launch the most common tasks in one step
 </p>
 </div>
 </div>
 <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
 {[
 { title: "Create Blog", href: "/admin/posts", icon: PenTool },
 {
 title: "Add Premium Article",
 href: "/admin/premium",
 icon: Lock,
 },
 {
 title: "Approve Booking",
 href: "/admin/bookings",
 icon: CheckCircle2,
 },
 { title: "Create Service", href: "/admin/academic", icon: Shield },
 { title: "Send Newsletter", href: "/admin/newsletter", icon: Mail },
 { title: "Export Report", href: "/admin/reports", icon: Download },
 ].map((action) => {
 const Icon = action.icon;
 return (
 <Link
 key={action.title}
 href={action.href}
 className="flex items-center gap-3 border border-slate-200 dark:border-[#1a1a1f] bg-slate-50/70 dark:bg-[#121215] px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-[#7c3aed] hover:text-[#7c3aed] dark:text-slate-300"
 >
 <div className="flex h-9 w-9 items-center justify-center bg-white dark:bg-[#0c0c0e] shadow-sm">
 <Icon className="h-4 w-4" />
 </div>
 <span>{action.title}</span>
 </Link>
 );
 })}
 </div>
 </motion.div>

 {/* 16. System Health */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm"
 >
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 System Health
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 {systemHealthData.filter((s) => s.healthy).length}/
 {systemHealthData.length} operational
 </p>
 </div>
 <Link
 href="/admin/health"
 className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
 >
 <span>View all</span>
 <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
 {systemHealthData.map((sys, i) => (
 <div
 key={i}
 className="bg-slate-50 dark:bg-[#121215] border border-slate-100 dark:border-[#1a1a1f] p-4 text-center"
 >
 <div className="flex justify-center mb-2">
 <span
 className={cn(
 "flex h-2.5 w-2.5",
 sys.healthy ? "bg-green-500" : "bg-red-500",
 )}
 />
 </div>
 <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
 {sys.name}
 </p>
 <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
 {sys.latency}
 </p>
 <StatusBadge status={sys.healthy ? "Operational" : "Degraded"} />
 </div>
 ))}
 </div>
 </motion.div>

 {/* 17. Reports Summary */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm"
 >
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 Reports Summary
 </h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
 Monthly snapshot
 </p>
 </div>
 <Link
 href="/admin/reports"
 className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
 >
 <span>View full report</span>
 <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
 {reportsSnapshot.map((r, i) => (
 <div
 key={i}
 className="bg-slate-50 dark:bg-[#121215] border border-slate-100 dark:border-[#1a1a1f] p-4 text-center"
 >
 <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 truncate">
 {r.label}
 </p>
 <p className="text-base font-extrabold text-slate-900 dark:text-white">
 {r.value}
 </p>
 <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
 {r.change}
 </p>
 </div>
 ))}
 </div>
 </motion.div>
 </motion.div>
 );
}
