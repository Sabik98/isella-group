'use client';

import { useTranslations } from 'next-intl';

export default function AboutPageClient() {
  const t = useTranslations();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-isella-blue pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            {t('about.story')}
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-isella-gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-isella-blue mb-8">
            {t('about.team.title')}
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            {t('about.team.description')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-isella-orange pl-8">
            <h2 className="text-3xl md:text-4xl font-bold text-isella-blue mb-6">
              {t('about.mission.title')}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              {t('about.mission.description')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
