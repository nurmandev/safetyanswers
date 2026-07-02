import Link from "next/link";

interface PriceRow {
  service: string;
  price: string;
  delivery: string;
  revisions: string;
}

const academicRows: PriceRow[] = [
  { service: "Undergraduate Projects", price: "$49", delivery: "7–14 days", revisions: "1 round" },
  { service: "Master's Thesis", price: "$199", delivery: "14–30 days", revisions: "Unlimited" },
  { service: "PhD Proposal", price: "$149", delivery: "7–14 days", revisions: "Unlimited" },
  { service: "Dissertation Writing", price: "$299", delivery: "14–30 days", revisions: "Unlimited" },
  { service: "Literature Review", price: "$99", delivery: "5–10 days", revisions: "2 rounds" },
  { service: "Research Methodology", price: "$89", delivery: "5–10 days", revisions: "2 rounds" },
  { service: "SPSS Analysis", price: "$79", delivery: "3–7 days", revisions: "2 rounds" },
  { service: "STATA Analysis", price: "$89", delivery: "3–7 days", revisions: "2 rounds" },
  { service: "Excel Analysis", price: "$59", delivery: "2–5 days", revisions: "1 round" },
  { service: "Questionnaire Design", price: "$49", delivery: "3–5 days", revisions: "1 round" },
  { service: "Referencing", price: "$39", delivery: "1–3 days", revisions: "1 round" },
  { service: "Proofreading", price: "$49", delivery: "2–4 days", revisions: "1 round" },
  { service: "Editing", price: "$69", delivery: "3–7 days", revisions: "2 rounds" },
  { service: "Turnitin Reduction", price: "$49", delivery: "2–5 days", revisions: "1 round" },
];

const writingRows: PriceRow[] = [
  { service: "CV Writing", price: "$59", delivery: "3–5 days", revisions: "2 rounds" },
  { service: "Statement of Purpose", price: "$89", delivery: "5–7 days", revisions: "2 rounds" },
  { service: "Personal Statement", price: "$79", delivery: "5–7 days", revisions: "2 rounds" },
  { service: "Business Proposal", price: "$149", delivery: "7–10 days", revisions: "Unlimited" },
  { service: "Business Plan", price: "$249", delivery: "10–21 days", revisions: "Unlimited" },
  { service: "Grant Proposal", price: "$199", delivery: "7–14 days", revisions: "Unlimited" },
  { service: "Technical Report", price: "$129", delivery: "5–10 days", revisions: "2 rounds" },
];

const safetyRows: PriceRow[] = [
  { service: "NEBOSH Support", price: "$99", delivery: "5–10 days", revisions: "2 rounds" },
  { service: "Risk Assessment", price: "$149", delivery: "5–10 days", revisions: "2 rounds" },
  { service: "HSE Documentation", price: "$199", delivery: "7–14 days", revisions: "Unlimited" },
  { service: "Compliance Audits", price: "$249", delivery: "7–14 days", revisions: "Unlimited" },
  { service: "Workplace Safety Training", price: "$179", delivery: "5–10 days", revisions: "2 rounds" },
  { service: "Safety Management Systems", price: "$299", delivery: "10–21 days", revisions: "Unlimited" },
  { service: "Emergency Response Planning", price: "$149", delivery: "5–10 days", revisions: "2 rounds" },
];

function PriceTable({ id, title, rows }: { id: string; title: string; rows: PriceRow[] }) {
  return (
    <div id={id} className="scroll-mt-20">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{title}</h3>
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">Service</th>
              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">Starting Price</th>
              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">Delivery</th>
              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">Revisions</th>
              <th className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-700" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.service} className="border-b border-slate-100 dark:border-slate-800 last:border-0 bg-white dark:bg-slate-950">
                <td className="px-5 py-4 font-bold text-slate-900 dark:text-white text-xs">{r.service}</td>
                <td className="px-5 py-4 text-xs font-bold text-[#7c3aed] dark:text-[#a78bfa]">{r.price}</td>
                <td className="px-5 py-4 text-xs text-slate-500 dark:text-slate-400">{r.delivery}</td>
                <td className="px-5 py-4 text-xs text-slate-500 dark:text-slate-400">{r.revisions}</td>
                <td className="px-5 py-4">
                  <Link href="/book" className="text-[10px] font-bold text-[#7c3aed] dark:text-[#a78bfa] hover:underline">Book Now</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PricingTables() {
  return (
    <section className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa]">Service Pricing</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Services & starting prices</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Transparent pricing for every service. Final quote confirmed after project review.</p>
        </div>

        <div className="space-y-16">
          <PriceTable id="academic" title="Academic Consultancy" rows={academicRows} />
          <PriceTable id="writing" title="Professional Writing" rows={writingRows} />
          <PriceTable id="safety" title="Health & Safety Consultancy" rows={safetyRows} />
        </div>
      </div>
    </section>
  );
}
