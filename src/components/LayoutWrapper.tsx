"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/account") || pathname.startsWith("/admin") || pathname === "/book";

  return (
    <>
      {!isPortal && <Header />}
      <div className="flex-1 flex flex-col">{children}</div>
      {!isPortal && <Footer />}
      <ScrollToTop />
    </>
  );
}
