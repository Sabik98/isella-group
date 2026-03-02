'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';

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
          <h2 className="text-3xl md:text-4xl font-bold text-isella-blue mb-4">
            {t('about.team.title')}
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-12">
            {t('about.team.description')}
          </p>

          {/* Team Member Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Dennis Czekalla */}
            <a
              href="https://dennis.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-3 shadow-md">
                <Image
                  src="/images/team/dennis-czekalla.jpg"
                  alt={t('about.team.members.dennis.name')}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-bold text-isella-blue flex items-center justify-center gap-1">
                {t('about.team.members.dennis.name')}
                <ArrowUpRight className="w-4 h-4 text-isella-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-sm text-gray-500">{t('about.team.members.dennis.role')}</p>
            </a>

            {/* Placeholder Team Members */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-400">Team Member</h4>
                <p className="text-sm text-gray-400">Coming Soon</p>
              </div>
            ))}
          </div>
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
