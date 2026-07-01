"use client";

import React, { useState } from "react";
import {
 Search,
 Users,
 CreditCard,
 Calendar,
 Lock,
 History,
 AlertCircle,
 FolderOpen,
 ArrowUpRight,
 ShieldAlert
} from "lucide-react";

// Mock Registered Users
const mockUsers = [
 {
 id: "USR-082",
 name: "Alicia Thompson",
 email: "alicia@example.com",
 role: "Premium Member",
 status: "Active",
 statusColor: "bg-green-50 border-green-200 text-green-700",
 lastLogin: "2026-07-01 10:24 AM",
 country: "United Kingdom",
 articles: ["How to Structure a Dissertation Proposal"],
 bookings: [
 { id: "BK-104", service: "PhD Proposal Review", date: "2026-07-08", status: "Approved" }
 ],
 payments: [
 { id: "INV-1042", amount: "$49.00", status: "Successful", date: "2026-07-01" }
 ]
 },
 {
 id: "USR-081",
 name: "Marcus Reed",
 email: "marcus@example.com",
 role: "Premium Member",
 status: "Active",
 statusColor: "bg-green-50 border-green-200 text-green-700",
 lastLogin: "2026-06-28 08:15 AM",
 country: "United Kingdom",
 articles: ["NEBOSH Essentials for Safety Teams"],
 bookings: [
 { id: "BK-103", service: "NEBOSH Risk Assessment Checklist", date: "2026-07-14", status: "Pending" }
 ],
 payments: [
 { id: "INV-1037", amount: "$1,200.00", status: "Successful", date: "2026-06-28" }
 ]
 },
 {
 id: "USR-079",
 name: "Nadia Yusuf",
 email: "nadia@example.com",
 role: "Standard Member",
 status: "Active",
 statusColor: "bg-green-50 border-green-200 text-green-700",
 lastLogin: "2026-06-25 04:30 PM",
 country: "Malaysia",
 articles: ["Writing a Strong SOP"],
 bookings: [
 { id: "BK-102", service: "Postgraduate SOP Proofreading", date: "2026-07-20", status: "Completed" }
 ],
 payments: [
 { id: "INV-1024", amount: "$29.00", status: "Successful", date: "2026-06-25" }
 ]
 }
];

// Mock Guest Purchases (no user account registration)
const mockGuests = [
 { email: "guest1@example.com", article: "Writing a Strong SOP", date: "2026-06-24", amount: "$19.00", receipt: "REC-9382" },
 { email: "guest2@example.com", article: "NEBOSH Essentials Guide", date: "2026-06-18", amount: "$39.00", receipt: "REC-9310" }
];

export function UserManagement({ tab }: { tab: "users" | "guests" }) {
 const [activeTab, setActiveTab] = useState(tab);
 const [users, setUsers] = useState(mockUsers);
 const [searchQuery, setSearchQuery] = useState("");
 const [selectedUser, setSelectedUser] = useState<any>(null);

 const handleDeactivate = (id: string) => {
 setUsers(prev =>
 prev.map(usr => {
 if (usr.id === id) {
 const nextStatus = usr.status === "Active" ? "Suspended" : "Active";
 const nextColor = nextStatus === "Active" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-750";
 return { ...usr, status: nextStatus, statusColor: nextColor };
 }
 return usr;
 })
 );
 if (selectedUser && selectedUser.id === id) {
 const nextStatus = selectedUser.status === "Active" ? "Suspended" : "Active";
 const nextColor = nextStatus === "Active" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-750";
 setSelectedUser({ ...selectedUser, status: nextStatus, statusColor: nextColor });
 }
 };

 const filteredUsers = users.filter(usr =>
 usr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
 usr.email.toLowerCase().includes(searchQuery.toLowerCase())
 );

 return (
 <div className="space-y-6">
 
 {/* Tabs */}
 {!selectedUser && (
 <div className="flex border-b border-slate-200 dark:border-[#1a1a1f] gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
 {[
 { key: "users", label: "Registered Users", icon: Users },
 { key: "guests", label: "Guest Purchases", icon: CreditCard }
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
 )}

 {selectedUser ? (
 <div className="grid gap-6 lg:grid-cols-12 items-start">
 
 <div className="lg:col-span-12">
 <button
 onClick={() => setSelectedUser(null)}
 className="text-xs font-bold text-slate-400 hover:text-slate-800 flex items-center gap-1.5"
 >
 ← Back to Users Register
 </button>
 </div>

 {/* Left panel: Profile Card */}
 <div className="lg:col-span-4 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm text-center space-y-6">
 <div className="mx-auto flex h-16 w-16 items-center justify-center bg-slate-950 text-white font-mono text-xl font-bold border border-slate-200 dark:border-[#1a1a1f]">
 {selectedUser.name[0]}
 </div>
 
 <div>
 <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">{selectedUser.name}</h4>
 <p className="text-[10px] text-slate-400 mt-0.5">{selectedUser.email}</p>
 </div>

 <div className="space-y-2 border-t border-slate-100 dark:border-[#1a1a1f] pt-4 text-xs text-left">
 <div className="flex justify-between">
 <span className="text-slate-400">Account Type</span>
 <span className="font-bold">{selectedUser.role}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-400">Country</span>
 <span className="font-bold">{selectedUser.country}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-400">Last Session</span>
 <span className="font-bold">{selectedUser.lastLogin}</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-slate-400">Status</span>
 <span className={`inline-block px-2 py-0.5 text-[9px] font-extrabold border ${selectedUser.statusColor}`}>
 {selectedUser.status}
 </span>
 </div>
 </div>

 <div className="pt-4 border-t">
 <button
 onClick={() => handleDeactivate(selectedUser.id)}
 className={`w-full font-bold py-2.5 text-xs transition-colors border ${
 selectedUser.status === "Active"
 ? "border-red-200 hover:bg-red-50 text-red-600 dark:hover:bg-red-950/20"
 : "border-green-200 hover:bg-green-50 text-green-700 dark:hover:bg-green-950/20"
 }`}
 >
 {selectedUser.status === "Active" ? "Suspend Account" : "Activate Account"}
 </button>
 </div>
 </div>

 {/* Right panel: User activity folders */}
 <div className="lg:col-span-8 space-y-6">
 
 {/* Unlocked Articles */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm space-y-3">
 <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b pb-2">
 <Lock className="h-4 w-4" />
 <span>Unlocked Articles Library</span>
 </h5>
 <div className="space-y-2">
 {selectedUser.articles.map((art: string) => (
 <div key={art} className="p-3 bg-slate-50 dark:bg-[#121215] border text-xs font-bold flex justify-between items-center">
 <span>{art}</span>
 <span className="text-[10px] text-green-600 font-extrabold">ACTIVE ACCESS</span>
 </div>
 ))}
 </div>
 </div>

 {/* Bookings */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm space-y-3">
 <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b pb-2">
 <Calendar className="h-4 w-4" />
 <span>Consultation Bookings</span>
 </h5>
 <div className="space-y-2">
 {selectedUser.bookings.map((bk: any) => (
 <div key={bk.id} className="p-3 bg-slate-50 dark:bg-[#121215] border text-xs flex justify-between items-center">
 <div>
 <p className="font-bold text-slate-800 dark:text-slate-200">{bk.service}</p>
 <p className="text-[10px] text-slate-400 mt-0.5">{bk.id} • Scheduled {bk.date}</p>
 </div>
 <span className="text-[9px] font-extrabold bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 dark:bg-blue-950/20">{bk.status}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Payments */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm space-y-3">
 <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b pb-2">
 <CreditCard className="h-4 w-4" />
 <span>Billing Invoices</span>
 </h5>
 <div className="space-y-2">
 {selectedUser.payments.map((pm: any) => (
 <div key={pm.id} className="p-3 bg-slate-50 dark:bg-[#121215] border text-xs flex justify-between items-center">
 <div>
 <p className="font-bold text-slate-800 dark:text-slate-200">Invoice ID: {pm.id}</p>
 <p className="text-[10px] text-slate-400 mt-0.5">Charged {pm.date}</p>
 </div>
 <span className="font-extrabold text-slate-900 dark:text-white">{pm.amount}</span>
 </div>
 ))}
 </div>
 </div>

 </div>

 </div>
 ) : (
 <div className="space-y-6">
 
 {activeTab === "users" && (
 <>
 {/* Controls */}
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div className="relative w-full max-w-md">
 <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
 <Search className="h-4 w-4" />
 </span>
 <input
 type="text"
 placeholder="Search users by name, email..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] text-xs focus:outline-none"
 />
 </div>
 
 <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:opacity-90">
 Invite New User
 </button>
 </div>

 {/* Table */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
 <th className="py-4 px-6">User Name</th>
 <th className="py-4 px-6">Email Address</th>
 <th className="py-4 px-6">Membership Role</th>
 <th className="py-4 px-6">Last Session</th>
 <th className="py-4 px-6">Status</th>
 <th className="py-4 px-6 text-right">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {filteredUsers.map((usr) => (
 <tr key={usr.id} className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors">
 <td className="py-5 px-6 font-bold text-slate-900 dark:text-white">{usr.name}</td>
 <td className="py-5 px-6 font-mono text-[10px] text-slate-500">{usr.email}</td>
 <td className="py-5 px-6 font-semibold">{usr.role}</td>
 <td className="py-5 px-6 text-slate-550 font-medium">{usr.lastLogin}</td>
 <td className="py-5 px-6">
 <span className={`inline-block px-2.5 py-1 text-[9px] font-extrabold border ${usr.statusColor}`}>
 {usr.status}
 </span>
 </td>
 <td className="py-5 px-6 text-right space-x-2">
 <button
 onClick={() => setSelectedUser(usr)}
 className="text-slate-500 hover:text-blue-600 font-bold"
 >
 Edit Profile
 </button>
 <button
 onClick={() => handleDeactivate(usr.id)}
 className="text-slate-400 hover:text-red-500"
 >
 Suspend
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </>
 )}

 {activeTab === "guests" && (
 <>
 {/* Controls */}
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div className="relative w-full max-w-md">
 <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
 <Search className="h-4 w-4" />
 </span>
 <input
 type="text"
 placeholder="Search guest purchases..."
 value={searchQuery}
 className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] text-xs focus:outline-none"
 />
 </div>
 </div>

 {/* Table */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
 <th className="py-4 px-6">Guest Email</th>
 <th className="py-4 px-6">Purchased Premium Asset</th>
 <th className="py-4 px-6">Purchase Sum</th>
 <th className="py-4 px-6">Transaction Date</th>
 <th className="py-4 px-6 text-right">Receipt</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {mockGuests.map((gst, idx) => (
 <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors">
 <td className="py-5 px-6 font-mono text-slate-900 dark:text-white">{gst.email}</td>
 <td className="py-5 px-6 font-bold">{gst.article}</td>
 <td className="py-5 px-6 font-black text-slate-900 dark:text-white">{gst.amount}</td>
 <td className="py-5 px-6 text-slate-500 font-semibold">{gst.date}</td>
 <td className="py-5 px-6 text-right">
 <span className="text-[10px] font-mono text-[#7c3aed] font-bold">{gst.receipt}</span>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </>
 )}

 </div>
 )}

 </div>
 );
}
