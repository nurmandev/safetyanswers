import type { Metadata } from "next";
import localFont from "next/font/local";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { AuthProviders } from "@/lib/auth-providers";
import "./globals.css"; const rency = localFont({ src: "../../public/Rency-Regular.woff2", variable: "--font-rency", display: "swap",
}); export const metadata: Metadata = { title: "safetyanswers.com | Academic, Writing & Safety Services", description: "Premium consultancy platform for academic support, professional writing, and health & safety services.",
}; export default function RootLayout({ children,
}: Readonly<{ children: React.ReactNode;
}>) { return (<html lang="en" className={`${rency.variable} h-full antialiased`}><body className="min-h-full flex flex-col bg-slate-50 text-slate-900"><AuthProviders><LayoutWrapper>{children}</LayoutWrapper></AuthProviders></body></html>);
}
