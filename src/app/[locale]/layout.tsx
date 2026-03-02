import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Montserrat } from 'next/font/google';
import { locales, type Locale } from '@/i18n/config';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    de: 'Isella Group - Internationale Agentur für innovative Geschäftsprojekte',
    en: 'Isella Group - International Agency for Innovative Business Projects',
    pl: 'Isella Group - Międzynarodowa agencja innowacyjnych projektów biznesowych',
  };

  const descriptions: Record<string, string> = {
    de: 'Isella Group entwickelt innovative Geschäftsprojekte auf internationalen Märkten. Marketing, Vertrieb, Projektmanagement und Bauwesen.',
    en: 'Isella Group develops innovative business projects in international markets. Marketing, sales, project management, and construction.',
    pl: 'Isella Group rozwija innowacyjne projekty biznesowe na rynkach międzynarodowych. Marketing, sprzedaż, zarządzanie projektami i budownictwo.',
  };

  return {
    title: {
      default: titles[locale] || titles.de,
      template: `%s | Isella Group`,
    },
    description: descriptions[locale] || descriptions.de,
    metadataBase: new URL('https://isella-group.com'),
    alternates: {
      canonical: '/',
      languages: {
        de: '/de',
        en: '/en',
        pl: '/pl',
      },
    },
    openGraph: {
      title: titles[locale] || titles.de,
      description: descriptions[locale] || descriptions.de,
      url: 'https://isella-group.com',
      siteName: 'Isella Group',
      locale: locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={montserrat.variable}>
      <body className={`${montserrat.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
