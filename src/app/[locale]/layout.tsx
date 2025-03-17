import { notFound } from 'next/navigation';
import LayoutContent from '../components/LayoutContent';

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' }
  ];
}

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

// This component will set the HTML lang attribute
function LocaleHtmlAttributes({ locale }: { locale: string }) {
  // This is a client component that can modify the HTML element
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang = "${locale}";`
      }}
    />
  );
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  const messages = await getMessages(locale);

  return (
    <>
      <LocaleHtmlAttributes locale={locale} />
      <LayoutContent locale={locale} messages={messages}>
        {children}
      </LayoutContent>
    </>
  );
} 