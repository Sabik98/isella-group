import { getTranslations } from 'next-intl/server';
import PrivacyPageClient from '@/components/pages/PrivacyPageClient';

export async function generateMetadata() {
  const t = await getTranslations('footer');
  return { title: t('privacy') };
}

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
