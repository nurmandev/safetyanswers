"use client";

import React, { useState } from "react";
import {
 Search,
 Plus,
 BookOpen,
 PenTool,
 Shield,
 Edit2,
 Trash2,
 CheckCircle,
 XCircle,
 ToggleLeft,
 ToggleRight
} from "lucide-react";

// Mock Data
const academicServices = [
 { id: "acad-1", title: "PhD Proposal Review & Editing", price: "$450.00", duration: "7 days", visibility: true, desc: "Detailed critique of proposal aims, literature review gaps, and SPSS data models." },
 { id: "acad-2", title: "Dissertation Quantitative STATA Modeling", price: "$800.00", duration: "14 days", visibility: true, desc: "Formulating variables tables, coding responses, and exporting STATA regression outputs." },
 { id: "acad-3", title: "Turnitin Similarity Index Reduction", price: "$180.00", duration: "3 days", visibility: false, desc: "Paragraph rephrasing and proper referencing styles formatting to clear Turnitin warnings." }
];

const writingServices = [
 { id: "writ-1", title: "Professional CV Writing & Resume Audit", price: "$99.00", duration: "3 days", visibility: true, desc: "Audit and alignment of career history to target consulting vacancies." },
 { id: "writ-2", title: "Postgraduate Statement of Purpose (SOP)", price: "$149.00", duration: "5 days", visibility: true, desc: "Crafting a clear academic path and institution fit narrative." },
 { id: "writ-3", title: "Full Venture Business Plan Draft", price: "$650.00", duration: "10 days", visibility: true, desc: "Writing financial projections worksheets, competitor audits, and marketing schedules." }
];

const safetyServices = [
 { id: "safe-1", title: "NEBOSH Exam Study Preparation", price: "$299.00", duration: "30 days", visibility: true, desc: "Detailed syllabus study guides and past exam question papers audit." },
 { id: "safe-2", title: "Workplace Hazard Risk Assessment", price: "$1,200.00", duration: "14 days", visibility: true, desc: "Formulating on-site risk grids, fire drills logs, and OSHA regulatory checklists." },
 { id: "safe-3", title: "HSE Emergency Planning & Policy Draft", price: "$850.00", duration: "7 days", visibility: true, desc: "Custom evacuation route grids, crisis coordination plans, and board declarations." }
];

export function ServiceManagement({ tab }: { tab: "academic" | "professional-writing" | "health-safety" }) {
 const [activeTab, setActiveTab] = useState(tab);
 const [searchQuery, setSearchQuery] = useState("");
 const [showFormModal, setShowFormModal] = useState(false);
 const [editingService, setEditingService] = useState<any>(null);

 // Form states
 const [title, setTitle] = useState("");
 const [price, setPrice] = useState("");
 const [duration, setDuration] = useState("");
 const [desc, setDesc] = useState("");

 const getActiveList = () => {
 if (activeTab === "academic") return academicServices;
 if (activeTab === "professional-writing") return writingServices;
 return safetyServices;
 };

 const handleEdit = (service: any) => {
 setEditingService(service);
 setTitle(service.title);
 setPrice(service.price);
 setDuration(service.duration);
 setDesc(service.desc);
 setShowFormModal(true);
 };

 const handleCreate = () => {
 setEditingService(null);
 setTitle("");
 setPrice("");
 setDuration("");
 setDesc("");
 setShowFormModal(true);
 };

 return (
 <div className="space-y-6">
 
 {/* Tabs */}
 <div className="flex border-b border-slate-200 dark:border-[#1a1a1f] gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
 {[
 { key: "academic", label: "Academic Consultancy", icon: BookOpen },
 { key: "professional-writing", label: "Professional Writing", icon: PenTool },
 { key: "health-safety", label: "Health & Safety", icon: Shield }
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

 {/* Actions */}
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div className="relative w-full max-w-md">
 <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
 <Search className="h-4 w-4" />
 </span>
 <input
 type="text"
 placeholder={`Search ${activeTab} services...`}
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] text-xs focus:outline-none focus:border-blue-600"
 />
 </div>

 <button
 onClick={handleCreate}
 className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition-all shadow-sm"
 >
 <Plus className="h-3.5 w-3.5" />
 <span>Add Service</span>
 </button>
 </div>

 {/* Grid list of services */}
 <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
 {getActiveList()
 .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
 .map((service) => (
 <div
 key={service.id}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 dark:hover:border-slate-800 transition-colors"
 >
 <div className="space-y-3">
 <div className="flex items-start justify-between gap-4">
 <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
 {service.title}
 </h4>
 <button className="text-slate-455 dark:text-slate-500 hover:text-blue-600">
 {service.visibility ? <ToggleRight className="h-5 w-5 text-blue-600" /> : <ToggleLeft className="h-5 w-5" />}
 </button>
 </div>
 <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
 {service.desc}
 </p>
 </div>

 <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#1a1a1f] flex items-center justify-between">
 <div>
 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Starting From</p>
 <p className="text-sm font-extrabold text-blue-600 dark:text-blue-450">{service.price}</p>
 </div>
 
 <div className="flex items-center gap-2">
 <span className="text-[10px] font-bold text-slate-400">{service.duration}</span>
 <button
 onClick={() => handleEdit(service)}
 className="flex h-7 w-7 items-center justify-center border border-slate-200 dark:border-[#1e1e24] hover:border-slate-800 transition-colors"
 >
 <Edit2 className="h-3.5 w-3.5" />
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Service Modal Form */}
 {showFormModal && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
 <div className="w-full max-w-lg bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-2xl p-8 space-y-6">
 
 <div className="border-b pb-4 flex justify-between items-center">
 <h3 className="text-base font-bold text-slate-955 dark:text-white">
 {editingService ? "Configure Service" : "Add New Service Item"}
 </h3>
 <button onClick={() => setShowFormModal(false)} className="text-slate-400 hover:text-slate-900">&times;</button>
 </div>

 <form onSubmit={(e) => { e.preventDefault(); setShowFormModal(false); }} className="space-y-4 text-xs">
 
 <div className="space-y-2">
 <label className="block font-bold text-slate-400 uppercase tracking-wider">Service Title</label>
 <input
 type="text"
 required
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-4 py-3 focus:outline-none"
 />
 </div>

 <div className="grid gap-4 sm:grid-cols-2">
 <div className="space-y-2">
 <label className="block font-bold text-slate-400 uppercase tracking-wider">Starting Price ($)</label>
 <input
 type="text"
 required
 value={price}
 onChange={(e) => setPrice(e.target.value)}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-4 py-3 focus:outline-none"
 />
 </div>
 <div className="space-y-2">
 <label className="block font-bold text-slate-400 uppercase tracking-wider">Typical Duration</label>
 <input
 type="text"
 required
 value={duration}
 onChange={(e) => setDuration(e.target.value)}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-4 py-3 focus:outline-none"
 />
 </div>
 </div>

 <div className="space-y-2">
 <label className="block font-bold text-slate-400 uppercase tracking-wider">Brief Description</label>
 <textarea
 value={desc}
 onChange={(e) => setDesc(e.target.value)}
 rows={4}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-4 py-3 focus:outline-none"
 />
 </div>

 <div className="pt-4 border-t flex justify-end gap-3">
 <button
 type="button"
 onClick={() => setShowFormModal(false)}
 className="px-5 py-3 border border-slate-200 text-slate-700 dark:text-slate-350 font-bold"
 >
 Cancel
 </button>
 <button
 type="submit"
 className="px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold"
 >
 Save Service
 </button>
 </div>

 </form>

 </div>
 </div>
 )}

 </div>
 );
}
