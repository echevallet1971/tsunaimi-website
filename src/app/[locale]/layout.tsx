import { notFound } from 'next/navigation';
import LayoutContent from '../components/LayoutContent';
import { Metadata } from 'next';

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' }
  ];
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: { metadata: Metadata }
): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  return {
    ...parent.metadata,
    title: 'TsunAImi',
    description: messages.home.hero.headline
  };
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { children, params } = props;
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <LayoutContent locale={locale} messages={messages}>
      {children}
    </LayoutContent>
  );
} 