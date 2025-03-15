'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  locale: string;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Remove the current locale from pathname to get the base path
  const pathnameWithoutLocale = pathname.replace(/^\/[a-zA-Z-]+(?=\/|$)/, '');

  return (
    <div className="flex items-center">
      <Link
        href={`/en${pathnameWithoutLocale}`}
        className={`px-2 py-1 rounded-md transition-colors ${
          locale === 'en'
            ? 'bg-[#7057A0] text-white'
            : 'text-[#7057A0] hover:bg-[#7057A0]/10'
        }`}
      >
        EN
      </Link>
      <span className="text-[#7057A0] mx-1">/</span>
      <Link
        href={`/fr${pathnameWithoutLocale}`}
        className={`px-2 py-1 rounded-md transition-colors ${
          locale === 'fr'
            ? 'bg-[#7057A0] text-white'
            : 'text-[#7057A0] hover:bg-[#7057A0]/10'
        }`}
      >
        FR
      </Link>
    </div>
  );
} 