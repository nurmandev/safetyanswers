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

const mockPosts: Record<string, {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}> = {
  "how-to-structure-a-dissertation-proposal-with-confidence": {
    title: "How to Structure a Dissertation Proposal with Confidence",
    category: "Academic Support",
    author: "Dr. Sarah Jenkins",
    date: "Jun 24, 2026",
    readTime: "8 min read",
    image: "/business.jpg",
    content: [
      "A dissertation proposal serves as the blueprint for your doctoral research. It details what you intend to study, why it matters, and how you will execute the methodology.",
      "The literature review section is crucial. You must demonstrate a clear gap in existing public scholarship that your thesis intends to validate or solve.",
      "Methodology dictates research soundess. Specify variables, data collection instruments (questionnaires, interviews), and whether you will run SPSS or STATA for quantitative analytics.",
    ],
  },
  "nebosh-essentials-for-modern-workplace-safety": {
    title: "NEBOSH Essentials for Modern Workplace Safety",
    category: "Health & Safety",
    author: "Marcus Vance",
    date: "Jun 18, 2026",
    readTime: "12 min read",
    image: "/employees.jpg",
    content: [
      "Securing workplace safety compliance requires systematic risk auditing. Standardizing accident registries and compliance manuals helps boards mitigate structural liabilities.",
      "Incident checklists should follow NEBOSH standards. Verify exit points, chemical safety sheets, and PPE logs regularly.",
      "HSE coordinators recommend continuous drills. Preparing your teams for external audits is as much about documentation as it is about live training.",
    ],
  },
  "writing-a-persuasive-sop-for-international-study-applications": {
    title: "Writing a Persuasive SOP for International Study Applications",
    category: "Professional Writing",
    author: "Sarah Jenkins",
    date: "Jun 12, 2026",
    readTime: "6 min read",
    image: "/written.jpg",
    content: [
      "Your Statement of Purpose (SOP) is the subjective core of your university admission application. It tells the review board who you are beyond GPA metrics.",
      "Avoid clichés. Focus on your research trajectory, specific advisor works at the target institution, and how their lab aligns with your doctoral goals.",
      "Structure it in five clear blocks: introduction, academic background, career objectives, institution fit, and closing conclusion.",
    ],
  },
};

export default function SingleBlogPage({ params }: { params: { slug: string } }) {
  const post = mockPosts[params.slug] || mockPosts["how-to-structure-a-dissertation-proposal-with-confidence"];

  return (
    <main className="bg-slate-50 min-h-screen">
      
      {/* Blog Article Banner */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="text-xs font-bold text-slate-400 hover:text-slate-800 flex items-center gap-2 mb-6"
          >
            ← Back to Blog Directory
          </Link>
          
          <div className="max-w-4xl space-y-4">
            <span className="text-[10px] font-extrabold px-3 py-1 bg-slate-50 border border-slate-150 text-slate-600 uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
              {post.title}
            </h1>
            
            {/* Meta context */}
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-800">{post.author}</span>
              <span className="h-1.5 w-1.5 bg-slate-300 rounded-full" />
              <span>{post.date}</span>
              <span className="h-1.5 w-1.5 bg-slate-300 rounded-full" />
              <span className="font-medium text-[#7c3aed]">{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content viewport */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Main article text */}
          <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm p-8 sm:p-12 space-y-8">
            <div className="relative h-[340px] w-full border border-slate-100 overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
            
            <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-medium">
              {post.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            
            {/* Disclaimer box */}
            <div className="bg-slate-50 border-l-4 border-blue-900 p-6 text-xs text-slate-600 leading-relaxed font-semibold">
              This publication is written and peer-reviewed by leading academic coordinators. Need custom support with dissertation structures or safety audits? Drop us a line.
            </div>

            {/* Share action buttons */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Share Article</span>
              <div className="flex gap-2">
                {["LinkedIn", "Twitter", "Facebook"].map((media) => (
                  <button
                    key={media}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600 transition-colors"
                  >
                    {media}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar right panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Table of contents */}
            <div className="bg-white border border-slate-200 shadow-sm p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3 mb-4">
                Table of Contents
              </h4>
              <ul className="space-y-3 text-xs font-semibold text-slate-600">
                <li className="hover:text-blue-900 cursor-pointer">1. Executive Summary</li>
                <li className="hover:text-blue-900 cursor-pointer">2. Historical Literature Context</li>
                <li className="hover:text-blue-900 cursor-pointer">3. Methodological Validation Frameworks</li>
                <li className="hover:text-blue-900 cursor-pointer">4. Standard Operating Templates</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-slate-900 text-white p-6 shadow-sm border border-slate-800">
              <h4 className="text-sm font-bold tracking-tight">Need expert methodology review?</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Consult with our PhD writers and HSE specialists directly to prepare audit briefs or proposal datasets.
              </p>
              <Link
                href="/book"
                className="mt-6 block text-center bg-white text-slate-900 px-4 py-2.5 text-xs font-bold hover:bg-slate-100 transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
