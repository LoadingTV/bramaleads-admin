// src/app/layout.tsx
'use client';

import { AuthProvider } from '@/contexts/AuthContext'
 
 
import "./globals.css";
import { Outfit } from "next/font/google";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Публичные роуты (без sidebar)
const publicRoutes = [
  '/',
  '/features',
  '/pricing', 
  '/auth/login',
  '/auth/register',
];

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>{children}</div>;
  }

  // Проверяем публичные роуты
  const isPublicRoute = publicRoutes.includes(pathname) || 
                       pathname.startsWith('/auth/');

  // Публичные страницы (без sidebar)
  if (isPublicRoute) {
    return <div className="min-h-screen">{children}</div>;
  }

  // Приватные страницы (с sidebar и header)
  return (
    <div className="flex h-full">
     
      <div className="flex-1 flex flex-col min-h-screen">
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <div className="ml-64">
         
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Brama CRM - Modern Business Management</title>
        <meta 
          name="description" 
          content="Brama CRM - comprehensive customer relationship management system for modern businesses." 
        />
      </head>
      <body className={`${outfit.className} h-full antialiased bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white overflow-hidden`}>
        <AuthProvider>
          <ClientSessionProvider>
            <LayoutContent>{children}</LayoutContent>
          </ClientSessionProvider>
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}