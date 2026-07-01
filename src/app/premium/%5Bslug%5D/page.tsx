import Link from "next/link";
import Image from "next/image";

// Static parameters for Next.js build prerendering
export async function generateStaticParams() {
  return [
    { slug: "how-to-structure-a-dissertation-proposal-with-confidence" },
    { slug: "nebosh-essentials-for-modern-workplace-safety" },
    { slug: "writing-a-persuasive-sop-for-international-study-applications" },
  ];
}

const mockArticles: Record<string, {
  title: string;
  category: string;
  price: string;
  teaser: string;
  blurText: string;
}> = {
  "how-to-structure-a-dissertation-proposal-with-confidence": {
    title: "How to Structure a Dissertation Proposal with Confidence",
    category: "Academic Support",
    price: "$29.00",
    teaser: "The structural outline of your dissertation proposal determines if the university board greenlights your funding. This guide details how to frame literature reviews and SPSS stats schemas...",
    blurText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar sem id dolor luctus, nec convallis elit congue. Sed sit amet erat at ante dignissim congue. Vivamus ut lorem pulvinar, viverra tortor non, condimentum magna.",
  },
  "nebosh-essentials-for-modern-workplace-safety": {
    title: "NEBOSH Essentials for Modern Workplace Safety",
    category: "Health & Safety",
    price: "$39.00",
    teaser: "A full-scale safety audit breakdown based on international HSE standards. Acquire checklist sheets, risk assessment schemas, and audit logs...",
    blurText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar sem id dolor luctus, nec convallis elit congue. Sed sit amet erat at ante dignissim congue. Vivamus ut lorem pulvinar, viverra tortor non, condimentum magna.",
  },
  "writing-a-persuasive-sop-for-international-study-applications": {
    title: "Writing a Persuasive SOP for International Study Applications",
    category: "Professional Writing",
    price: "$19.00",
    teaser: "A premium workbook detailing Ivy League personal statement structuring. Includes before/after sample SOPs that secured entry into economics and health faculties...",
    blurText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar sem id dolor luctus, nec convallis elit congue. Sed sit amet erat at ante dignissim congue. Vivamus ut lorem pulvinar, viverra tortor non, condimentum magna.",
  },
};

export default function PremiumArticlePage({ params }: { params: { slug: string } }) {
  const art = mockArticles[params.slug] || mockArticles["how-to-structure-a-dissertation-proposal-with-confidence"];

  return (
    <main className="bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/premium"
            className="text-xs font-bold text-slate-400 hover:text-slate-800 flex items-center gap-2 mb-6"
          >
            ← Back to Premium Library
          </Link>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-extrabold px-3 py-1 bg-purple-50 border border-purple-100 text-purple-700 uppercase tracking-wider">
                {art.category}
              </span>
              <span className="text-[10px] font-extrabold px-3 py-1 bg-green-50 border border-green-150 text-green-700 uppercase tracking-wider">
                PREMIUM LOCKED
              </span>
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
              {art.title}
            </h1>
            
            <p className="text-sm font-extrabold text-slate-900 pt-2">
              Resource Cost: <span className="text-lg text-[#7c3aed]">{art.price}</span> (One-time secure payment)
            </p>
          </div>
        </div>
      </section>

      {/* Main Page Columns */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Teaser content card */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Free Teaser */}
            <div className="bg-white border border-slate-200 p-8 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Guide Preview</h4>
              <p className="text-sm leading-relaxed text-slate-650 font-medium">
                {art.teaser}
              </p>
            </div>

            {/* Locked Content Card */}
            <div className="bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 select-none">Locked Content</h4>
              
              {/* Blurred text block mock */}
              <div className="space-y-4 select-none blur-sm opacity-20 filter pointer-events-none">
                <p className="text-sm leading-relaxed text-slate-700">{art.blurText}</p>
                <p className="text-sm leading-relaxed text-slate-700">{art.blurText}</p>
                <p className="text-sm leading-relaxed text-slate-700">{art.blurText}</p>
              </div>

              {/* Locked overlay text (as specified in PRD Section 5) */}
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center bg-purple-50 text-[#7c3aed] mb-4 border border-purple-100">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                
                <h4 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">This is Premium Content</h4>
                <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed">
                  Unlock this article by making payment. Once unlocked, the full material and PDF download sheets appear instantly.
                </p>

                <Link
                  href="/checkout"
                  className="mt-6 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-bold px-8 py-3.5 shadow-md shadow-purple-100 transition-colors"
                >
                  Purchase Document - {art.price}
                </Link>
              </div>

            </div>

          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Purchase benefits */}
            <div className="bg-white border border-slate-200 p-6 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3 mb-4">
                What's Included
              </h4>
              
              <ul className="space-y-3 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Full lifetime portal reading access
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Printable offline PDF document sheets
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Custom spreadsheets templates download
                </li>
              </ul>
            </div>

            {/* General FAQs */}
            <div className="bg-white border border-slate-200 p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
                Purchase FAQs
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="font-bold text-slate-800">Is my transaction secure?</p>
                  <p className="text-slate-500 mt-1 leading-relaxed">Yes, all checkouts are processed through Stripe/PayPal 256-Bit SSL channels.</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800">Can I access it in the future?</p>
                  <p className="text-slate-500 mt-1 leading-relaxed">Yes, unlocked resources are permanently linked to your profile dashboard library.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
