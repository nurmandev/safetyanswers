import { AccountLayout } from "@/components/AccountLayout";

const preferences = [
  {
    title: "Email notifications",
    description: "Receive instant project milestone warnings, invoice confirmations, and messages.",
    status: "Enabled",
  },
  {
    title: "WhatsApp Alerts",
    description: "Receive urgent project milestone highlights and advisor meeting schedules on WhatsApp.",
    status: "Disabled",
  },
  {
    title: "Two-Factor Authentication",
    description: "Secure your locked premium articles and billing history with an extra security verification layer.",
    status: "Enabled",
  },
  {
    title: "Password management",
    description: "Refresh or reset your active portal authentication parameters periodically.",
    status: "Configure",
  },
];

export default function AccountSettingsPage() {
  return (
    <AccountLayout title="Portal Security Options" currentPath="/account/settings">
      <div className="bg-white border border-slate-100 shadow-sm p-8">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-4 mb-8">
          <h3 className="text-lg font-bold text-slate-955">Security & Preferences</h3>
          <p className="text-xs text-slate-400 mt-1">Configure security keys, automated coordination schedules, and email delivery rules.</p>
        </div>

        {/* Settings options list */}
        <div className="space-y-4 max-w-3xl">
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
                  item.status === "Enabled"
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
    </AccountLayout>
  );
}