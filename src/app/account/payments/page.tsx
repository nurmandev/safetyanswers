import { AccountLayout } from "@/components/AccountLayout";

const paymentItems = [
  {
    id: "INV-1042",
    amount: "$49.00",
    service: "Premium Editorial SOP Handbook Unlock",
    date: "Jun 24, 2026",
    status: "Success",
  },
  {
    id: "INV-1037",
    amount: "$180.00",
    service: "PhD Thesis Methodology Academic Consultation",
    date: "Jun 14, 2026",
    status: "Success",
  },
  {
    id: "INV-1024",
    amount: "$29.00",
    service: "NEBOSH Safety Compliance Manual Unlock",
    date: "May 30, 2026",
    status: "Success",
  },
];

export default function AccountPaymentsPage() {
  return (
    <AccountLayout title="Billing History" currentPath="/account/payments">
      <div className="bg-white border border-slate-100 shadow-sm flex flex-col min-h-[70vh]">
        <div className="p-4 sm:p-6 border-b border-slate-100">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Transactions & Invoices
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Review locked payment receipts and download invoice declarations
                for accounting purposes.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex h-9 px-3 items-center justify-center border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-bold transition-all">
                Export CSV
              </button>
              <button className="inline-flex h-9 px-3 items-center justify-center bg-[#7c3aed] text-white hover:bg-[#6d28d9] text-[11px] font-bold transition-all">
                Download Receipts
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-4 sm:p-6 border-b border-slate-100 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Total Paid
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900">$258.00</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Last Payment
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900">
              Jun 24, 2026
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Invoice Status
            </p>
            <p className="mt-2 text-xl font-bold text-emerald-600">
              Up to date
            </p>
          </div>
        </div>

        <div className="flex-grow overflow-x-auto">
          <div className="hidden lg:block">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-6">Transaction ID</th>
                  <th className="py-4 px-6">Description</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Processing Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {paymentItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-5 px-6 font-bold text-[#7c3aed]">
                      {item.id}
                    </td>
                    <td className="py-5 px-6 font-semibold text-slate-900">
                      {item.service}
                    </td>
                    <td className="py-5 px-6 text-slate-900 font-bold text-sm">
                      {item.amount}
                    </td>
                    <td className="py-5 px-6 text-slate-500 font-semibold">
                      {item.date}
                    </td>
                    <td className="py-5 px-6">
                      <span className="inline-block px-2.5 py-1 text-[10px] font-extrabold border bg-green-50 border-green-200 text-green-700">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <button className="inline-flex h-8 px-4 items-center justify-center border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-bold transition-all">
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="block lg:hidden p-4 space-y-3">
            {paymentItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      {item.id}
                    </p>
                    <h4 className="mt-1 font-semibold text-slate-900">
                      {item.service}
                    </h4>
                  </div>
                  <span className="inline-block px-2.5 py-1 text-[10px] font-extrabold border bg-green-50 border-green-200 text-green-700">
                    {item.status}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-slate-500 text-xs">Amount</p>
                    <p className="font-bold text-slate-900">{item.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-xs">Date</p>
                    <p className="font-semibold text-slate-700">{item.date}</p>
                  </div>
                </div>
                <button className="mt-4 inline-flex h-9 px-3 items-center justify-center border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-bold transition-all">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
