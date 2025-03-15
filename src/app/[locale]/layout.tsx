import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Navigation from '../components/Navigation';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen">
        <Navigation locale={locale} />
        <main className="pt-16">
          {children}
        </main>
      </div>
    </NextIntlClientProvider>
  );
} 