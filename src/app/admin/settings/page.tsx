import { AdminLayout } from "@/components/admin/AdminLayout";

const preferences = [
 {
 title: "Payment Gateways",
 description: "Manage global integrations with Stripe Checkout, PayPal, Flutterwave, and Paystack api keys.",
 status: "Active",
 },
 {
 title: "Email Notifications",
 description: "Configure transactional templates for booking confirmations and unlock notifications.",
 status: "Active",
 },
 {
 title: "Blog Publishing Defaults",
 description: "Define default categories, standard tag taxonomies, and author permissions for draft posts.",
 status: "Configure",
 },
 {
 title: "Premium Article Visibility",
 description: "Determine blurring opacity parameters and teaser paragraph limits for guest visitors.",
 status: "Active",
 },
];

export default function AdminSettingsPage() {
 return (
  <AdminLayout
  title="Preferences"
  currentPath="/admin/settings"
  >
 <div className="bg-white border border-slate-100 shadow-sm p-8">
 
 {/* Header */}
 <div className="border-b border-slate-100 pb-4 mb-8">
 <h3 className="text-lg font-bold text-slate-955">Platform Settings</h3>
 <p className="text-xs text-slate-400 mt-1">Configure global server parameters, SMTP coordinates, and lock validation policies.</p>
 </div>

 {/* Preferences options list */}
 <div className="space-y-4 max-w-4xl">
 {preferences.map((item) => (
 <div
 key={item.title}
 className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-slate-50 border border-slate-150 transition-colors hover:border-slate-350"
 >
 <div>
 <h5 className="text-xs font-bold text-slate-900 leading-snug">
 {item.title}
 </h5>
 <p className="text-[11px] text-slate-500 mt-1 leading-normal max-w-xl">
 {item.description}
 </p>
 </div>
 
 <button
 className={`self-start sm:self-center px-4 py-2 text-[10px] font-bold border transition-colors ${
 item.status === "Active"
 ? "bg-slate-900 border-slate-900 text-white hover:bg-slate-800"
 : "bg-white border-slate-200 text-slate-700 hover:border-slate-800 hover:text-slate-900"
 }`}
 >
 {item.status}
 </button>
 </div>
 ))}
 </div>

 </div>
 </AdminLayout>
 );
}