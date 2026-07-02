"use client";

import { useEffect, useState, useRef } from "react";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let start = 0;
          const duration = 2000;
          const step = Math.ceil(end / (duration / 16));
          const interval = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(interval); }
            else setCount(start);
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref}>
      <p className="text-4xl sm:text-5xl font-extrabold text-white">{count}{suffix}</p>
    </div>
  );
}

const stats = [
  { end: 500, suffix: "+", label: "Projects Completed" },
  { end: 5000, suffix: "+", label: "Happy Clients" },
  { end: 250, suffix: "+", label: "Premium Articles" },
  { end: 10, suffix: "+", label: "Years of Experience" },
  { end: 30, suffix: "+", label: "Countries Served" },
  { end: 50, suffix: "+", label: "Professional Consultants" },
];

export function Achievements() {
  return (
    <section className="bg-slate-950 dark:bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a78bfa]">Our Achievements</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">By the numbers</h2>
          <p className="mt-4 text-sm text-slate-400">A decade of measurable impact and client trust</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <Counter end={s.end} suffix={s.suffix} />
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
