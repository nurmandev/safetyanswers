const rows = [
  { service: "Academic Consultancy", bestFor: "Students & Researchers", delivery: "5–30 days", revisions: "Unlimited", consultation: "Free initial", fileDelivery: "DOCX, PDF", support: "24/7" },
  { service: "Professional Writing", bestFor: "Professionals & Applicants", delivery: "3–14 days", revisions: "Unlimited", consultation: "Free initial", fileDelivery: "DOCX, PDF", support: "24/7" },
  { service: "Health & Safety", bestFor: "Organizations & HSE Teams", delivery: "5–21 days", revisions: "Unlimited", consultation: "Free initial", fileDelivery: "DOCX, PDF", support: "24/7" },
];

const headers = ["Service", "Best For", "Delivery Time", "Revisions", "Consultation", "File Delivery", "Support"];

export function ServiceComparison() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Comparison</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Compare our services</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Find the right service for your needs</p>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto border border-slate-200 dark:border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                {headers.map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.service} className="border-b border-slate-200 dark:border-slate-800 last:border-0 bg-white dark:bg-slate-950">
                  <td className="px-6 py-5 font-bold text-slate-900 dark:text-white">{r.service}</td>
                  <td className="px-6 py-5 text-slate-600 dark:text-slate-400">{r.bestFor}</td>
                  <td className="px-6 py-5 text-slate-600 dark:text-slate-400">{r.delivery}</td>
                  <td className="px-6 py-5 text-slate-600 dark:text-slate-400">{r.revisions}</td>
                  <td className="px-6 py-5 text-slate-600 dark:text-slate-400">{r.consultation}</td>
                  <td className="px-6 py-5 text-slate-600 dark:text-slate-400">{r.fileDelivery}</td>
                  <td className="px-6 py-5 text-slate-600 dark:text-slate-400">{r.support}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="block lg:hidden space-y-6">
          {rows.map((r) => (
            <div key={r.service} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">{r.service}</h3>
              <dl className="space-y-3">
                {[
                  { label: "Best For", value: r.bestFor },
                  { label: "Delivery Time", value: r.delivery },
                  { label: "Revisions", value: r.revisions },
                  { label: "Consultation", value: r.consultation },
                  { label: "File Delivery", value: r.fileDelivery },
                  { label: "Support", value: r.support },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2 last:border-0 last:pb-0">
                    <dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</dt>
                    <dd className="text-xs font-bold text-slate-900 dark:text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
