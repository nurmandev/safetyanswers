import Link from "next/link";
import { AccountLayout } from "@/components/AccountLayout";

const purchasedItems = [
 {
 title: "How to Structure a Dissertation Proposal",
 type: "ACADEMIC MANUAL",
 fileSize: "4.2 MB",
 unlockedDate: "Jul 01, 2026",
 status: "Unlocked",
 },
 {
 title: "NEBOSH Essentials for Modern Safety Teams",
 type: "SAFETY AUDIT HANDBOOK",
 fileSize: "12.8 MB",
 unlockedDate: "Jun 28, 2026",
 status: "Unlocked",
 },
 {
 title: "Writing a Strong SOP for International Study Applications",
 type: "WRITING GUIDE",
 fileSize: "2.1 MB",
 unlockedDate: "Jun 20, 2026",
 status: "Unlocked",
 },
];

export default function AccountPurchasedPage() {
 return (
 <AccountLayout title="Unlocked Library" currentPath="/account/purchased">
 <div className="bg-white border border-slate-100 shadow-sm flex flex-col min-h-[70vh]">
 
 {/* Header */}
 <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h3 className="text-lg font-bold text-slate-955">Purchased Content Library</h3>
 <p className="text-xs text-slate-400 mt-1">Access, read, and download all premium articles and manuals you have unlocked.</p>
 </div>
 
 <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 self-start sm:self-center transition-colors">
 Download Entire Library (.zip)
 </button>
 </div>

 {/* Content Directory List */}
 <div className="flex-grow">
 {/* Desktop table */}
 <div className="hidden lg:block overflow-x-auto">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
 <th className="py-4 px-6">Document Title</th>
 <th className="py-4 px-6">Classification</th>
 <th className="py-4 px-6">File Size</th>
 <th className="py-4 px-6">Unlock Date</th>
 <th className="py-4 px-6">Status</th>
 <th className="py-4 px-6 text-right">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 text-slate-700">
 {purchasedItems.map((item) => (
 <tr key={item.title} className="hover:bg-slate-50/50 transition-colors">
 <td className="py-5 px-6">
 <div className="flex items-center gap-3">
 <div className="flex h-8 w-8 items-center justify-center bg-purple-50 text-[#7c3aed]">
 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
 </svg>
 </div>
 <span className="font-bold text-slate-900">{item.title}</span>
 </div>
 </td>
 <td className="py-5 px-6">
 <span className="text-[10px] font-extrabold px-2.5 py-1 border border-slate-100 bg-slate-50 text-slate-600">
 {item.type}
 </span>
 </td>
 <td className="py-5 px-6 text-slate-500 font-medium">
 {item.fileSize}
 </td>
 <td className="py-5 px-6 text-slate-500 font-semibold">
 {item.unlockedDate}
 </td>
 <td className="py-5 px-6">
 <span className="inline-block px-2.5 py-1 text-[10px] font-extrabold border bg-green-50 border-green-200 text-green-700">
 {item.status}
 </span>
 </td>
 <td className="py-5 px-6 text-right">
 <Link
 href="/premium"
 className="inline-flex h-8 px-4 items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all"
 >
 Read Article
 </Link>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 {/* Mobile cards */}
 <div className="block lg:hidden p-4 space-y-3">
 {purchasedItems.map((item) => (
 <div key={item.title} className=" border border-slate-200 bg-slate-50/60 p-4">
 <div className="flex items-start justify-between gap-3">
 <div className="flex items-center gap-2 min-w-0">
 <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-purple-50 text-[#7c3aed]">
 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
 </svg>
 </div>
 <h4 className="font-bold text-slate-900 text-sm truncate">{item.title}</h4>
 </div>
 <span className="shrink-0 inline-block px-2.5 py-1 text-[10px] font-extrabold border bg-green-50 border-green-200 text-green-700">
 {item.status}
 </span>
 </div>
 <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
 <div>
 <p className="text-slate-400 font-semibold">Type</p>
 <span className="text-[10px] font-extrabold px-2 py-0.5 border border-slate-100 bg-slate-50 text-slate-600">
 {item.type}
 </span>
 </div>
 <div>
 <p className="text-slate-400 font-semibold">Size</p>
 <p className="font-medium text-slate-500">{item.fileSize}</p>
 </div>
 <div>
 <p className="text-slate-400 font-semibold">Unlocked</p>
 <p className="font-semibold text-slate-500">{item.unlockedDate}</p>
 </div>
 </div>
 <div className="mt-3">
 <Link
 href="/premium"
 className="inline-flex h-8 px-4 items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all"
 >
 Read Article
 </Link>
 </div>
 </div>
 ))}
 </div>
 </div>

 </div>
 </AccountLayout>
 );
}