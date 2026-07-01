import Link from "next/link";
import Image from "next/image";
import { AccountLayout } from "@/components/AccountLayout";

const progressStats = [
  {
    iconColor: "bg-purple-50 text-purple-600",
    watched: "2/8 milestones",
    title: "Dissertation Review",
    svg: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    iconColor: "bg-pink-50 text-pink-600",
    watched: "3/8 checklists",
    title: "HSE Audit Plan",
    svg: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    iconColor: "bg-blue-50 text-blue-600",
    watched: "6/12 drafts",
    title: "SOP & CV Prep",
    svg: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
    ),
  },
];

const courseCards = [
  {
    image: "/business.jpg",
    tag: "ACADEMIC",
    tagColor: "bg-blue-50 text-blue-600 border-blue-100",
    title: "PhD Research Proposal Methodology & Data Analysis Framework",
    mentor: "Dr. Jenkins (Academic)",
    mentorLetter: "J",
  },
  {
    image: "/employees.jpg",
    tag: "HEALTH & SAFETY",
    tagColor: "bg-purple-50 text-[#7c3aed] border-purple-100",
    title: "NEBOSH Risk Assessment Compliance & HSE Reporting Guides",
    mentor: "Marcus Vance (HSE)",
    mentorLetter: "M",
  },
  {
    image: "/written.jpg",
    tag: "WRITING",
    tagColor: "bg-pink-50 text-pink-600 border-pink-100",
    title: "Persuasive SOP Formatting for Postgraduate Ivy League Applications",
    mentor: "Sarah Jenkins (Editor)",
    mentorLetter: "S",
  },
];

const lessons = [
  {
    mentor: "Dr. Jenkins",
    mentorLetter: "J",
    date: "Jul 01, 2026",
    type: "ACADEMIC",
    typeColor: "bg-blue-50 text-blue-600",
    desc: "SPSS Statistical Validation Analysis Review",
  },
];

const mentors = [
  { name: "Dr. Sarah Jenkins", role: "Academic Advisor", letter: "J" },
  { name: "Marcus Vance", role: "HSE Specialist", letter: "M" },
  { name: "Sarah Jenkins", role: "Lead Editor", letter: "S" },
];

export default function AccountPage() {
  return (
    <AccountLayout currentPath="/account">
      
      {/* 2-Column Responsive Dashboard Layout */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        
        {/* Middle Column (Consultancy Projects Panel) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Promo Card Banner */}
          <div className="relative bg-[#7c3aed] text-white p-8 sm:p-10 overflow-hidden flex flex-col justify-between min-h-[220px] shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#5b21b6]" />
            {/* Sparkle details SVG */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none hidden md:block">
              <svg className="h-40 w-40 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8" d="M12 3v18m9-9H3m14.25 5.25L6.75 6.75m10.5-10.5L6.75 17.25" />
              </svg>
            </div>
            
            <div className="relative z-10 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-200">
                CONSULTANCY ENGAGEMENT
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight max-w-md leading-snug">
                Elevate Your Research Standards & HSE Workplace Safety
              </h3>
            </div>
            
            <Link href="/book" className="relative z-10 mt-6 bg-black text-white hover:bg-slate-900 transition-all px-6 py-3 flex items-center gap-2 self-start text-xs font-bold shadow-md">
              <span>Book Consultation</span>
              <span className="flex h-5 w-5 items-center justify-center bg-white text-black font-extrabold text-xs">
                →
              </span>
            </Link>
          </div>

          {/* Progress Row Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            {progressStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 p-5 shadow-sm flex items-center justify-between hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center ${stat.iconColor}`}>
                    {stat.svg}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400">{stat.watched}</p>
                    <p className="text-sm font-bold text-slate-800">{stat.title}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* "Active Research & Audits" list */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-base font-bold text-slate-955">Active Research & Audits</h4>
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-slate-700 transition-all">
                  ←
                </button>
                <button className="flex h-8 w-8 items-center justify-center bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-all">
                  →
                </button>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {courseCards.map((card, i) => (
                <div
                  key={i}
                  className="group bg-white border border-slate-100 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image src={card.image} alt={card.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center bg-white/85 text-slate-700 hover:text-red-500 hover:bg-white shadow-sm transition-colors">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className={`inline-block px-2.5 py-1 text-[9px] font-extrabold border uppercase tracking-wider ${card.tagColor}`}>
                        {card.tag}
                      </span>
                      <h5 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 hover:text-[#7c3aed] transition-colors cursor-pointer">
                        {card.title}
                      </h5>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-50 flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center bg-[#f1f5f9] text-slate-800 text-[10px] font-bold">
                        {card.mentorLetter}
                      </div>
                      <div className="truncate">
                        <p className="text-[10px] font-bold text-slate-800 truncate">{card.mentor}</p>
                        <p className="text-[9px] text-slate-400 font-medium">Consultant</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* "Your Deliverables" table section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-slate-955">Active Project Milestone</h4>
              <Link href="/account/bookings" className="text-xs font-bold text-[#7c3aed] hover:underline">
                See all
              </Link>
            </div>

            <div className="bg-white border border-slate-100 overflow-hidden shadow-sm p-4">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3 px-3">Consultant</th>
                    <th className="pb-3 px-3">Service</th>
                    <th className="pb-3 px-3">Desc</th>
                    <th className="pb-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-700">
                  {lessons.map((les, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-orange-100 text-orange-700 text-[10px] font-bold">
                            {les.mentorLetter}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 leading-tight">{les.mentor}</p>
                            <p className="text-[10px] text-slate-400 font-semibold">{les.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-3">
                        <span className={`inline-block px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider ${les.typeColor}`}>
                          {les.type}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-slate-700 font-bold max-w-[200px] truncate">
                        {les.desc}
                      </td>
                      <td className="py-4 px-3 text-right">
                        <button className="inline-flex h-7 w-7 items-center justify-center border border-slate-100 hover:border-slate-800 hover:bg-slate-900 hover:text-white transition-all">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column (Stats and Consultants Sidebar) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Statistics Card */}
          <div className="bg-white border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-base font-bold text-slate-950">Milestone Progress</h4>
              <button className="text-slate-400 hover:text-slate-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
              </button>
            </div>

            {/* Circular Progress Circle */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative h-28 w-28 mb-6 flex items-center justify-center">
                {/* Circular ring */}
                <svg className="absolute inset-0 h-full w-full transform -rotate-95" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#7c3aed]"
                    strokeDasharray="32, 100"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                {/* Center avatar */}
                <div className="flex h-20 w-20 items-center justify-center bg-slate-900 text-white font-bold font-mono border-4 border-white shadow-md relative">
                  JR
                  <span className="absolute -top-1 -right-1 bg-[#7c3aed] text-white text-[9px] font-extrabold px-1.5 py-0.5 border border-white">
                    32%
                  </span>
                </div>
              </div>
              
              <h5 className="text-sm font-extrabold text-slate-800 leading-snug">
                Good Morning Jason 🔥
              </h5>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px] leading-relaxed">
                Continue your project reviews to achieve your target!
              </p>
            </div>

            {/* Bar Chart Activity Section */}
            <div className="mt-8 border-t border-slate-50 pt-6">
              <div className="flex items-end justify-around h-24 pb-2">
                {[
                  { label: "1-10 Aug", height: "h-[45%]" },
                  { label: "11-20 Aug", height: "h-[65%]" },
                  { label: "21-30 Aug", height: "h-[90%]" },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-16">
                    <div className="w-8 bg-slate-100 h-20 relative overflow-hidden flex items-end">
                      <div className={`w-full bg-[#7c3aed] ${bar.height} transition-all duration-500`} />
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 tracking-tight">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Your Consultants Card */}
          <div className="bg-white border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-base font-bold text-slate-955">Your advisors</h4>
              <button className="flex h-8 w-8 items-center justify-center bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {mentors.map((men) => (
                <div key={men.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center bg-[#f1f5f9] text-slate-700 font-bold text-xs">
                      {men.letter}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{men.name}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{men.role}</p>
                    </div>
                  </div>
                  
                  <Link href="/contact" className="flex items-center gap-1 bg-slate-50 hover:bg-[#7c3aed] hover:text-white transition-all text-[10px] font-extrabold text-slate-700 px-3 py-1.5 border border-slate-100">
                    <span>Contact</span>
                  </Link>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 bg-[#f5f3ff] hover:bg-[#ede9fe] text-[#7c3aed] text-xs font-extrabold py-3.5 transition-all">
              See All
            </button>
          </div>

        </div>

      </div>
    </AccountLayout>
  );
}