"use client";

import React, { useState } from "react";
import {
 Search,
 FolderOpen,
 Grid,
 List,
 FileText,
 FileImage,
 Video,
 Download,
 Trash2,
 Paperclip,
 TrendingUp,
 HardDrive
} from "lucide-react";

// Mock Media library assets
const mockMedia = [
 { id: 1, name: "brand_logo_main.png", type: "image", size: "340 KB", path: "/brand_logo_main.png", date: "2026-06-01" },
 { id: 2, name: "hse_factory_audit_checklist.pdf", type: "pdf", size: "3.2 MB", path: "/hse_factory_audit_checklist.pdf", date: "2026-06-28" },
 { id: 3, name: "spss_data_coding_variable_sheet.xlsx", type: "document", size: "1.1 MB", path: "/spss_data_coding_variable_sheet.xlsx", date: "2026-07-01" },
 { id: 4, name: "workplace_hazards_induction_training.mp4", type: "video", size: "48.5 MB", path: "/workplace_hazards_induction_training.mp4", date: "2026-06-20" }
];

// Mock Client file uploads
const mockUploads = [
 { id: "UPL-83", client: "Alicia Thompson", name: "thesis_proposal_v2.pdf", size: "2.4 MB", date: "2026-07-01 10:24 AM" },
 { id: "UPL-82", client: "Marcus Reed", name: "factory_floor_blueprint.pdf", size: "1.1 MB", date: "2026-06-28 08:15 AM" },
 { id: "UPL-81", client: "Nadia Yusuf", name: "sop_draft_nadia.docx", size: "820 KB", date: "2026-06-25 04:30 PM" }
];

export function AssetManagement({ tab }: { tab: "media" | "uploads" }) {
 const [activeTab, setActiveTab] = useState(tab);
 const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
 const [searchQuery, setSearchQuery] = useState("");
 const [uploads, setUploads] = useState(mockUploads);

 const handleDeleteUpload = (id: string) => {
 setUploads(prev => prev.filter(u => u.id !== id));
 };

 return (
 <div className="space-y-6">
 
 {/* Tabs */}
 <div className="flex border-b border-slate-200 dark:border-[#1a1a1f] gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
 {[
 { key: "media", label: "Media Library Assets", icon: FolderOpen },
 { key: "uploads", label: "Client File Uploads", icon: Paperclip }
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

 {activeTab === "media" && (
 <div className="space-y-6">
 
 {/* Controls */}
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div className="relative w-full max-w-md">
 <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
 <Search className="h-4 w-4" />
 </span>
 <input
 type="text"
 placeholder="Search media assets..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] text-xs focus:outline-none"
 />
 </div>

 <div className="flex gap-2">
 <button
 onClick={() => setViewMode("grid")}
 className={`p-2 border transition-colors bg-white dark:bg-[#0c0c0e] ${viewMode === "grid" ? "border-slate-800" : ""}`}
 >
 <Grid className="h-4 w-4" />
 </button>
 <button
 onClick={() => setViewMode("list")}
 className={`p-2 border transition-colors bg-white dark:bg-[#0c0c0e] ${viewMode === "list" ? "border-slate-800" : ""}`}
 >
 <List className="h-4 w-4" />
 </button>
 <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:opacity-90">
 Upload Media
 </button>
 </div>
 </div>

 {/* Media Grid / List */}
 {viewMode === "grid" ? (
 <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
 {mockMedia
 .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
 .map((file) => (
 <div
 key={file.id}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-4 flex flex-col justify-between h-40 hover:border-slate-350 transition-colors"
 >
 <div className="flex items-start justify-between gap-2 border-b pb-2">
 <div className="truncate">
 <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
 <p className="text-[9px] text-slate-400 mt-0.5">{file.size} • {file.date}</p>
 </div>
 </div>

 <div className="flex justify-center py-2 text-slate-400">
 {file.type === "image" && <FileImage className="h-8 w-8 text-blue-600" />}
 {file.type === "pdf" && <FileText className="h-8 w-8 text-red-500" />}
 {file.type === "document" && <FileText className="h-8 w-8 text-green-600" />}
 {file.type === "video" && <Video className="h-8 w-8 text-[#7c3aed]" />}
 </div>

 <div className="flex justify-end gap-2 border-t pt-2 mt-auto">
 <button className="text-slate-400 hover:text-slate-700"><Download className="h-4 w-4" /></button>
 <button className="text-slate-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
 </div>
 </div>
 ))}
 </div>
 ) : (
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
 <th className="py-4 px-6">Asset Name</th>
 <th className="py-4 px-6">Classification</th>
 <th className="py-4 px-6">File Size</th>
 <th className="py-4 px-6">Upload Date</th>
 <th className="py-4 px-6 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {mockMedia.map((file) => (
 <tr key={file.id} className="hover:bg-slate-50/50">
 <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">{file.name}</td>
 <td className="py-4 px-6 capitalize">{file.type}</td>
 <td className="py-4 px-6 text-slate-500 font-semibold">{file.size}</td>
 <td className="py-4 px-6 text-slate-500 font-medium">{file.date}</td>
 <td className="py-4 px-6 text-right space-x-3">
 <button className="text-slate-400 hover:text-slate-700"><Download className="h-4.5 w-4.5" /></button>
 <button className="text-slate-400 hover:text-red-500"><Trash2 className="h-4.5 w-4.5" /></button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 </div>
 )}

 {activeTab === "uploads" && (
 <div className="grid gap-6 lg:grid-cols-3">
 
 {/* List of client uploads */}
 <div className="lg:col-span-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm flex flex-col justify-between">
 <div>
 <div className="flex items-center justify-between mb-4">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Project Drafts</h4>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
 <th className="pb-3 px-2">Uploader Client</th>
 <th className="pb-3 px-2">Uploaded File</th>
 <th className="pb-3 px-2">Size</th>
 <th className="pb-3 px-2">Upload Date</th>
 <th className="pb-3 px-2 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {uploads.map((file) => (
 <tr key={file.id} className="hover:bg-slate-50/50">
 <td className="py-4 px-2 font-bold text-slate-900 dark:text-white">{file.client}</td>
 <td className="py-4 px-2 font-semibold flex items-center gap-1.5"><Paperclip className="h-3.5 w-3.5 text-slate-400" /> {file.name}</td>
 <td className="py-4 px-2 font-medium text-slate-500">{file.size}</td>
 <td className="py-4 px-2 text-slate-450">{file.date}</td>
 <td className="py-4 px-2 text-right space-x-2">
 <button className="text-slate-400 hover:text-slate-700"><Download className="h-4 w-4" /></button>
 <button onClick={() => handleDeleteUpload(file.id)} className="text-slate-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>

 {/* Storage statistics card */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm flex flex-col justify-between">
 <div>
 <div className="flex items-center justify-between mb-6">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Upload Storage</h4>
 <HardDrive className="h-5 w-5 text-slate-400 shrink-0" />
 </div>

 <div className="space-y-4">
 <div className="space-y-1">
 <div className="flex justify-between text-xs font-bold">
 <span>14.8 GB Used</span>
 <span className="text-slate-400">100 GB Total Capacity</span>
 </div>
 <div className="h-2 w-full bg-slate-100 dark:bg-[#121215] border overflow-hidden">
 <div className="h-full bg-blue-600 w-[14.8%]" />
 </div>
 </div>

 <div className="space-y-2 pt-4 border-t text-[10px] font-bold text-slate-500">
 <div className="flex justify-between">
 <span>Academic PDFs</span>
 <span className="text-slate-900 dark:text-white">6.2 GB</span>
 </div>
 <div className="flex justify-between">
 <span>HSE Site blue-prints</span>
 <span className="text-slate-900 dark:text-white">5.8 GB</span>
 </div>
 <div className="flex justify-between">
 <span>Coordinators videos</span>
 <span className="text-slate-900 dark:text-white">2.8 GB</span>
 </div>
 </div>
 </div>
 </div>
 </div>

 </div>
 )}

 </div>
 );
}
