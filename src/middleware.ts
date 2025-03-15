import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr'],
  
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',

  // Automatically detect user's language preference
  localeDetection: true
});

// Combine with existing middleware
export function middleware(request: NextRequest) {
  // Handle internationalization
  const response = intlMiddleware(request);

  // Add the headers
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  return response
}

// Match all pathnames except for
// - API routes
// - static files
// - _next files
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
} 