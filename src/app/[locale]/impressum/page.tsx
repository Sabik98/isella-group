import { getTranslations } from 'next-intl/server';
import ImpressumPageClient from '@/components/pages/ImpressumPageClient';

export async function generateMetadata() {
  const t = await getTranslations('footer');
  return { title: t('impressum') };
}

export default function ImpressumPage() {
  return <ImpressumPageClient />;
}
