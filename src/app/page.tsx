import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default function RootPage() {
  // Default to English
  let locale = 'en';
  
  // Try to get the Accept-Language header
  try {
    const headersList = headers();
    const acceptLanguage = headersList.get('accept-language') || '';
    
    // Check if French is preferred
    if (acceptLanguage.toLowerCase().includes('fr')) {
      locale = 'fr';
    }
  } catch (error) {
    // If there's any error, fall back to English
    console.error('Error detecting language:', error);
  }
  
  // Redirect to the appropriate locale
  redirect(`/${locale}`);
} 