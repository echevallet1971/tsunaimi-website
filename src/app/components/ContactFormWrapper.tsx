'use client';

import { NextIntlClientProvider } from 'next-intl';
import dynamic from 'next/dynamic';

// Dynamically import ContactForm with no SSR
const ContactForm = dynamic(() => import('./ContactForm'), {
  ssr: false,
  loading: () => null,
});

interface ContactFormWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  messages: any;
}

export default function ContactFormWrapper({ isOpen, onClose, locale, messages }: ContactFormWrapperProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ContactForm isOpen={isOpen} onClose={onClose} locale={locale} />
    </NextIntlClientProvider>
  );
} 