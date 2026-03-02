'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPageClient() {
  const t = useTranslations();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-isella-blue pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Email & Phone CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {/* Email Button */}
            <a
              href="mailto:info@isella-group.com"
              className="inline-flex items-center gap-3 bg-isella-orange text-white font-semibold px-8 py-4 rounded-lg hover:bg-isella-orange-dark transition-colors text-lg"
            >
              <Mail className="w-6 h-6" />
              {t('contact.emailCta')}
            </a>

            {/* Call Button */}
            <a
              href="tel:+4923598092855"
              className="inline-flex items-center gap-3 bg-isella-blue text-white font-semibold px-8 py-4 rounded-lg hover:bg-isella-blue-dark transition-colors text-lg"
            >
              <Phone className="w-6 h-6" />
              {t('contact.callCta')}
            </a>
          </div>

          {/* Office Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Germany Office */}
            <div className="bg-isella-gray rounded-xl p-8 text-left">
              <h3 className="text-xl font-bold text-isella-blue mb-4 flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label="Germany">
                  🇩🇪
                </span>
                {t('contact.offices.germany.title')}
              </h3>
              <p className="font-semibold text-gray-800 mb-4">
                {t('contact.offices.germany.company')}
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-isella-orange" />
                  <span>{t('contact.offices.germany.address')}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 shrink-0 text-isella-orange" />
                  <a
                    href={`tel:${t('contact.offices.germany.phone').replace(/\s/g, '')}`}
                    className="hover:text-isella-orange transition-colors"
                  >
                    {t('contact.offices.germany.phone')}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 shrink-0 text-isella-orange" />
                  <a
                    href={`mailto:${t('contact.offices.germany.email')}`}
                    className="hover:text-isella-orange transition-colors"
                  >
                    {t('contact.offices.germany.email')}
                  </a>
                </div>
              </div>
            </div>

            {/* Poland Office */}
            <div className="bg-isella-gray rounded-xl p-8 text-left">
              <h3 className="text-xl font-bold text-isella-blue mb-4 flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label="Poland">
                  🇵🇱
                </span>
                {t('contact.offices.poland.title')}
              </h3>
              <p className="font-semibold text-gray-800 mb-4">
                {t('contact.offices.poland.company')}
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-isella-orange" />
                  <span>{t('contact.offices.poland.address')}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 shrink-0 text-isella-orange" />
                  <a
                    href={`tel:${t('contact.offices.poland.phone').replace(/\s/g, '')}`}
                    className="hover:text-isella-orange transition-colors"
                  >
                    {t('contact.offices.poland.phone')}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 shrink-0 text-isella-orange" />
                  <a
                    href={`mailto:${t('contact.offices.poland.email')}`}
                    className="hover:text-isella-orange transition-colors"
                  >
                    {t('contact.offices.poland.email')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
