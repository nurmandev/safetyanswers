"use client";

import React from "react";
import Link from "next/link";
import {
 DollarSign,
 Users,
 Lock,
 Calendar,
 CheckCircle,
 FileText,
 Mail,
 TrendingUp,
 Activity,
 Plus,
 ArrowUpRight,
 ArrowDownRight,
 ShieldCheck,
 ChevronRight
} from "lucide-react";

// Mock Stats Cards
const stats = [
 { label: "Total Revenue", value: "$45,820.00", change: "+14.2%", positive: true, icon: DollarSign, color: "text-green-600 bg-green-50 dark:bg-green-950/20" },
 { label: "Monthly Revenue", value: "$8,240.00", change: "+8.4%", positive: true, icon: TrendingUp, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20" },
 { label: "Total Users", value: "1,240", change: "+12.1%", positive: true, icon: Users, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/20" },
 { label: "Active Users", value: "324", change: "-2.4%", positive: false, icon: Activity, color: "text-pink-600 bg-pink-50 dark:bg-pink-950/20" },
 { label: "Premium Sales", value: "$3,120.00", change: "+24.8%", positive: true, icon: Lock, color: "text-orange-600 bg-orange-50 dark:bg-orange-950/20" },
 { label: "Consultations", value: "84 requests", change: "+18.2%", positive: true, icon: Calendar, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20" },
 { label: "Pending Bookings", value: "12 bookings", change: "-5.0%", positive: true, icon: Calendar, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20" },
 { label: "Completed Projects", value: "148 tasks", change: "+9.2%", positive: true, icon: CheckCircle, color: "text-teal-600 bg-teal-50 dark:bg-teal-950/20" },
 { label: "Total Blog Posts", value: "48 articles", change: "+2 posts", positive: true, icon: FileText, color: "text-slate-600 bg-slate-50 dark:bg-slate-950/20" },
 { label: "Published Articles", value: "38 posts", change: "100%", positive: true, icon: FileText, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20" },
 { label: "Draft Articles", value: "10 drafts", change: "Stable", positive: true, icon: FileText, color: "text-slate-600 bg-slate-50 dark:bg-slate-950/20" },
 { label: "Newsletter Subscribers", value: "840 readers", change: "+15.6%", positive: true, icon: Mail, color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/20" }
];

// Mock Latest Bookings
const latestBookings = [
 { client: "Alicia Thompson", service: "PhD Proposal Review", date: "Jul 01, 2026", status: "Approved", budget: "$450.00" },
 { client: "Marcus Reed", service: "NEBOSH Risk Audit Plan", date: "Jun 28, 2026", status: "Pending", budget: "$1,200.00" },
 { client: "Nadia Yusuf", service: "Academic Essay Proofreading", date: "Jun 25, 2026", status: "Completed", budget: "$180.00" },
 { client: "James Sterling", service: "Workplace Hazard Inspection", date: "Jun 22, 2026", status: "Cancelled", budget: "$800.00" }
];

// Mock Latest Payments
const latestPayments = [
 { id: "INV-1042", client: "Alicia Thompson", scope: "SPSS Template Pack", date: "Jul 01, 2026", amount: "$49.00", status: "Successful" },
 { id: "INV-1037", client: "Marcus Reed", scope: "HSE Consulting Fee", date: "Jun 28, 2026", amount: "$1,200.00", status: "Successful" },
 { id: "INV-1024", client: "Nadia Yusuf", scope: "Writing Workshop Guide", date: "Jun 25, 2026", amount: "$29.00", status: "Successful" }
];

export function DashboardOverview() {
 return (
 <div className="space-y-8">
 
 {/* 1. Quick Actions Row */}
 <div className="flex flex-wrap gap-3">
 <Link href="/admin/posts" className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm shadow-blue-500/10">
 <Plus className="h-4 w-4" />
 <span>Write Blog Post</span>
 </Link>
 <Link href="/admin/bookings" className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] text-slate-700 dark:text-slate-350 text-xs font-bold hover:border-slate-800 dark:hover:border-slate-100 transition-all shadow-sm">
 <Calendar className="h-4 w-4" />
 <span>Configure Bookings</span>
 </Link>
 <Link href="/admin/reports" className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] text-slate-700 dark:text-slate-350 text-xs font-bold hover:border-slate-800 dark:hover:border-slate-100 transition-all shadow-sm">
 <FileText className="h-4 w-4" />
 <span>Run Financial Report</span>
 </Link>
 </div>

 {/* 2. Grid Overview Stats Cards */}
 <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
 {stats.map((stat, i) => {
 const Icon = stat.icon;
 return (
 <div
 key={i}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-5 shadow-sm hover:border-slate-300 dark:hover:border-slate-800 transition-colors"
 >
 <div className="flex items-center justify-between gap-4">
 <div className={`flex h-9 w-9 shrink-0 items-center justify-center ${stat.color}`}>
 <Icon className="h-4.5 w-4.5" />
 </div>
 <div className={`flex items-center gap-1 text-[10px] font-bold ${
 stat.positive ? "text-green-600" : "text-red-500"
 }`}>
 {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
 <span>{stat.change}</span>
 </div>
 </div>
 <div className="mt-3 space-y-0.5">
 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
 {stat.label}
 </p>
 <p className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
 {stat.value}
 </p>
 </div>
 </div>
 );
 })}
 </div>

 {/* 3. Performance Charts Section */}
 <div className="grid gap-6 lg:grid-cols-3">
 
 {/* Revenue Bar Chart (SVG-based) */}
 <div className="lg:col-span-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Monthly Revenue Tracker</h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">$45,820.00 platform receipts</p>
 </div>
 <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
 <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 bg-blue-600" /> Receipts</span>
 </div>
 </div>
 
 {/* SVG Bar Chart */}
 <div className="h-64 w-full flex items-end justify-between gap-2.5 pt-4 pb-2 border-b border-slate-100 dark:border-[#1a1a1f]">
 {[
 { month: "Jan", val: "h-[35%]", amt: "$4.1k" },
 { month: "Feb", val: "h-[50%]", amt: "$6.2k" },
 { month: "Mar", val: "h-[45%]", amt: "$5.5k" },
 { month: "Apr", val: "h-[75%]", amt: "$8.4k" },
 { month: "May", val: "h-[65%]", amt: "$7.2k" },
 { month: "Jun", val: "h-[90%]", amt: "$10.5k" }
 ].map((bar, idx) => (
 <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
 <div className="relative w-full bg-slate-50 dark:bg-[#121215] h-full flex items-end overflow-hidden">
 <div className={`w-full bg-blue-600 ${bar.val} transition-all duration-700 hover:opacity-90`} />
 {/* Tooltip */}
 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-900 text-white text-[9px] font-bold px-2 py-1 shadow-md z-10 whitespace-nowrap">
 {bar.amt}
 </div>
 </div>
 <span className="text-[9px] font-bold text-slate-450 dark:text-slate-500 tracking-tight">{bar.month}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Revenue Breakdown Pie/Ring Chart */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <div className="mb-6">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Revenue Breakdown Share</h4>
 <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">Classification Ratios</p>
 </div>

 <div className="flex flex-col items-center justify-center min-h-[160px] mb-6">
 {/* SVG Ring Pie Chart */}
 <div className="relative h-32 w-32 flex items-center justify-center">
 <svg className="absolute inset-0 h-full w-full transform -rotate-90" viewBox="0 0 36 36">
 {/* Academic support segment */}
 <circle
 className="text-blue-650"
 strokeDasharray="45, 100"
 strokeWidth="3.5"
 strokeDashoffset="0"
 stroke="currentColor"
 fill="none"
 cx="18"
 cy="18"
 r="15.9155"
 />
 {/* Health & safety segment */}
 <circle
 className="text-[#7c3aed]"
 strokeDasharray="35, 100"
 strokeWidth="3.5"
 strokeDashoffset="-45"
 stroke="currentColor"
 fill="none"
 cx="18"
 cy="18"
 r="15.9155"
 />
 {/* Professional writing segment */}
 <circle
 className="text-pink-500"
 strokeDasharray="20, 100"
 strokeWidth="3.5"
 strokeDashoffset="-80"
 stroke="currentColor"
 fill="none"
 cx="18"
 cy="18"
 r="15.9155"
 />
 </svg>
 <div className="flex flex-col items-center justify-center text-center">
 <span className="text-lg font-black text-slate-900 dark:text-white">100%</span>
 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Indexed</span>
 </div>
 </div>
 </div>

 {/* Legend index list */}
 <div className="space-y-2 border-t border-slate-100 dark:border-[#1a1a1f] pt-4 text-[10px] font-bold text-slate-600 dark:text-slate-400">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="h-2.5 w-2.5 bg-blue-600" />
 <span>Academic Support</span>
 </div>
 <span className="text-slate-900 dark:text-white">45%</span>
 </div>
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="h-2.5 w-2.5 bg-[#7c3aed]" />
 <span>Health & Safety</span>
 </div>
 <span className="text-slate-900 dark:text-white">35%</span>
 </div>
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="h-2.5 w-2.5 bg-pink-500" />
 <span>Professional Writing</span>
 </div>
 <span className="text-slate-900 dark:text-white">20%</span>
 </div>
 </div>
 </div>

 </div>

 {/* 4. Details Tables & System Health */}
 <div className="grid gap-6 lg:grid-cols-3">
 
 {/* Latest Bookings Table */}
 <div className="lg:col-span-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm flex flex-col justify-between">
 <div>
 <div className="flex items-center justify-between mb-4">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Incoming Consultation Bookings</h4>
 <Link href="/admin/bookings" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5">
 <span>View all</span>
 <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] text-slate-400 font-bold uppercase tracking-wider text-[9px]">
 <th className="pb-3 px-2">Client</th>
 <th className="pb-3 px-2">Service Brief</th>
 <th className="pb-3 px-2">Deadline</th>
 <th className="pb-3 px-2">Budget</th>
 <th className="pb-3 px-2 text-right">Status</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {latestBookings.map((bk, i) => (
 <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors">
 <td className="py-4 px-2 font-bold text-slate-900 dark:text-white">{bk.client}</td>
 <td className="py-4 px-2 font-semibold">{bk.service}</td>
 <td className="py-4 px-2 text-slate-500 dark:text-slate-450">{bk.date}</td>
 <td className="py-4 px-2 font-bold text-slate-900 dark:text-white">{bk.budget}</td>
 <td className="py-4 px-2 text-right">
 <span className={`inline-block px-2 py-0.5 text-[9px] font-extrabold border ${
 bk.status === "Approved" ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400" :
 bk.status === "Pending" ? "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400" :
 bk.status === "Completed" ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400" :
 "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400"
 }`}>
 {bk.status}
 </span>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>

 {/* System Health Card */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm flex flex-col justify-between">
 <div>
 <div className="flex items-center justify-between mb-6">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">System Performance</h4>
 <span className="flex h-2 w-2 bg-green-500 animate-pulse" />
 </div>

 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <ShieldCheck className="h-4.5 w-4.5 text-green-600 shrink-0" />
 <span className="text-xs font-bold text-slate-800 dark:text-slate-350">Stripe Payment Gateway</span>
 </div>
 <span className="text-[10px] font-extrabold text-green-600 bg-green-50 dark:bg-green-950/20 px-2 py-0.5 border border-green-200 dark:border-green-900">OPERATIONAL</span>
 </div>
 
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <ShieldCheck className="h-4.5 w-4.5 text-green-600 shrink-0" />
 <span className="text-xs font-bold text-slate-800 dark:text-slate-350">MySQL Database Server</span>
 </div>
 <span className="text-[10px] font-extrabold text-green-600 bg-green-50 dark:bg-green-950/20 px-2 py-0.5 border border-green-200 dark:border-green-900">OPERATIONAL</span>
 </div>

 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <ShieldCheck className="h-4.5 w-4.5 text-green-600 shrink-0" />
 <span className="text-xs font-bold text-slate-800 dark:text-slate-350">SMTP Delivery Queue</span>
 </div>
 <span className="text-[10px] font-extrabold text-green-600 bg-green-50 dark:bg-green-950/20 px-2 py-0.5 border border-green-200 dark:border-green-900">OPERATIONAL</span>
 </div>
 </div>
 </div>

 <div className="pt-6 border-t border-slate-100 dark:border-[#1a1a1f] mt-6">
 <Link href="/admin/health" className="block text-center w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:opacity-95 text-xs font-bold py-3 transition-colors">
 Manage System Health
 </Link>
 </div>
 </div>

 </div>

 </div>
 );
}
