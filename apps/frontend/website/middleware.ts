import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Main middleware function
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect legacy locale routes to the single landing page.
  if (
    pathname === '/en' ||
    pathname.startsWith('/en/') ||
    pathname === '/fr' ||
    pathname.startsWith('/fr/')
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl, 308);
  }

  // Continue with the request
  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/*)
  // - Next.js specific files (_next/*)
  matcher: ['/((?!api|_next).*)']
}; 