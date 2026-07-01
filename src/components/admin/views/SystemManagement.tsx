"use client";

import React, { useState } from "react";
import {
 Settings,
 ShieldAlert,
 History,
 MessageSquare,
 HelpCircle,
 Users,
 Bell,
 Search,
 Activity,
 FileText,
 TrendingUp,
 Mail,
 Lock,
 Smartphone,
 Save,
 CheckCircle,
 Database,
 Globe,
 HardDrive,
 Plus
} from "lucide-react";

// Mock Data
const mockLogs = [
 { id: 1, admin: "Admin Coordinator", action: "Payment Approved (INV-1042)", ip: "192.168.1.1", time: "2026-07-01 10:25 AM" },
 { id: 2, admin: "Admin Coordinator", action: "Blog Post Published", ip: "192.168.1.1", time: "2026-06-24 04:30 PM" },
 { id: 3, admin: "Support Lead", action: "Assigned Advisor Sir Dandy", ip: "10.0.0.4", time: "2026-06-28 09:12 AM" }
];

const mockSupport = [
 { id: 1, sender: "James Sterling", email: "james@example.com", subject: "Dissertation stats model validation pricing enquiry", message: "Hello, I require a data analyst to run SPSS regression on a sample of 250 respondents. What are your pricing packages?", date: "Jul 01, 10:24 AM", read: false },
 { id: 2, sender: "Elena Rostova", email: "elena@example.com", subject: "NEBOSH risk checklists templates unlock support", message: "Hi, I processed payment for the audit checklists pack but I don't see it in my profile library. Please verify.", date: "Jun 28, 08:15 AM", read: true }
];

const mockFaqs = [
 { id: 1, q: "How long does a dissertation statistical validation audit take?", a: "Standard SPSS/STATA regressions require 7-14 days based on the size of the coding schema.", cat: "Academic" },
 { id: 2, q: "Are locked safety manuals NEBOSH compliant?", a: "Yes, all checklists and templates follow current ISO 45001 and OSHA safety framework requirements.", cat: "Safety" }
];

const mockPermissions = [
 { role: "Administrator", createBlog: true, approveBooking: true, manageUsers: true, viewRevenue: true },
 { role: "Editor / Coordinator", createBlog: true, approveBooking: true, manageUsers: false, viewRevenue: false },
 { role: "Support Coordinator", createBlog: false, approveBooking: true, manageUsers: true, viewRevenue: false },
 { role: "Content Writer", createBlog: true, approveBooking: false, manageUsers: false, viewRevenue: false }
];

export function SystemManagement({
 tab,
 searchQueryParam = ""
}: {
 tab: "settings" | "roles" | "logs" | "support" | "faqs" | "profile" | "notifications" | "search" | "health" | "reports" | "analytics";
 searchQueryParam?: string;
}) {
 const [activeTab, setActiveTab] = useState(tab);
 
 // States
 const [searchVal, setSearchVal] = useState(searchQueryParam);
 const [logs, setLogs] = useState(mockLogs);
 const [supportList, setSupportList] = useState(mockSupport);
 const [activeMessage, setActiveMessage] = useState<any>(null);
 const [replyText, setReplyText] = useState("");
 
 // Settings Form States
 const [siteName, setSiteName] = useState("safetyanswers.com");
 const [maintenance, setMaintenance] = useState(false);
 const [smtpServer, setSmtpServer] = useState("smtp.safetyanswers.com");
 
 // Profile settings
 const [adminName, setAdminName] = useState("Admin Coordinator");
 const [adminEmail, setAdminEmail] = useState("admin@safetyanswers.com");
 const [twoFactor, setTwoFactor] = useState(true);

 const handleSupportReply = (e: React.FormEvent) => {
 e.preventDefault();
 if (replyText.trim() && activeMessage) {
 alert(`Reply dispatched to ${activeMessage.email}`);
 setReplyText("");
 setActiveMessage(null);
 }
 };

 return (
 <div className="space-y-6">
 
 {/* Dynamic Tabs Headers */}
 <div className="flex flex-wrap border-b border-slate-205 dark:border-[#1a1a1f] gap-4 sm:gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
 {[
 { key: "settings", label: "Website Settings", icon: Settings },
 { key: "roles", label: "Roles", icon: ShieldAlert },
 { key: "logs", label: "Logs", icon: History },
 { key: "support", label: "Support Inbox", icon: MessageSquare },
 { key: "faqs", label: "FAQs", icon: HelpCircle },
 { key: "profile", label: "Admin Profile", icon: Users },
 { key: "health", label: "System Health", icon: Activity },
 { key: "reports", label: "Reports", icon: FileText },
 { key: "analytics", label: "Analytics", icon: TrendingUp }
 ].map((item) => {
 const Icon = item.icon;
 const isActive = activeTab === item.key;
 return (
 <button
 key={item.key}
 onClick={() => { setActiveTab(item.key as any); setActiveMessage(null); }}
 className={`flex items-center gap-1.5 pb-3 border-b-2 transition-all ${
 isActive
 ? "border-blue-600 text-blue-600 dark:text-white"
 : "border-transparent hover:text-slate-800 dark:hover:text-slate-200"
 }`}
 >
 <Icon className="h-4 w-4" />
 <span>{item.label}</span>
 </button>
 );
 })}
 </div>

 {activeTab === "settings" && (
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-8 shadow-sm space-y-6">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-3 mb-6">Website Settings Settings</h4>
 <form onSubmit={(e) => { e.preventDefault(); alert("Settings saved!"); }} className="space-y-6 text-xs max-w-2xl">
 <div className="grid gap-6 sm:grid-cols-2">
 <div className="space-y-2">
 <label className="block font-bold text-slate-455 uppercase tracking-wider">Site Name</label>
 <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2.5 focus:outline-none" />
 </div>
 <div className="space-y-2">
 <label className="block font-bold text-slate-455 uppercase tracking-wider">SMTP Server Host</label>
 <input type="text" value={smtpServer} onChange={(e) => setSmtpServer(e.target.value)} className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2.5 focus:outline-none" />
 </div>
 </div>

 <div className="flex items-center gap-3">
 <input type="checkbox" id="maint-mode" checked={maintenance} onChange={(e) => setMaintenance(e.target.checked)} className="h-4 w-4 text-blue-600 " />
 <label htmlFor="maint-mode" className="font-bold text-slate-700 dark:text-slate-350">Enable Website Maintenance Mode</label>
 </div>

 <button type="submit" className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold px-6 py-3 flex items-center gap-1.5 shadow-sm">
 <Save className="h-4 w-4" />
 <span>Save System Settings</span>
 </button>
 </form>
 </div>
 )}

 {activeTab === "roles" && (
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm overflow-hidden">
 <div className="p-6 border-b">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Roles & Permissions Management</h4>
 </div>
 
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
 <th className="py-4 px-6">Role Name</th>
 <th className="py-4 px-6">Create Blog</th>
 <th className="py-4 px-6">Approve Booking</th>
 <th className="py-4 px-6">Manage Users</th>
 <th className="py-4 px-6">View Revenue</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-750 dark:text-slate-350">
 {mockPermissions.map((item) => (
 <tr key={item.role} className="hover:bg-slate-50/50">
 <td className="py-5 px-6 font-bold text-slate-900 dark:text-white">{item.role}</td>
 <td className="py-5 px-6 font-bold">{item.createBlog ? "✅ YES" : "❌ NO"}</td>
 <td className="py-5 px-6 font-bold">{item.approveBooking ? "✅ YES" : "❌ NO"}</td>
 <td className="py-5 px-6 font-bold">{item.manageUsers ? "✅ YES" : "❌ NO"}</td>
 <td className="py-5 px-6 font-bold">{item.viewRevenue ? "✅ YES" : "❌ NO"}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {activeTab === "logs" && (
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm overflow-hidden">
 <div className="p-6 border-b">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Security Audit Activity Logs</h4>
 </div>
 
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
 <th className="py-4 px-6">Administrator</th>
 <th className="py-4 px-6">Action Performed</th>
 <th className="py-4 px-6">IP Address</th>
 <th className="py-4 px-6 text-right">Log Time</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {logs.map((log) => (
 <tr key={log.id} className="hover:bg-slate-50/50">
 <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">{log.admin}</td>
 <td className="py-4 px-6 font-semibold text-slate-700 dark:text-slate-300">{log.action}</td>
 <td className="py-4 px-6 font-mono text-slate-500">{log.ip}</td>
 <td className="py-4 px-6 text-slate-500 font-medium text-right">{log.time}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {activeTab === "support" && (
 <div className="grid gap-6 lg:grid-cols-3">
 
 {/* Inbox panel */}
 <div className="lg:col-span-1 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-4 shadow-sm space-y-4">
 <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-2">Support Tickets Inbox</h5>
 
 <div className="space-y-2.5">
 {supportList.map((msg) => (
 <button
 key={msg.id}
 onClick={() => { setActiveMessage(msg); }}
 className={`w-full p-4 border text-left block transition-all ${
 activeMessage?.id === msg.id
 ? "border-blue-600 bg-blue-50/10"
 : "border-slate-200 hover:border-slate-800 bg-white dark:bg-[#0c0c0e]"
 }`}
 >
 <div className="flex justify-between items-start gap-2">
 <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{msg.sender}</span>
 <span className="text-[9px] text-slate-400 whitespace-nowrap">{msg.date}</span>
 </div>
 <p className="text-[10px] text-slate-500 font-semibold truncate mt-1">{msg.subject}</p>
 </button>
 ))}
 </div>
 </div>

 {/* Details & Reply panel */}
 <div className="lg:col-span-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 {activeMessage ? (
 <div className="space-y-6">
 <div className="border-b pb-4">
 <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">{activeMessage.subject}</h4>
 <p className="text-[10px] text-slate-400 mt-1">From: {activeMessage.sender} ({activeMessage.email}) • Received {activeMessage.date}</p>
 </div>
 
 <p className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed font-semibold">
 {activeMessage.message}
 </p>

 <form onSubmit={handleSupportReply} className="space-y-3 pt-6 border-t">
 <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Write Dispatch Reply</label>
 <textarea
 required
 rows={4}
 placeholder="Reply content details..."
 value={replyText}
 onChange={(e) => setReplyText(e.target.value)}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2 text-xs focus:outline-none"
 />
 <button type="submit" className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold px-6 py-2.5">
 Send Reply
 </button>
 </form>
 </div>
 ) : (
 <div className="text-center py-20 text-slate-400 text-xs space-y-2">
 <MessageSquare className="h-10 w-10 mx-auto text-slate-300" />
 <p className="font-bold">No message selected</p>
 <p className="text-[10px]">Select a ticket from the inbox left panel to audit details.</p>
 </div>
 )}
 </div>

 </div>
 )}

 {activeTab === "faqs" && (
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-8 shadow-sm space-y-6">
 <div className="border-b pb-4 flex justify-between items-center mb-6">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Frequently Asked Questions</h4>
 <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold">
 <Plus className="h-3.5 w-3.5" />
 <span>Add FAQ</span>
 </button>
 </div>

 <div className="space-y-4 max-w-3xl">
 {mockFaqs.map((faq) => (
 <div key={faq.id} className="p-5 bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] space-y-2">
 <div className="flex justify-between items-center gap-2">
 <h5 className="text-xs font-bold text-slate-900 dark:text-white">Q: {faq.q}</h5>
 <span className="text-[9px] font-extrabold px-2 py-0.5 border border-slate-200 bg-white text-slate-500">
 {faq.cat}
 </span>
 </div>
 <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
 A: {faq.a}
 </p>
 </div>
 ))}
 </div>
 </div>
 )}

 {activeTab === "profile" && (
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-8 shadow-sm space-y-8">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-3 mb-6">Personal Coordinates</h4>
 
 <form onSubmit={(e) => { e.preventDefault(); alert("Profile updated!"); }} className="space-y-6 text-xs max-w-2xl">
 <div className="grid gap-6 sm:grid-cols-2">
 <div className="space-y-2">
 <label className="block font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
 <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2.5 focus:outline-none" />
 </div>
 <div className="space-y-2">
 <label className="block font-bold text-slate-400 uppercase tracking-wider">Email Coordinates</label>
 <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2.5 focus:outline-none" />
 </div>
 </div>

 <div className="flex items-center gap-3 border-t pt-6">
 <input type="checkbox" id="profile-2fa" checked={twoFactor} onChange={(e) => setTwoFactor(e.target.checked)} className="h-4 w-4 text-blue-600 " />
 <label htmlFor="profile-2fa" className="font-bold text-slate-700 dark:text-slate-350 flex items-center gap-1.5">
 <Smartphone className="h-4.5 w-4.5" />
 <span>Enable Multi-Factor Authenticator</span>
 </label>
 </div>

 <button type="submit" className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold px-6 py-3 flex items-center gap-1.5 shadow-sm">
 <Save className="h-4 w-4" />
 <span>Update Profile Parameters</span>
 </button>
 </form>
 </div>
 )}

 {activeTab === "health" && (
 <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
 {[
 { title: "Database cluster status", icon: Database, details: "MySQL Server Connection Active", load: "Active Connections: 48/100", speed: "Query Latency: 12ms", status: "Healthy" },
 { title: "SMTP Email Delivery server", icon: Mail, details: "smtp.safetyanswers.com", load: "Queue Backlog: 0 emails", speed: "Response: 140ms", status: "Healthy" },
 { title: "Stripe Gateway Integration", icon: Globe, details: "Stripe Webhooks Enabled", load: "Live Mode Enabled", speed: "API Handshake: 1.2s", status: "Healthy" }
 ].map((item, idx) => {
 const Icon = item.icon;
 return (
 <div
 key={idx}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm space-y-4 hover:border-slate-350 transition-colors"
 >
 <div className="flex items-center justify-between border-b pb-3">
 <div className="flex items-center gap-2">
 <div className="flex h-8 w-8 items-center justify-center bg-blue-50 text-blue-600 dark:bg-blue-950/20 shrink-0">
 <Icon className="h-4.5 w-4.5" />
 </div>
 <span className="text-xs font-bold text-slate-800 dark:text-slate-300">{item.title}</span>
 </div>
 <span className="text-[9px] font-extrabold text-green-600 bg-green-50 dark:bg-green-950/20 px-2 py-0.5 border border-green-200 dark:border-green-900">
 {item.status}
 </span>
 </div>
 <div className="text-[11px] text-slate-500 font-semibold space-y-1">
 <p>{item.details}</p>
 <p>{item.load}</p>
 <p>{item.speed}</p>
 </div>
 </div>
 );
 })}
 </div>
 )}

 {activeTab === "reports" && (
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-8 shadow-sm space-y-6">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-3 mb-6">Financial & Booking Reports</h4>
 <div className="grid gap-6 sm:grid-cols-2 max-w-xl text-xs">
 <div className="p-5 border border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] flex flex-col justify-between h-40">
 <h5 className="font-bold text-slate-900 dark:text-white">Receipts Ledger Report (CSV/Excel)</h5>
 <p className="text-[11px] text-slate-500 leading-normal">Full listings of premium unlocks, pricing categories, and refunds.</p>
 <button onClick={() => alert("CSV Downloaded")} className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold mt-4">
 Export Spreadsheet Report
 </button>
 </div>
 <div className="p-5 border border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] flex flex-col justify-between h-40">
 <h5 className="font-bold text-slate-900 dark:text-white">Active Bookings Performance (PDF)</h5>
 <p className="text-[11px] text-slate-500 leading-normal">Summary metrics of coordinator task resolution rates.</p>
 <button onClick={() => alert("PDF Generated")} className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold mt-4">
 Export PDF Report
 </button>
 </div>
 </div>
 </div>
 )}

 {activeTab === "analytics" && (
 <div className="space-y-6">
 {/* Traffic stats grid */}
 <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
 {[
 { label: "Unique Visitors", val: "2,450", change: "+12.4%" },
 { label: "Conversion Rate", val: "4.8%", change: "+2.1%" },
 { label: "Bounce Rate", val: "38.2%", change: "-1.4%" },
 { label: "Session Duration", val: "4m 12s", change: "+25.8%" }
 ].map((stat, i) => (
 <div key={i} className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-5">
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
 <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{stat.val}</p>
 <p className="text-[9px] font-bold text-green-600 mt-0.5">{stat.change} vs last month</p>
 </div>
 ))}
 </div>

 {/* Table index popularity */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-3 mb-4">Popular Consultancy Services</h4>
 <div className="space-y-3 text-xs font-semibold text-slate-650 dark:text-slate-350">
 <div className="flex justify-between items-center">
 <span>1. PhD Research Proposal Methodology & SPSS (Academic)</span>
 <span className="font-bold text-slate-900 dark:text-white">48 bookings (45% share)</span>
 </div>
 <div className="flex justify-between items-center">
 <span>2. NEBOSH Risk Assessment Compliance Audit (Safety)</span>
 <span className="font-bold text-slate-900 dark:text-white">35 bookings (35% share)</span>
 </div>
 <div className="flex justify-between items-center">
 <span>3. Postgraduate Admissions Statement of Purpose (Writing)</span>
 <span className="font-bold text-slate-900 dark:text-white">22 bookings (20% share)</span>
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Global notifications tab */}
 {activeTab === "notifications" && (
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-8 shadow-sm space-y-6">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-3 mb-6">Global Alerts Queue</h4>
 <div className="space-y-4">
 <div className="p-4 border bg-blue-50/15 border-blue-200 text-xs flex justify-between items-center">
 <div>
 <p className="font-bold text-blue-650">System backup success</p>
 <p className="text-slate-455 dark:text-slate-500 mt-0.5">MySQL database backup processed. 14.8 GB archived successfully.</p>
 </div>
 <span className="text-[10px] text-slate-400 font-semibold">Today, 02:00 AM</span>
 </div>
 <div className="p-4 border bg-green-50/15 border-green-200 text-xs flex justify-between items-center">
 <div>
 <p className="font-bold text-green-700">Stripe gateway webhook test approved</p>
 <p className="text-slate-455 dark:text-slate-500 mt-0.5">Received successful charge callback from API node for INV-1042.</p>
 </div>
 <span className="text-[10px] text-slate-400 font-semibold">Yesterday</span>
 </div>
 </div>
 </div>
 )}

 {/* Dynamic Search Results */}
 {activeTab === "search" && (
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-8 shadow-sm space-y-6">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-3 mb-6">Global Search Result Index</h4>
 
 {searchVal.trim() ? (
 <div className="space-y-4 text-xs">
 <p className="font-semibold text-slate-500">Found results matching: <span className="font-bold text-slate-900 dark:text-white">"{searchVal}"</span></p>
 <div className="space-y-2">
 <div className="p-4 border hover:border-slate-800 cursor-pointer">
 <p className="font-bold text-slate-900 dark:text-white">Alicia Thompson (Registered User)</p>
 <p className="text-[10px] text-slate-400 mt-0.5">USR-082 • alicia@example.com</p>
 </div>
 <div className="p-4 border hover:border-slate-800 cursor-pointer">
 <p className="font-bold text-slate-900 dark:text-white">PhD Proposal Review (Academic Booking)</p>
 <p className="text-[10px] text-slate-400 mt-0.5">BK-104 • Client: Alicia Thompson</p>
 </div>
 </div>
 </div>
 ) : (
 <div className="text-center py-10 text-slate-400 text-xs">
 <p className="font-bold">Empty search parameters.</p>
 </div>
 )}
 </div>
 )}

 </div>
 );
}
