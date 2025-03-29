import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that require authentication (without locale prefix)
const PROTECTED_PATHS = [
  '/ai-agents/candidate-mapping',
  // Add other protected paths here
];

// List of paths that should redirect to home if user is already authenticated
const AUTH_PATHS = [
  '/login',
  '/register',
  // Add other auth-related paths here
];

export function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('access_token');

  // Remove locale prefix from pathname for matching
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');

  // Check if the path requires authentication
  const isProtectedPath = PROTECTED_PATHS.some(path => pathWithoutLocale.includes(path));
  
  // Check if the path is an auth-related path
  const isAuthPath = AUTH_PATHS.some(path => pathWithoutLocale.includes(path));

  // Get the locale from the pathname or default to 'en'
  const locale = pathname.match(/^\/[a-z]{2}(?=\/|$)/)?.[0]?.slice(1) || 'en';

  // If trying to access a protected route without authentication
  if (isProtectedPath && !isAuthenticated) {
    // Store the original URL to redirect back after login
    const response = NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    response.cookies.set('redirectTo', pathname, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 5, // 5 minutes
    });
    return response;
  }

  // If trying to access auth pages while already authenticated
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.next();
} 