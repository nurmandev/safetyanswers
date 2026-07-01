"use client";

import { AccountLayout } from "@/components/AccountLayout";

const infoFields = [
  { label: "Full Name", value: "Jason Ranti", type: "text" },
  { label: "Email Address", value: "jason.ranti@example.com", type: "email" },
  { label: "Phone Number", value: "+44 20 1234 5678", type: "tel" },
  { label: "WhatsApp Coordination Number", value: "+44 20 1234 5678", type: "tel" },
  { label: "Country of Residence", value: "United Kingdom", type: "text" },
  { label: "Institution / Organization", value: "London School of Economics", type: "text" },
];

export default function AccountProfilePage() {
  return (
    <AccountLayout title="Profile Settings" currentPath="/account/profile">
      <div className="bg-white border border-slate-100 shadow-sm p-8">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-4 mb-8">
          <h3 className="text-lg font-bold text-slate-955">Personal Parameters</h3>
          <p className="text-xs text-slate-400 mt-1">Configure your personal and corporate coordinates for invoice validation and advisor booking assignments.</p>
        </div>

        {/* Profile Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6 max-w-2xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {infoFields.map((field) => (
              <div key={field.label} className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#7c3aed] transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              className="bg-transparent hover:bg-slate-50 text-slate-700 text-xs font-bold px-6 py-3 border border-slate-200 transition-colors"
            >
              Reset Changes
            </button>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 border border-slate-900 transition-colors"
            >
              Update Profile Details
            </button>
          </div>
        </form>

      </div>
    </AccountLayout>
  );
}