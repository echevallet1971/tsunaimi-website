'use client';

import NavigationClient from './NavigationClient';

interface NavigationProps {
  locale: string;
}

export default function Navigation({ locale }: NavigationProps) {
  return <NavigationClient locale={locale} />;
} 