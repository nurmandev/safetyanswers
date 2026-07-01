import Link from "next/link";

const resources = [
  {
    name: "Dissertation Research Proposal Checklist",
    category: "Academic Support",
    format: "PDF",
    size: "2.4 MB",
    downloads: "1,240",
  },
  {
    name: "HSE Workplace Safety Risk Assessment Template",
    category: "Health & Safety",
    format: "XLSX",
    size: "1.1 MB",
    downloads: "940",
  },
  {
    name: "Postgraduate Statement of Purpose Editorial Guide",
    category: "Professional Writing",
    format: "DOCX",
    size: "820 KB",
    downloads: "2,110",
  },
  {
    name: "NEBOSH Safety Compliance Incident Form",
    category: "Health & Safety",
    format: "PDF",
    size: "3.2 MB",
    downloads: "640",
  },
  {
    name: "SPSS Data Coding & Variable Description Template",
    category: "Academic Support",
    format: "XLSX",
    size: "520 KB",
    downloads: "420",
  },
  {
    name: "Grant Application Proposal Standard Worksheet",
    category: "Professional Writing",
    format: "DOCX",
    size: "1.5 MB",
    downloads: "310",
  },
];

export default function ResourcesPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-800">
              Open Access Library
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Free Research & Safety Resources.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Download structural checklists, incident report forms, and dissertation blueprints compiled by our coordinators to jumpstart your deliverables.
            </p>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search guides, templates, and spreadsheets..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 text-xs text-slate-700 shadow-sm focus:outline-none focus:border-blue-900"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {["All Types", "Academic Support", "Health & Safety", "Professional Writing"].map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2.5 text-xs font-bold border transition-colors ${
                  i === 0
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-800 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Table */}
        <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-6">Resource Name</th>
                  <th className="py-4 px-6">Classification</th>
                  <th className="py-4 px-6">Format</th>
                  <th className="py-4 px-6">Size</th>
                  <th className="py-4 px-6">Downloads</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-250 text-slate-700">
                {resources.map((file) => (
                  <tr key={file.name} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center bg-slate-50 border border-slate-100 text-slate-500">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                        <span className="font-bold text-slate-900">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-[10px] font-extrabold px-2.5 py-1 border border-slate-150 bg-slate-50 text-slate-600">
                        {file.category}
                      </span>
                    </td>
                    <td className="py-5 px-6 font-bold text-slate-500">
                      {file.format}
                    </td>
                    <td className="py-5 px-6 text-slate-500 font-medium">
                      {file.size}
                    </td>
                    <td className="py-5 px-6 text-slate-400 font-semibold">
                      {file.downloads}
                    </td>
                    <td className="py-5 px-6 text-right">
                      <button className="inline-flex h-8 px-4 items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* CTA Footer Section */}
      <section className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-xl">
          <h3 className="text-2xl font-bold tracking-tight">Need custom methodology templates?</h3>
          <p className="mt-3 text-sm text-slate-450 leading-relaxed">
            Our advisors build custom-fit risk audit frameworks and SPSS variables schemas based on your target project boundaries.
          </p>
          <div className="mt-6">
            <Link
              href="/book"
              className="inline-block bg-white text-slate-900 px-6 py-3 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              Order Custom Template Pack
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
