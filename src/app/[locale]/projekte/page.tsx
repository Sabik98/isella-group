import { getTranslations } from 'next-intl/server';
import ProjectsPageClient from '@/components/pages/ProjectsPageClient';

export async function generateMetadata() {
  const t = await getTranslations('projects');
  return { title: t('title') };
}

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
