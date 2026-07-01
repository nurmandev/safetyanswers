import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border border-slate-200 shadow-xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden">
        
        {/* Abstract 404 background element */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <Image src="/404.jpg" alt="Technical 404 Layout" fill className="object-cover" />
        </div>

        <div className="relative z-10 space-y-3">
          <span className="text-[10px] font-extrabold px-3 py-1 bg-red-50 border border-red-200 text-red-700 uppercase tracking-widest">
            Error Code 404
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">Resource Not Found</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            The page directory or consultancy document you are requesting does not exist, has been archived, or was moved.
          </p>
        </div>

        {/* Directory Search */}
        <div className="relative max-w-md mx-auto z-10">
          <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search our files & articles..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-slate-800 transition-colors"
          />
        </div>

        {/* Navigation triggers */}
        <div className="relative z-10 grid gap-3 sm:grid-cols-2 pt-6 border-t border-slate-100">
          <Link
            href="/"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3.5 transition-colors"
          >
            Return to Home Page
          </Link>
          
          <Link
            href="/services"
            className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold py-3.5 transition-colors"
          >
            Explore Services
          </Link>
        </div>

        <div className="relative z-10 flex justify-center items-center gap-4 text-xs font-semibold text-slate-400">
          <Link href="/blog" className="hover:text-slate-700">Read Blog</Link>
          <span className="h-1.5 w-1.5 bg-slate-200 rounded-full" />
          <Link href="/book" className="hover:text-slate-700">Book Advisor</Link>
        </div>

      </div>
    </main>
  );
}
