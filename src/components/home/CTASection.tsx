import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Ready to start your project?</h2>
        <p className="mt-4 text-lg text-purple-200 max-w-2xl mx-auto">Book a free consultation with our expert team and let us help you achieve your academic or professional goals.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/book" className="bg-white text-[#7c3aed] px-8 py-4 text-sm font-bold hover:bg-purple-50 transition-all shadow-xl">Book Your Consultation</Link>
          <Link href="/contact" className="border-2 border-white/30 text-white px-8 py-4 text-sm font-bold hover:bg-white/10 transition-all">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
