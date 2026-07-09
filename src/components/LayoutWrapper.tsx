"use client";

import { usePathname } from "next/navigation";
import { NotchNavbar } from "@/components/ui/notch-navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/account") || pathname.startsWith("/admin") || pathname === "/book";

  return (
    <>
      {!isPortal && <NotchNavbar />}
      <div className={`flex-1 flex flex-col ${isPortal ? "" : "pt-16"}`}>{children}</div>
      {!isPortal && <Footer />}
      <ScrollToTop />
    </>
  );
}
