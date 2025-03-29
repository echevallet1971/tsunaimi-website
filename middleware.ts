import createIntlMiddleware from 'next-intl/middleware';
import { authMiddleware } from './src/middleware/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create the intl middleware
const intlMiddleware = createIntlMiddleware({
  // Configure the supported locales
  locales: ['en', 'fr'],
  
  // Use English as the default locale
  defaultLocale: 'en',

  // Don't automatically redirect the root path - we'll handle that in the root page
  localePrefix: 'as-needed'
});

// Main middleware function
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle login route specially
  if (pathname === '/login') {
    // Get the locale from the accept-language header or default to 'en'
    const acceptLanguage = request.headers.get('accept-language') || '';
    const locale = acceptLanguage.includes('fr') ? 'fr' : 'en';
    
    // Redirect to localized login page
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // First, handle authentication
  const authResponse = authMiddleware(request);
  
  // If auth middleware returned a redirect response, return it immediately
  if (authResponse instanceof NextResponse && authResponse.status !== 200) {
    return authResponse;
  }

  // Then, handle internationalization
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/*)
  // - Static files (*.jpg, *.png, etc)
  // - Next.js specific files (_next/*)
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 