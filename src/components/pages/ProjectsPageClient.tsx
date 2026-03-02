'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectsPageClient() {
  const t = useTranslations();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-isella-blue pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('projects.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80">
            {t('projects.subtitle')}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Berghaus Card */}
            <div className="bg-white shadow-lg rounded-xl border-t-4 border-isella-orange overflow-hidden flex flex-col">
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-isella-blue mb-4">
                  {t('projects.berghaus.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8 flex-1">
                  {t('projects.berghaus.description')}
                </p>
                <a
                  href="https://berghaus.house"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-isella-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-isella-orange-dark transition-colors self-start"
                >
                  {t('projects.berghaus.cta')}
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
