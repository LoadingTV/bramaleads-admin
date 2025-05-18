// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { Outfit } from "next/font/google";
import UserSession from "@/components/UserSession";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Remodeling & Construction All Bay Area - ABADUB",
  description:
    "ABADUB contractor specializes in bringing your home improvement dreams to life. From house remodeling to kitchen renovations, our experienced team provides craftsmanship throughout all Bay Area, San Francisco.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${outfit.className} bg-lightBg text-lightText dark:bg-blackBg dark:text-darkText`}
      >

        <ClientSessionProvider>
          <Header />
          <UserSession />
          {children}
          <div className="flex items-center justify-center w-full">
          </div>
          <Footer />
        </ClientSessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
