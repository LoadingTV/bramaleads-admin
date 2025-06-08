// app/layout.tsx
import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Outfit } from "next/font/google";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brama CRM - Modern Business Management",
  description:
    "Brama CRM - comprehensive customer relationship management system for modern businesses. Manage leads, projects, and client relationships efficiently.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${outfit.className} h-full antialiased bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white`}
      >
        <ClientSessionProvider>
          <div className="flex h-full">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main content area */}
            <div className="flex-1 flex flex-col min-h-screen">
              {/* Header */}
              <Header />
              
              {/* Page content */}
              <main className="flex-1 overflow-auto">
                {children}
              </main>
              
         
              <div className="ml-64">
                <Footer />
              </div>
            </div>
          </div>
        </ClientSessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}