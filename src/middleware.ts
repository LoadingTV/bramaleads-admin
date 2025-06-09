// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

 
const protectedRoutes = [
  '/dashboard',
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
  '/create',  
];

 
const authRoutes = [
  '/auth/login',
  '/auth/register',
];

 
 

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Проверяем, есть ли refresh token в cookies
  const refreshToken = request.cookies.get('refresh_token');
  const isAuthenticated = !!refreshToken;

  // Если пользователь авторизован и пытается зайти на страницы авторизации
  if (isAuthenticated && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

 
  
  // Если пользователь не авторизован и пытается зайти на защищенный роут
  if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
    // Можно сохранить URL для редиректа после логина
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
 
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};