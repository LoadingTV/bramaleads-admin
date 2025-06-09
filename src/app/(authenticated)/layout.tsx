'use client';

import { AuthGuard } from '@/components/AuthGuard';
import Header from '@/components/authenticated/Header';
import Sidebar from '@/components/authenticated/Sidebar';
import Footer from '@/components/public/Footer';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-full min-h-screen">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />
          
          {/* Page content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          
          {/* Footer */}
          <div className="ml-64">
            <Footer />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

// 3. src/middleware.ts - Next.js middleware для защиты роутов
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Защищенные роуты
const protectedRoutes = [
  '/',
  '/leads',
  '/projects',
  '/team',
  '/calendar',
  '/documents',
  '/reports',
  '/analytics',
  '/settings',
  '/help',
  '/profile',
];

// Публичные роуты (доступны без авторизации)
const publicRoutes = [
  '/auth/login',
  '/auth/register',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Проверяем, есть ли refresh token в cookies
  const refreshToken = request.cookies.get('refresh_token');
  const isAuthenticated = !!refreshToken;

  // Если пользователь пытается зайти на публичный роут, но уже авторизован
  if (isAuthenticated && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Если пользователь пытается зайти на защищенный роут без авторизации
  if (!isAuthenticated && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
