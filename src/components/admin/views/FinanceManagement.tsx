"use client";

import React, { useState } from "react";
import {
 Search,
 DollarSign,
 TrendingUp,
 Settings,
 CreditCard,
 CheckCircle,
 XCircle,
 FileText,
 AlertCircle,
 ShieldCheck,
 ToggleLeft,
 ToggleRight
} from "lucide-react";

// Mock Data
const mockTransactions = [
 { id: "INV-1042", client: "Alicia Thompson", scope: "SPSS Template Pack", date: "2026-07-01", amount: "$49.00", status: "Successful", type: "Article" },
 { id: "INV-1037", client: "Marcus Reed", scope: "HSE Consulting Fee", date: "2026-06-28", amount: "$1,200.00", status: "Successful", type: "Service" },
 { id: "INV-1024", client: "Nadia Yusuf", scope: "Writing Workshop Guide", date: "2026-06-25", amount: "$29.00", status: "Failed", type: "Article" }
];

const mockRefunds = [
 { id: "RFD-491", client: "James Sterling", amount: "$800.00", reason: "Service coordination cancelled by client due to timeline shift.", date: "2026-06-23", status: "Pending" }
];

const initialGateways = [
 { id: "stripe", name: "Stripe Gateway", enabled: true, sandbox: false, key: "pk_live_...", webhook: "https://safetyanswers.com/api/webhooks/stripe" },
 { id: "paystack", name: "Paystack Portal", enabled: true, sandbox: true, key: "pk_test_...", webhook: "https://safetyanswers.com/api/webhooks/paystack" },
 { id: "flutterwave", name: "Flutterwave Portal", enabled: false, sandbox: true, key: "pk_test_...", webhook: "https://safetyanswers.com/api/webhooks/flutterwave" },
 { id: "paypal", name: "PayPal Express", enabled: true, sandbox: false, key: "client_id_...", webhook: "https://safetyanswers.com/api/webhooks/paypal" }
];

export function FinanceManagement({ tab }: { tab: "transactions" | "refunds" | "gateways" }) {
 const [activeTab, setActiveTab] = useState(tab);
 const [searchQuery, setSearchQuery] = useState("");
 const [gateways, setGateways] = useState(initialGateways);

 const toggleGateway = (id: string) => {
 setGateways(prev =>
 prev.map(gw => (gw.id === id ? { ...gw, enabled: !gw.enabled } : gw))
 );
 };

 const toggleSandbox = (id: string) => {
 setGateways(prev =>
 prev.map(gw => (gw.id === id ? { ...gw, sandbox: !gw.sandbox } : gw))
 );
 };

 return (
 <div className="space-y-6">
 
 {/* Tabs */}
 <div className="flex border-b border-slate-200 dark:border-[#1a1a1f] gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
 {[
 { key: "transactions", label: "Transactions & Invoices", icon: CreditCard },
 { key: "refunds", label: "Refund Requests", icon: AlertCircle },
 { key: "gateways", label: "Payment Gateways", icon: Settings }
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

 {activeTab === "transactions" && (
 <div className="space-y-6">
 
 {/* Controls */}
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div className="relative w-full max-w-md">
 <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
 <Search className="h-4 w-4" />
 </span>
 <input
 type="text"
 placeholder="Search transactions..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] text-xs focus:outline-none"
 />
 </div>
 
 <button className="px-4 py-2 border text-slate-700 dark:text-slate-350 text-xs font-bold hover:border-slate-800 bg-white dark:bg-[#0c0c0e]">
 Export Ledger CSV
 </button>
 </div>

 {/* Table */}
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 dark:border-[#1a1a1f] bg-slate-50 dark:bg-[#121215] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
 <th className="py-4 px-6">Transaction ID</th>
 <th className="py-4 px-6">Customer</th>
 <th className="py-4 px-6">Purchased Item</th>
 <th className="py-4 px-6">Classification</th>
 <th className="py-4 px-6">Date</th>
 <th className="py-4 px-6">Amount</th>
 <th className="py-4 px-6 text-right">Status</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1f] text-slate-700 dark:text-slate-300">
 {mockTransactions.map((tx) => (
 <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-[#121215]/50 transition-colors">
 <td className="py-5 px-6 font-bold text-[#7c3aed]">{tx.id}</td>
 <td className="py-5 px-6 font-bold text-slate-900 dark:text-white">{tx.client}</td>
 <td className="py-5 px-6 font-semibold">{tx.scope}</td>
 <td className="py-5 px-6">
 <span className="text-[10px] font-extrabold px-2 py-0.5 border border-slate-100 bg-slate-55 text-slate-650 dark:bg-slate-950/20">
 {tx.type}
 </span>
 </td>
 <td className="py-5 px-6 text-slate-500 font-semibold">{tx.date}</td>
 <td className="py-5 px-6 font-bold text-slate-900 dark:text-white text-sm">{tx.amount}</td>
 <td className="py-5 px-6 text-right">
 <span className={`inline-block px-2.5 py-1 text-[9px] font-extrabold border ${
 tx.status === "Successful" ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20" :
 "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20"
 }`}>
 {tx.status}
 </span>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 </div>
 )}

 {activeTab === "refunds" && (
 <div className="space-y-6">
 <div className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] shadow-sm p-6 space-y-4">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Refund Declarations</h4>
 
 {mockRefunds.map((ref) => (
 <div
 key={ref.id}
 className="p-6 bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] space-y-4"
 >
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
 <div>
 <h5 className="text-sm font-bold text-slate-900 dark:text-white">{ref.client}</h5>
 <p className="text-[10px] text-slate-400 mt-0.5">Refund Request ID: {ref.id} • Requested {ref.date}</p>
 </div>
 <span className="text-lg font-black text-red-600 dark:text-red-400">{ref.amount}</span>
 </div>

 <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
 <span className="font-bold text-slate-800 dark:text-slate-100">Reason: </span>
 {ref.reason}
 </p>

 <div className="flex justify-end gap-3 pt-4 border-t">
 <button className="px-4 py-2 border text-slate-700 dark:text-slate-350 text-xs font-bold hover:border-slate-800">
 Decline Refund
 </button>
 <button className="px-4 py-2 bg-red-600 text-white text-xs font-bold hover:opacity-90">
 Approve Refund
 </button>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {activeTab === "gateways" && (
 <div className="grid gap-6 md:grid-cols-2">
 {gateways.map((gw) => (
 <div
 key={gw.id}
 className="bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-[#1a1a1f] p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 transition-colors"
 >
 <div className="space-y-4">
 <div className="flex items-center justify-between border-b pb-4">
 <div>
 <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{gw.name}</h4>
 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">API Integration</span>
 </div>
 <button onClick={() => toggleGateway(gw.id)}>
 {gw.enabled ? <ToggleRight className="h-6 w-6 text-green-600" /> : <ToggleLeft className="h-6 w-6 text-slate-400" />}
 </button>
 </div>

 <div className="space-y-3 text-xs">
 <div className="flex justify-between items-center">
 <span className="font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider text-[9px]">Sandbox Mode</span>
 <button
 onClick={() => toggleSandbox(gw.id)}
 className={`px-3 py-1 border text-[10px] font-bold transition-colors ${
 gw.sandbox 
 ? "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20" 
 : "bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-950/20"
 }`}
 >
 {gw.sandbox ? "Test Mode" : "Live Mode"}
 </button>
 </div>

 <div className="space-y-1">
 <span className="font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider text-[9px]">Secret API Key Mock</span>
 <input
 type="password"
 readOnly
 value={gw.key}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2 text-[11px] font-mono focus:outline-none"
 />
 </div>

 <div className="space-y-1">
 <span className="font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider text-[9px]">Webhook URL Endpoint</span>
 <input
 type="text"
 readOnly
 value={gw.webhook}
 className="w-full bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-[#1a1a1f] px-3 py-2 text-[10px] font-mono focus:outline-none"
 />
 </div>
 </div>
 </div>

 <div className="pt-6 border-t border-slate-100 dark:border-[#1a1a1f] mt-6 flex items-center justify-between">
 <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600">
 <ShieldCheck className="h-4 w-4" />
 <span>Webhook Configured</span>
 </div>
 <button className="px-3.5 py-2 border text-[10px] font-bold hover:border-slate-800">
 Verify Keys
 </button>
 </div>
 </div>
 ))}
 </div>
 )}

 </div>
 );
}
