'use client';

import { useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import NavigationClient from '../components/NavigationClient';
import MenuPanel from '../components/MenuPanel';
import FooterWrapper from '../components/FooterWrapper';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

function LayoutContent({ locale, messages, children }: { locale: string; messages: any; children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: messages.common.nav.home, href: '/' },
    { 
      name: messages.common.nav.about, 
      href: '#',
      submenu: [
        { name: messages.common.nav.about_submenu.manifesto, href: '/manifesto' },
        { name: messages.common.nav.about_submenu.story, href: '/story' },
        { name: messages.common.nav.about_submenu.team, href: '/team' }
      ]
    },
    { name: messages.common.nav.contact, href: '/contact' }
  ];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NavigationClient 
        locale={locale} 
        navigation={navigation}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />
      <main>
        {children}
      </main>
      <FooterWrapper locale={locale} messages={messages} />
      <MenuPanel 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        navigation={navigation} 
      />
    </NextIntlClientProvider>
  );
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body>
        <LayoutContent locale={locale} messages={messages}>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
} 