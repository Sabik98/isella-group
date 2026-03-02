'use client';

import { useTranslations } from 'next-intl';
import { Briefcase, MapPin, Clock, Mail } from 'lucide-react';

export default function CareerPageClient() {
  const t = useTranslations();

  const jobKeys = ['production', 'sales', 'architect', 'marketing'] as const;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-isella-blue pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('career.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80">
            {t('career.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-12">
            {t('career.description')}
          </p>

          {/* Highlighted Quote */}
          <div className="bg-isella-gray rounded-xl p-8 md:p-10 mb-16">
            <p className="text-xl md:text-2xl font-medium text-isella-blue italic leading-relaxed">
              &ldquo;{t('career.cta')}&rdquo;
            </p>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-8 h-8 text-isella-orange" />
              <h2 className="text-3xl md:text-4xl font-bold text-isella-blue">
                {t('career.positions.title')}
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 mb-10">
              {t('career.positions.description')}
            </p>

            {/* Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobKeys.map((key) => (
                <div
                  key={key}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-isella-blue mb-3">
                    {t(`career.jobs.${key}.title`)}
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 text-isella-orange" />
                      {t(`career.jobs.${key}.location`)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                      <Clock className="w-4 h-4 text-isella-orange" />
                      {t(`career.jobs.${key}.type`)}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">
                    {t(`career.jobs.${key}.description`)}
                  </p>
                  <a
                    href={`mailto:info@isella-group.com?subject=${encodeURIComponent(t(`career.jobs.${key}.title`))}`}
                    className="inline-flex items-center gap-2 text-isella-orange font-semibold text-sm hover:text-isella-orange-dark transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {t('career.apply')}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
