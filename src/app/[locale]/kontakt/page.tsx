import { getTranslations } from 'next-intl/server';
import ContactPageClient from '@/components/pages/ContactPageClient';

export async function generateMetadata() {
  const t = await getTranslations('contact');
  return { title: t('title') };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
