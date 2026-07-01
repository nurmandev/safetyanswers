import Link from "next/link";
import { AccountLayout } from "@/components/AccountLayout";

const notifications = [
  {
    id: 1,
    title: "SPSS Data Analysis Draft Ready for Review",
    detail: "Dr. Sarah Jenkins (Academic Advisor) has uploaded the preliminary statistical validation draft for your review. Please examine the SPSS output file.",
    time: "Today, 10:24 AM",
    unread: true,
    category: "ACADEMIC",
    icon: (
      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    actionLabel: "View Deliverables",
    actionHref: "/account/downloads",
  },
  {
    id: 2,
    title: "HSE Compliance Review Scheduled",
    detail: "Marcus Vance (HSE Advisor) has confirmed your Risk Assessment Audit Consultation. The live video coordination is scheduled for July 5th, 2026.",
    time: "Today, 08:15 AM",
    unread: true,
    category: "HEALTH & SAFETY",
    icon: (
      <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    actionLabel: "View Schedule",
    actionHref: "/account/bookings",
  },
  {
    id: 3,
    title: "Secure Invoice Settled - Transaction #73919",
    detail: "We have processed your payment of $120.00 for the SOP editing package. The PDF receipt has been sent to your primary email address.",
    time: "Yesterday, 04:30 PM",
    unread: false,
    category: "BILLING",
    icon: (
      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    actionLabel: "Download Receipt",
    actionHref: "/account/payments",
  },
  {
    id: 4,
    title: "Ivy League SOP Guidelines Added to Library",
    detail: "The premium editorial guide 'Writing a persuasive SOP for international study applications' is now permanently unlocked in your portal library.",
    time: "Jun 25, 2026",
    unread: false,
    category: "LIBRARY",
    icon: (
      <svg className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    actionLabel: "Read Article",
    actionHref: "/account/purchased",
  },
];

export default function AccountNotificationsPage() {
  return (
    <AccountLayout title="Notifications" currentPath="/account/notifications">
      <div className="bg-white border border-slate-100 shadow-sm flex flex-col min-h-[70vh]">
        
        {/* Inbox Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-950">Inbox Messages</h3>
            <p className="text-xs text-slate-400 mt-1">Monitor project deliverables, scheduling notifications, and invoice updates.</p>
          </div>
          
          {/* Quick tab filters */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button className="bg-slate-900 text-white text-xs font-bold px-4 py-2 border border-slate-900 transition-all hover:bg-slate-800">
              All Inbox
            </button>
            <button className="bg-white text-slate-600 text-xs font-bold px-4 py-2 border border-slate-200 transition-all hover:border-slate-800 hover:text-slate-900">
              Unread
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="flex-1 divide-y divide-slate-100">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 transition-colors hover:bg-slate-50/50 ${
                item.unread ? "bg-slate-50/30" : ""
              }`}
            >
              <div className="flex items-start gap-4 flex-1">
                {/* Category Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-50 border border-slate-100">
                  {item.icon}
                </div>
                
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h4>
                    {item.unread && (
                      <span className="h-2 w-2 bg-[#7c3aed] shrink-0" title="Unread Message" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                    {item.detail}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="h-1 w-1 bg-slate-300" />
                    <span className="text-[10px] font-semibold text-slate-400">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons on the Right */}
              <div className="self-end md:self-start shrink-0">
                <Link
                  href={item.actionHref}
                  className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold px-4 py-2 border border-slate-900 transition-colors"
                >
                  {item.actionLabel}
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </AccountLayout>
  );
}