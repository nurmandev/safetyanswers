import Image from "next/image";

export function TrustedBy() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 mb-8">
          Trusted by leading institutions & organizations
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 hover:opacity-60 transition-opacity">
          <Image src="/next.svg" alt="Platform" width={110} height={26} className="h-6 w-auto dark:invert" />
          <Image src="/vercel.svg" alt="Infrastructure" width={110} height={24} className="h-5 w-auto dark:invert" />
          <Image src="/window.svg" alt="Framework" width={28} height={28} className="h-7 w-auto dark:invert" />
          <div className="h-8 w-24 bg-slate-300 dark:bg-slate-700" />
          <div className="h-8 w-20 bg-slate-300 dark:bg-slate-700" />
        </div>
      </div>
    </section>
  );
}
