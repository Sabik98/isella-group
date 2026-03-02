import { getTranslations } from 'next-intl/server';
import CareerPageClient from '@/components/pages/CareerPageClient';

export async function generateMetadata() {
  const t = await getTranslations('career');
  return { title: t('title') };
}

export default function CareerPage() {
  return <CareerPageClient />;
}
