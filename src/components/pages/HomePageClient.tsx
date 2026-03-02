'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Lightbulb, Users, Award, Palette, ArrowRight } from 'lucide-react';

const VALUES = [
  { key: 'innovation', Icon: Lightbulb },
  { key: 'teamwork', Icon: Users },
  { key: 'experience', Icon: Award },
  { key: 'creativity', Icon: Palette },
] as const;

export default function HomePageClient() {
  const t = useTranslations();

  return (
    <main>
      {/* ── Hero Section ── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#233e58] to-[#1a2d42]">
        {/* Decorative geometric accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {/* Large circle top-right */}
          <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border-[3px] border-isella-orange/20" />
          {/* Small filled circle bottom-left */}
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-isella-orange/10" />
          {/* Accent line */}
          <div className="absolute left-1/2 top-[12%] h-px w-40 -translate-x-1/2 bg-isella-orange/30 md:w-64" />
          {/* Dot cluster */}
          <div className="absolute bottom-[18%] right-[10%] h-3 w-3 rounded-full bg-isella-orange/40" />
          <div className="absolute bottom-[22%] right-[12%] h-2 w-2 rounded-full bg-isella-orange/25" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            {t('home.hero.title')}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
            {t('home.hero.subtitle')}
          </p>

          <a
            href="#about"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-isella-orange px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-isella-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-isella-orange focus-visible:ring-offset-2 focus-visible:ring-offset-isella-blue"
          >
            {t('home.hero.cta')}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="bg-gray-50 py-20 md:py-28">
        <div className="container px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Text column */}
            <div>
              <h2 className="text-3xl font-bold text-isella-blue md:text-4xl lg:text-5xl">
                {t('home.about.title')}
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-gray-700">
                {t('home.about.description')}
              </p>

              <blockquote className="mt-8 border-l-4 border-isella-orange pl-5 text-xl italic text-isella-orange">
                {t('home.about.highlight')}
              </blockquote>
            </div>

            {/* Decorative element column */}
            <div className="hidden lg:flex lg:items-center lg:justify-center" aria-hidden="true">
              <div className="relative">
                {/* Outer block */}
                <div className="h-72 w-72 rounded-2xl border-2 border-isella-blue/10 bg-white shadow-lg xl:h-80 xl:w-80" />
                {/* Inner accent block */}
                <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-xl bg-isella-orange/10 xl:h-44 xl:w-44" />
                {/* Blue accent square */}
                <div className="absolute -left-4 -top-4 h-20 w-20 rounded-lg bg-isella-blue/10" />
                {/* Small orange circle */}
                <div className="absolute right-8 top-8 h-12 w-12 rounded-full bg-isella-orange/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values Section ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="container px-4">
          <h2 className="text-center text-3xl font-bold text-isella-blue md:text-4xl lg:text-5xl">
            {t('home.values.title')}
          </h2>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ key, Icon }) => (
              <div
                key={key}
                className="group rounded-xl bg-white p-8 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-isella-orange/10 text-isella-orange transition-colors group-hover:bg-isella-orange group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-semibold text-isella-blue">
                  {t(`home.values.${key}.title`)}
                </h3>

                <p className="mt-3 leading-relaxed text-gray-600">
                  {t(`home.values.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative overflow-hidden bg-isella-blue py-20 md:py-28">
        {/* Orange accent bar */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-1.5 w-full bg-isella-orange"
        />

        <div className="container relative z-10 px-4 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t('home.cta.title')}
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            {t('home.cta.description')}
          </p>

          <Link
            href="/kontakt"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-isella-orange px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-isella-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-isella-orange focus-visible:ring-offset-2 focus-visible:ring-offset-isella-blue"
          >
            {t('home.cta.button')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
