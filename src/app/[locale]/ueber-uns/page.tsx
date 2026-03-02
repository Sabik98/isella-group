import { getTranslations } from 'next-intl/server';
import AboutPageClient from '@/components/pages/AboutPageClient';

export async function generateMetadata() {
  const t = await getTranslations('about');
  return { title: t('title') };
}

export default function AboutPage() {
  return <AboutPageClient />;
}
