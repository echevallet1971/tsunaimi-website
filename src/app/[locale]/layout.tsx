import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import NavigationClient from '../components/NavigationClient';
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

export default async function LocaleLayout({
  children,
  params: { locale }
}: LocaleLayoutProps) {
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NavigationClient locale={locale} />
      <main>
        {children}
      </main>
      <FooterWrapper locale={locale} messages={messages} />
    </NextIntlClientProvider>
  );
} 