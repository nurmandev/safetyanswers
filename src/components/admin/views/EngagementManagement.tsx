"use client";

import React, { useState } from "react";
import {
 Search,
 Plus,
 Mail,
 FolderHeart,
 Edit2,
 Trash2,
 CheckCircle,
 XCircle,
 Send,
 Users,
 Upload,
 Download
} from "lucide-react";

// Mock Data
const mockTestimonials = [
 { id: 1, name: "Bagas Mahpie", role: "Lead Consultant", text: "The compliance audits drafted by this team cleared our regulatory warning sheets in 4 days. Absolutely first-class risk consultants.", status: "Approved", featured: true },
 { id: 2, name: "Sir Dandy", role: "HSE Specialist", text: "NEBOSH study checklists are comprehensive and structured perfectly. My team cleared exams on first attempt.", status: "Pending Review", featured: false },
 { id: 3, name: "Jhon Tosan", role: "Academic Editor", text: "SPSS data analysis regression sheets were structured cleanly. Clear validation details.", status: "Approved", featured: false }
];

const mockCampaigns = [
 { id: "CMP-012", subject: "July HSE Compliance Audit Manual Unlocked", date: "2026-07-01", sent: "840 readers", open: "42.8%", click: "12.4%" },
 { id: "CMP-011", subject: "Statisticians Guide to Thesis Variables Coding", date: "2026-06-15", sent: "812 readers", open: "38.6%", click: "8.2%" }
];

const mockSubscribers = [
 { email: "alicia@example.com", status: "Subscribed", date: "2026-07-01" },
 { email: "marcus@example.com", status: "Subscribed", date: "2026-06-28" },
 { email: "nadia@example.com", status: "Unsubscribed", date: "2026-06-25" }
];

export function EngagementManagement({ tab }: { tab: "testimonials" | "newsletter" }) {
 const [activeTab, setActiveTab] = useState(tab);
 const [searchQuery, setSearchQuery] = useState("");
 const [testimonials, setTestimonials] = useState(mockTestimonials);

 // Form modal
 const [showCampaignModal, setShowCampaignModal] = useState(false);
 const [subject, setSubject] = useState("");
 const [campaignBody, setCampaignBody] = useState("");

 const handleApprove = (id: number) => {
 setTestimonials(prev =>
 prev.map(t => (t.id === id ? { ...t, status: t.status === "Approved" ? "Pending Review" : "Approved" } : t))
 );
 };

 const handleFeature = (id: number) => {
 setTestimonials(prev =>
 prev.map(t => (t.id === id ? { ...t, featured: !t.featured } : t))
 );
 };

 return (
 <div className="space-y-6">
 
 {/* Tabs */}
 <div className="flex border-b border-slate-200 dark:border-[#1a1a1f] gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
 {[
 { key: "testimonials", label: "Client Testimonials", icon: FolderHeart },
 { key: "newsletter", label: "Newsletter Campaigns", icon: Mail }
 ].map((item) => {
 const Icon = item.icon;
 const isActive = activeTab === item.key;
 return (
 <button
 key={item.key}
 onClick={() => setActiveTab(item.key as any)}
 className={`flex items-center gap-2 pb-3 border-b-2 transition-all ${
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

 {activeTab === "testimonials" && (
 <div className="space-y-6">
 
 {/* Controls */}
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div className="relative w-full max-w-md">
 <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
 <Search className="h-4 w-4" />
 </span>
 <input
 type="text"
 placeholder="Search testimonials by client name..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] text-xs focus:outline-none"
 />
 </div>
 
 <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition-all shadow-sm">
 <Plus className="h-3.5 w-3.5" />
 <span>Create Testimonial</span>
 </button>
 </div>

 {/* Testimonial List Grid */}
 <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
 {testimonials
 .filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
 .map((t) => (
 <div
 key={t.id}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 transition-colors"
 >
 <div className="space-y-3">
 <div className="flex items-center justify-between border-b pb-3">
 <div>
 <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{t.name}</h5>
 <p className="text-[10px] text-slate-400 mt-0.5">{t.role}</p>
 </div>
 <span className={`inline-block px-2 py-0.5 text-[9px] font-extrabold border ${
 t.status === "Approved" ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20" :
 "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20"
 }`}>
 {t.status}
 </span>
 </div>

 <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-semibold italic">
 "{t.text}"
 </p>
 </div>

 <div className="pt-4 border-t border-slate-100 dark:border-[#1a1a1f] mt-6 flex justify-between items-center text-xs">
 <button
 onClick={() => handleFeature(t.id)}
 className={`text-[10px] font-bold px-2 py-1 border ${
 t.featured 
 ? "bg-purple-50 border-purple-200 text-purple-750" 
 : "bg-slate-50 border-slate-200 text-slate-455"
 }`}
 >
 {t.featured ? "Featured" : "Standard"}
 </button>

 <div className="flex gap-2">
 <button
 onClick={() => handleApprove(t.id)}
 className="text-blue-600 hover:text-blue-700 font-bold"
 >
 {t.status === "Approved" ? "Reject" : "Approve"}
 </button>
 <button className="text-slate-400 hover:text-red-500">
 <Trash2 className="h-4 w-4" />
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>

 </div>
 )}

 {activeTab === "newsletter" && (
 <div className="space-y-8">
 
 {/* Controls */}
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div className="flex flex-wrap items-center gap-2">
 <button className="flex items-center gap-1.5 px-4 py-2 border text-slate-700 dark:text-slate-350 text-xs font-bold hover:border-slate-800 bg-white dark:bg-[#0c0c0e]">
 <Upload className="h-4 w-4" />
 <span>Import CSV</span>
 </button>
 <button className="flex items-center gap-1.5 px-4 py-2 border text-slate-700 dark:text-slate-350 text-xs font-bold hover:border-slate-800 bg-white dark:bg-[#0c0c0e]">
 <Download className="h-4 w-4" />
 <span>Export list</span>
 </button>
 </div>

 <button
 onClick={() => setShowCampaignModal(true)}
 className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition-all shadow-sm"
 >
 <Send className="h-3.5 w-3.5" />
 <span>Send Campaign</span>
 </button>
 </div>

 <div className="grid gap-6 lg:grid-cols-3">
 
 {/* Campaign logs */}
 <div className="lg:col-span-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 border-b pb-3">Campaign Histories</h4>
 
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
 <th className="pb-3 px-2">Campaign Subject</th>
 <th className="pb-3 px-2">Send Date</th>
 <th className="pb-3 px-2">Audience Size</th>
 <th className="pb-3 px-2">Open Rate</th>
 <th className="pb-3 px-2 text-right">Click Rate</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {mockCampaigns.map((cmp) => (
 <tr key={cmp.id} className="hover:bg-slate-50/50">
 <td className="py-4 px-2 font-bold text-slate-900 dark:text-white">{cmp.subject}</td>
 <td className="py-4 px-2 text-slate-500 font-semibold">{cmp.date}</td>
 <td className="py-4 px-2 font-medium">{cmp.sent}</td>
 <td className="py-4 px-2 font-bold text-green-600">{cmp.open}</td>
 <td className="py-4 px-2 text-right font-bold text-blue-600">{cmp.click}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 {/* Subscribers list */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 border-b pb-3">Subscribers list</h4>
 <div className="space-y-4">
 {mockSubscribers.map((sub) => (
 <div key={sub.email} className="flex justify-between items-center text-xs">
 <div>
 <p className="font-mono text-slate-900 dark:text-white">{sub.email}</p>
 <p className="text-[10px] text-slate-400 mt-0.5">Joined {sub.date}</p>
 </div>
 <span className={`inline-block px-2 py-0.5 text-[9px] font-extrabold border ${
 sub.status === "Subscribed" ? "bg-green-50 border-green-200 text-green-700" : "bg-slate-50 border-slate-200 text-slate-455"
 }`}>
 {sub.status}
 </span>
 </div>
 ))}
 </div>
 </div>

 </div>

 </div>
 )}

 {/* Campaign modal */}
 {showCampaignModal && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
 <div className="w-full max-w-lg bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-2xl p-8 space-y-6">
 
 <div className="border-b pb-4 flex justify-between items-center">
 <h3 className="text-base font-bold text-slate-950 dark:text-white">Draft Newsletter Campaign</h3>
 <button onClick={() => setShowCampaignModal(false)} className="text-slate-400 hover:text-slate-900">&times;</button>
 </div>

 <form onSubmit={(e) => { e.preventDefault(); setShowCampaignModal(false); }} className="space-y-4 text-xs">
 
 <div className="space-y-2">
 <label className="block font-bold text-slate-400 uppercase tracking-wider">Email Subject</label>
 <input
 type="text"
 required
 placeholder="e.g. Safety Answers Newsletter Vol. 12"
 value={subject}
 onChange={(e) => setSubject(e.target.value)}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-4 py-3 focus:outline-none"
 />
 </div>

 <div className="space-y-2">
 <label className="block font-bold text-slate-400 uppercase tracking-wider">Campaign Body Content</label>
 <textarea
 required
 rows={6}
 placeholder="Write your editorial campaign context here..."
 value={campaignBody}
 onChange={(e) => setCampaignBody(e.target.value)}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-4 py-3 focus:outline-none"
 />
 </div>

 <div className="pt-4 border-t flex justify-end gap-3">
 <button
 type="button"
 onClick={() => setShowCampaignModal(false)}
 className="px-5 py-3 border border-slate-200 text-slate-700 dark:text-slate-350 font-bold"
 >
 Cancel
 </button>
 <button
 type="submit"
 className="px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold flex items-center gap-1.5"
 >
 <Send className="h-3.5 w-3.5" />
 <span>Send Campaign Now</span>
 </button>
 </div>

 </form>

 </div>
 </div>
 )}

 </div>
 );
}
