import Link from "next/link";
import { AccountLayout } from "@/components/AccountLayout";

const bookings = [
  {
    title: "SPSS Dissertation Methodology Review",
    category: "ACADEMIC",
    consultant: "Dr. Sarah Jenkins",
    date: "Jul 08, 2026",
    time: "10:00 AM - 11:30 AM",
    status: "Confirmed",
    statusColor: "bg-green-50 border-green-200 text-green-700",
  },
  {
    title: "Workplace Risk Assessment Audit Guidance",
    category: "HEALTH & SAFETY",
    consultant: "Marcus Vance",
    date: "Jul 14, 2026",
    time: "02:00 PM - 03:30 PM",
    status: "In Review",
    statusColor: "bg-amber-50 border-amber-200 text-amber-700",
  },
  {
    title: "Postgraduate Statement of Purpose Edit",
    category: "PROFESSIONAL WRITING",
    consultant: "Sarah Jenkins",
    date: "Jul 20, 2026",
    time: "To Be Assigned",
    status: "Pending Assignment",
    statusColor: "bg-slate-50 border-slate-200 text-slate-500",
  },
];

export default function AccountBookingsPage() {
  return (
    <AccountLayout title="Consultation Bookings" currentPath="/account/bookings">
      <div className="bg-white border border-slate-100 shadow-sm flex flex-col min-h-[70vh]">
        
        {/* Bookings Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-955">Active Consultations</h3>
            <p className="text-xs text-slate-400 mt-1">Review schedules and assignment progress for your booked services.</p>
          </div>
          
          <Link
            href="/book"
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 self-start sm:self-center transition-colors"
          >
            Book New Consultation
          </Link>
        </div>

        {/* Bookings Table / List */}
        <div className="flex-grow overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">Consultation Brief</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Assigned Advisor</th>
                <th className="py-4 px-6">Schedule Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {bookings.map((booking) => (
                <tr key={booking.title} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6 font-bold text-slate-900">
                    {booking.title}
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 border border-slate-100 bg-slate-50 text-slate-600">
                      {booking.category}
                    </span>
                  </td>
                  <td className="py-5 px-6 font-semibold text-slate-600">
                    {booking.consultant}
                  </td>
                  <td className="py-5 px-6 text-slate-500">
                    <div>
                      <p className="font-semibold text-slate-800">{booking.date}</p>
                      <p className="text-[10px] mt-0.5">{booking.time}</p>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span className={`inline-block px-2.5 py-1 text-[10px] font-extrabold border ${booking.statusColor}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <Link
                      href="/contact"
                      className="inline-flex h-8 px-4 items-center justify-center border border-slate-200 text-slate-700 hover:border-slate-800 hover:bg-slate-50 text-[11px] font-bold transition-all"
                    >
                      Message
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AccountLayout>
  );
}