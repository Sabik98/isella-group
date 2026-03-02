'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight, MapPin, Factory } from 'lucide-react';

export default function ProjectsPageClient() {
  const t = useTranslations();

  const brands = [
    {
      key: 'tri2thrive',
      url: 'https://tri2thrive.com',
      color: 'border-green-500',
    },
    {
      key: 'becz',
      url: 'https://becz.eu',
      color: 'border-blue-500',
    },
    {
      key: 'denniscz',
      url: 'https://dennis.cz',
      color: 'border-purple-500',
    },
  ];

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

      {/* Berghaus Featured Section */}
      <section className="py-20 px-4 bg-isella-gray">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Description */}
            <div>
              <div className="h-1 w-16 bg-isella-orange mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-isella-blue mb-6">
                {t('projects.berghaus.title')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                {t('projects.berghaus.description')}
              </p>
              <a
                href="https://berghaus.house"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-isella-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-isella-orange-dark transition-colors"
              >
                {t('projects.berghaus.cta')}
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>

            {/* Right: YouTube Embed */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/vZZXrCmoiKs"
                title="Berghaus Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Other Brands */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-isella-blue mb-12 text-center">
            {t('projects.brands.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <a
                key={brand.key}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white shadow-lg rounded-xl border-t-4 ${brand.color} overflow-hidden flex flex-col p-8 hover:shadow-xl transition-shadow group`}
              >
                <h3 className="text-2xl font-bold text-isella-blue mb-4 flex items-center gap-2">
                  {t(`projects.brands.${brand.key}.title`)}
                  <ArrowUpRight className="w-5 h-5 text-isella-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  {t(`projects.brands.${brand.key}.description`)}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Production Note */}
      <section className="py-16 px-4 bg-isella-gray">
        <div className="max-w-4xl mx-auto text-center">
          <Factory className="w-10 h-10 text-isella-orange mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-isella-blue mb-3">
            {t('projects.production.title')}
          </h3>
          <p className="text-lg text-gray-700 mb-2">
            {t('projects.production.description')}
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-isella-orange" />
            <span>{t('projects.production.address')}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
