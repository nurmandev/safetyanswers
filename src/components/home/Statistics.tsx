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
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl font-extrabold text-white">{count}{suffix}</p>
    </div>
  );
}

const stats = [
  { end: 500, suffix: "+", label: "Projects Completed" },
  { end: 98, suffix: "%", label: "Happy Clients" },
  { end: 250, suffix: "+", label: "Premium Articles" },
  { end: 50, suffix: "+", label: "Professional Consultants" },
  { end: 30, suffix: "+", label: "Countries Served" },
];

export function Statistics() {
  return (
    <section className="bg-slate-950 dark:bg-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
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
