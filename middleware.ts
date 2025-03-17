import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Configure the supported locales
  locales: ['en', 'fr'],
  
  // Use English as the default locale
  defaultLocale: 'en',

  // Don't automatically redirect the root path - we'll handle that in the root page
  localePrefix: 'as-needed'
});

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/*)
  // - Static files (*.jpg, *.png, etc)
  // - Next.js specific files (_next/*)
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 