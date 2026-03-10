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

          {/* Contact CTA */}
          <div className="text-center">
            <a
              href="mailto:info@isella-group.com"
              className="inline-flex items-center gap-2 bg-isella-orange text-white font-semibold px-8 py-4 rounded-xl hover:bg-isella-orange/90 transition-colors text-lg"
            >
              <Mail className="w-5 h-5" />
              {t('career.apply')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
