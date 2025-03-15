import {getRequestConfig} from 'next-intl/server';

// Define supported locales and default locale
const defaultLocale = 'en';
const locales = ['en', 'fr'];

export default getRequestConfig(async ({locale}) => {
  // Use provided locale or fall back to default
  const resolvedLocale = locale || defaultLocale;
  
  // Validate that the locale is supported
  if (!locales.includes(resolvedLocale)) {
    throw new Error(`Locale ${resolvedLocale} is not supported`);
  }
  
  return {
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
    locale: resolvedLocale
  };
}); 