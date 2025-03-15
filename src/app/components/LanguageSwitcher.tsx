'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('common');

  return (
    <div className="flex items-center space-x-2">
      <Link
        href={`/en${pathname}`}
        className={`px-2 py-1 rounded-md transition-colors ${
          locale === 'en'
            ? 'bg-[#7057A0] text-white'
            : 'text-[#7057A0] hover:bg-[#7057A0]/10'
        }`}
      >
        EN
      </Link>
      <Link
        href={`/fr${pathname}`}
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