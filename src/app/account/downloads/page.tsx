import { AccountLayout } from "@/components/AccountLayout";

const files = [
  {
    name: "Dissertation Research Proposal Checklist.pdf",
    format: "PDF",
    size: "2.4 MB",
    date: "Jul 01, 2026",
    category: "Academic Support",
  },
  {
    name: "HSE Workplace Safety Risk Assessment Template.xlsx",
    format: "XLSX",
    size: "1.1 MB",
    date: "Jun 28, 2026",
    category: "Health & Safety",
  },
  {
    name: "Postgraduate Statement of Purpose Editorial Guide.docx",
    format: "DOCX",
    size: "820 KB",
    date: "Jun 20, 2026",
    category: "Professional Writing",
  },
];

export default function AccountDownloadsPage() {
  return (
    <AccountLayout title="Downloads" currentPath="/account/downloads">
      <div className="space-y-8">
        
        {/* Upload Zone (As per PRD maximum file size 100 MB, DOCX, PDF, XLSX, PPTX, ZIP) */}
        <div className="bg-white border border-slate-100 shadow-sm p-8">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-lg font-bold text-slate-955">Submit Deliverable Files</h3>
            <p className="text-xs text-slate-400 mt-1">Upload drafts, thesis guidelines, or regulatory checklists directly to your coordinators.</p>
          </div>
          
          <div className="border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center flex flex-col items-center justify-center cursor-pointer hover:border-slate-800 transition-colors">
            <svg className="h-10 w-10 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            <p className="text-xs font-bold text-slate-900">Drag and drop your project draft here, or <span className="text-[#7c3aed] underline">browse local files</span></p>
            <p className="text-[10px] text-slate-400 mt-2 font-medium">Supported formats: PDF, DOCX, XLSX, PPTX, ZIP (Max size: 100 MB)</p>
          </div>
        </div>

        {/* Downloads Directory */}
        <div className="bg-white border border-slate-100 shadow-sm flex flex-col min-h-[50vh]">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-955">Downloadable Deliverables</h3>
            <p className="text-xs text-slate-400 mt-1">Access completed reports, proofread papers, and safety template kits ready for local saving.</p>
          </div>

          {/* Table list */}
          <div className="flex-grow overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-6">File Name</th>
                  <th className="py-4 px-6">Classification</th>
                  <th className="py-4 px-6">Format</th>
                  <th className="py-4 px-6">Size</th>
                  <th className="py-4 px-6">Upload Date</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {files.map((file) => (
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
                      <span className="text-[10px] font-extrabold px-2.5 py-1 border border-slate-100 bg-slate-50 text-slate-600">
                        {file.category}
                      </span>
                    </td>
                    <td className="py-5 px-6 font-bold text-slate-500">
                      {file.format}
                    </td>
                    <td className="py-5 px-6 text-slate-500 font-medium">
                      {file.size}
                    </td>
                    <td className="py-5 px-6 text-slate-500 font-semibold">
                      {file.date}
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

      </div>
    </AccountLayout>
  );
}