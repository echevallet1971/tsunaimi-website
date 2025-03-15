import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import LanguageSwitcher from '../components/LanguageSwitcher';

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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen">
            <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-[#E5E7EB]">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="text-[#251C6B] font-bold text-xl">TsunAImi</div>
                <LanguageSwitcher />
              </div>
            </header>
            <main className="pt-16">
              {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 