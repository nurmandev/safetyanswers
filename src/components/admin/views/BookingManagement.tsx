"use client";

import React, { useState } from "react";
import {
 Search,
 Calendar,
 User,
 DollarSign,
 Clock,
 Paperclip,
 Download,
 CheckCircle,
 XCircle,
 FileText,
 UserCheck,
 ChevronRight,
 TrendingUp
} from "lucide-react";

// Mock Bookings
const mockBookings = [
 {
 id: "BK-104",
 client: "Alicia Thompson",
 email: "alicia@example.com",
 phone: "+44 20 1234 5678",
 whatsapp: "+44 20 1234 5678",
 country: "United Kingdom",
 service: "PhD Proposal Review",
 category: "Academic Support",
 advisor: "Jhon Tosan",
 date: "2026-07-08",
 status: "Approved",
 budget: "$450.00",
 desc: "SPSS statistical modeling audit and hypothesis validation draft reviews.",
 files: ["thesis_proposal_v2.pdf", "spss_dataset.xlsx"],
 timeline: [
 { date: "Jul 01, 2026", action: "Booking approved by admin coordinator" },
 { date: "Jun 30, 2026", action: "Client requested PhD Proposal Consultation" }
 ],
 notes: "Client requires strict Harvard referencing layout validation."
 },
 {
 id: "BK-103",
 client: "Marcus Reed",
 email: "marcus@example.com",
 phone: "+44 79 1234 5678",
 whatsapp: "+44 79 1234 5678",
 country: "United Kingdom",
 service: "NEBOSH Risk Assessment Checklist",
 category: "Health & Safety",
 advisor: "Sir Dandy",
 date: "2026-07-14",
 status: "Pending",
 budget: "$1,200.00",
 desc: "Workplace hazard checklist preparation for manufacturing unit audit.",
 files: ["factory_floor_blueprint.pdf"],
 timeline: [
 { date: "Jun 28, 2026", action: "Client requested NEBOSH Risk Auditing" }
 ],
 notes: "Requires OSHA compliance checklists review."
 },
 {
 id: "BK-102",
 client: "Nadia Yusuf",
 email: "nadia@example.com",
 phone: "+60 12 345 6789",
 whatsapp: "",
 country: "Malaysia",
 service: "Postgraduate SOP Proofreading",
 category: "Professional Writing",
 advisor: "Bagas Mahpie",
 date: "2026-07-20",
 status: "Completed",
 budget: "$180.00",
 desc: "Editing economics statement of purpose to highlight quantitative skills.",
 files: ["sop_draft_nadia.docx"],
 timeline: [
 { date: "Jul 01, 2026", action: "Coordinators marked project as Completed" },
 { date: "Jun 25, 2026", action: "Advisor Bagas Mahpie assigned to SOP editing" }
 ],
 notes: "LSE Economics MSc application deadline is July 25th."
 }
];

export function BookingManagement({ filterStatus }: { filterStatus?: string }) {
 const [bookings, setBookings] = useState(mockBookings);
 const [activeStatus, setActiveStatus] = useState(filterStatus || "All");
 const [selectedBooking, setSelectedBooking] = useState<any>(null);
 const [searchQuery, setSearchQuery] = useState("");
 
 // Assign fields
 const [assignedAdvisor, setAssignedAdvisor] = useState("");
 const [internalNotes, setInternalNotes] = useState("");

 const handleSelectBooking = (bk: any) => {
 setSelectedBooking(bk);
 setAssignedAdvisor(bk.advisor || "");
 setInternalNotes(bk.notes || "");
 };

 const handleUpdateBooking = (e: React.FormEvent) => {
 e.preventDefault();
 if (selectedBooking) {
 setBookings((prev) =>
 prev.map((bk) =>
 bk.id === selectedBooking.id
 ? { ...bk, advisor: assignedAdvisor, notes: internalNotes }
 : bk
 )
 );
 setSelectedBooking({
 ...selectedBooking,
 advisor: assignedAdvisor,
 notes: internalNotes
 });
 }
 };

 const handleChangeStatus = (status: string) => {
 if (selectedBooking) {
 setBookings((prev) =>
 prev.map((bk) =>
 bk.id === selectedBooking.id ? { ...bk, status } : bk
 )
 );
 setSelectedBooking({ ...selectedBooking, status });
 }
 };

 const filteredBookings = bookings.filter((bk) => {
 const matchesSearch =
 bk.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
 bk.service.toLowerCase().includes(searchQuery.toLowerCase());
 
 if (activeStatus === "All") return matchesSearch;
 return bk.status.toLowerCase() === activeStatus.toLowerCase() && matchesSearch;
 });

 return (
 <div className="space-y-6">
 
 {/* Overview stats header if not viewing details */}
 {!selectedBooking && (
 <div className="flex border-b border-slate-200 dark:border-[#1a1a1f] gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
 {["All", "Pending", "Approved", "Completed", "Cancelled"].map((status) => {
 const isActive = activeStatus.toLowerCase() === status.toLowerCase();
 return (
 <button
 key={status}
 onClick={() => setActiveStatus(status)}
 className={`pb-3 border-b-2 transition-all ${
 isActive
 ? "border-blue-600 text-blue-600 dark:text-white"
 : "border-transparent hover:text-slate-800 dark:hover:text-slate-200"
 }`}
 >
 {status} Bookings
 </button>
 );
 })}
 </div>
 )}

 {/* Main split viewport (Details / List view toggle) */}
 {selectedBooking ? (
 <div className="grid gap-6 lg:grid-cols-12 items-start">
 
 {/* Back button header */}
 <div className="lg:col-span-12">
 <button
 onClick={() => setSelectedBooking(null)}
 className="text-xs font-bold text-slate-400 hover:text-slate-800 flex items-center gap-1.5"
 >
 ← Back to Bookings Ledger
 </button>
 </div>

 {/* Left panel: client details & files */}
 <div className="lg:col-span-8 space-y-6">
 
 {/* Booking Details Card */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-8 shadow-sm space-y-6">
 
 <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
 {selectedBooking.service}
 </h3>
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
 Booking ID: {selectedBooking.id}
 </p>
 </div>
 
 <div className="flex gap-2">
 <button
 onClick={() => handleChangeStatus("Approved")}
 className="px-3.5 py-2 bg-green-600 text-white text-[10px] font-bold hover:opacity-90"
 >
 Approve
 </button>
 <button
 onClick={() => handleChangeStatus("Completed")}
 className="px-3.5 py-2 bg-blue-600 text-white text-[10px] font-bold hover:opacity-90"
 >
 Mark Complete
 </button>
 <button
 onClick={() => handleChangeStatus("Cancelled")}
 className="px-3.5 py-2 bg-red-600 text-white text-[10px] font-bold hover:opacity-90"
 >
 Cancel
 </button>
 </div>
 </div>

 {/* Descriptions & Coordinates */}
 <div className="grid gap-6 sm:grid-cols-2 text-xs">
 <div className="space-y-1">
 <p className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Client Details</p>
 <p className="font-bold text-slate-900 dark:text-white">{selectedBooking.client}</p>
 <p className="text-slate-500">{selectedBooking.email}</p>
 <p className="text-slate-500">{selectedBooking.phone}</p>
 <p className="text-slate-500">{selectedBooking.country}</p>
 </div>

 <div className="space-y-1">
 <p className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Timeline Goals</p>
 <p className="font-semibold">Classification: <span className="text-slate-900 dark:text-white font-bold">{selectedBooking.category}</span></p>
 <p className="font-semibold">Target Date: <span className="text-slate-900 dark:text-white font-bold">{selectedBooking.date}</span></p>
 <p className="font-semibold">Budget Limit: <span className="text-slate-900 dark:text-white font-bold">{selectedBooking.budget}</span></p>
 </div>

 <div className="sm:col-span-2 space-y-1.5 pt-4 border-t">
 <p className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Project Requirement Brief</p>
 <p className="text-slate-650 leading-relaxed font-semibold">{selectedBooking.desc}</p>
 </div>
 </div>

 </div>

 {/* Client Uploaded Files Card */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-8 shadow-sm">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 border-b pb-3">
 Uploaded Coordination Materials
 </h4>
 <div className="space-y-3">
 {selectedBooking.files.map((file: string) => (
 <div
 key={file}
 className="p-4 bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] flex items-center justify-between hover:border-slate-800"
 >
 <div className="flex items-center gap-3">
 <Paperclip className="h-4 w-4 text-slate-400 shrink-0" />
 <span className="text-xs font-bold text-slate-850 dark:text-slate-200">{file}</span>
 </div>
 <button className="flex h-8 w-8 items-center justify-center bg-white dark:bg-[#0c0c0e] border border-slate-250 dark:border-[#1e1e24] text-slate-500 hover:text-slate-800 dark:hover:text-white">
 <Download className="h-3.5 w-3.5" />
 </button>
 </div>
 ))}
 </div>
 </div>

 </div>

 {/* Right panel: internal notes, assign staff, progress timeline */}
 <div className="lg:col-span-4 space-y-6">
 
 {/* Coordination settings */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 border-b pb-3">
 Internal Coordination
 </h4>
 <form onSubmit={handleUpdateBooking} className="space-y-4 text-xs">
 
 <div className="space-y-2">
 <label className="block font-bold text-slate-450 uppercase tracking-wider">Assign Advisor</label>
 <select
 value={assignedAdvisor}
 onChange={(e) => setAssignedAdvisor(e.target.value)}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2.5 focus:outline-none"
 >
 <option value="">Unassigned</option>
 <option value="Bagas Mahpie">Bagas Mahpie (Writing)</option>
 <option value="Sir Dandy">Sir Dandy (Safety)</option>
 <option value="Jhon Tosan">Jhon Tosan (Academic)</option>
 </select>
 </div>

 <div className="space-y-2">
 <label className="block font-bold text-slate-455 uppercase tracking-wider">Coordinator Notes</label>
 <textarea
 value={internalNotes}
 onChange={(e) => setInternalNotes(e.target.value)}
 rows={4}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2.5 focus:outline-none"
 />
 </div>

 <button
 type="submit"
 className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold py-3 transition-colors"
 >
 Save Internal Update
 </button>

 </form>
 </div>

 {/* Timeline Progress */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 border-b pb-3">
 Booking Log Timeline
 </h4>
 
 <div className="space-y-4">
 {selectedBooking.timeline.map((item: any, idx: number) => (
 <div key={idx} className="flex gap-3 text-xs">
 <div className="flex flex-col items-center">
 <span className="h-2 w-2 bg-blue-600 mt-1.5" />
 {idx !== selectedBooking.timeline.length - 1 && <span className="w-0.5 bg-slate-205 dark:bg-[#1a1a1f] flex-grow mt-1" />}
 </div>
 <div>
 <p className="font-bold text-slate-900 dark:text-white">{item.action}</p>
 <p className="text-[10px] text-slate-400 mt-0.5">{item.date}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 </div>

 </div>
 ) : (
 <div className="space-y-6">
 
 {/* Controls list */}
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div className="relative w-full max-w-md">
 <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
 <Search className="h-4 w-4" />
 </span>
 <input
 type="text"
 placeholder="Search bookings by client, service..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] text-xs focus:outline-none"
 />
 </div>
 
 <button className="px-4 py-2 border text-slate-700 dark:text-slate-350 text-xs font-bold hover:border-slate-800 bg-white dark:bg-[#0c0c0e]">
 Export Bookings CSV
 </button>
 </div>

 {/* Bookings Table */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
 <th className="py-4 px-6">Client Name</th>
 <th className="py-4 px-6">Project Request</th>
 <th className="py-4 px-6">Category</th>
 <th className="py-4 px-6">Assigned Advisor</th>
 <th className="py-4 px-6">Deadline</th>
 <th className="py-4 px-6">Budget</th>
 <th className="py-4 px-6">Status</th>
 <th className="py-4 px-6 text-right">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {filteredBookings.map((booking) => (
 <tr key={booking.id} className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors">
 <td className="py-5 px-6 font-bold text-slate-900 dark:text-white">
 {booking.client}
 </td>
 <td className="py-5 px-6 font-semibold">
 {booking.service}
 </td>
 <td className="py-5 px-6">
 <span className="text-[10px] font-extrabold px-2.5 py-1 border border-slate-100 bg-slate-50 text-slate-650 dark:bg-slate-950/20">
 {booking.category}
 </span>
 </td>
 <td className="py-5 px-6 font-bold text-slate-600 dark:text-slate-350">
 {booking.advisor || "Unassigned"}
 </td>
 <td className="py-5 px-6 text-slate-500 font-semibold">
 {booking.date}
 </td>
 <td className="py-5 px-6 font-bold text-slate-900 dark:text-white">
 {booking.budget}
 </td>
 <td className="py-5 px-6">
 <span className={`inline-block px-2.5 py-1 text-[9px] font-extrabold border ${
 booking.status === "Approved" ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20" :
 booking.status === "Pending" ? "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20" :
 booking.status === "Completed" ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20" :
 "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20"
 }`}>
 {booking.status}
 </span>
 </td>
 <td className="py-5 px-6 text-right">
 <button
 onClick={() => handleSelectBooking(booking)}
 className="inline-flex h-8 px-4 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-[11px] font-bold hover:opacity-90 transition-all shadow-sm"
 >
 View Details
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 </div>
 )}

 </div>
 );
}
