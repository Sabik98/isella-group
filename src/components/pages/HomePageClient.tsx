'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

const CAROUSEL_IMAGES = [
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
];

const CAROUSEL_INTERVAL = 5000;

export default function HomePageClient() {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <main>
      {/* ---- Section 1: Full-viewport Hero with background image ---- */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero-1.jpg"
          alt="Isella Group office"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Decorative geometric shape - bottom right */}
        <div className="absolute -bottom-16 -right-16 hidden md:block" aria-hidden="true">
          <Image
            src="/images/geometric-shape.png"
            alt=""
            width={300}
            height={300}
            className="opacity-20"
          />
        </div>

        {/* Title positioned bottom-left */}
        <div className="absolute bottom-16 left-6 z-10 md:bottom-24 md:left-16 lg:left-24">
          <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl xl:text-8xl">
            {t('home.hero.title')}
          </h1>
          <div className="mt-4 h-1 w-24 bg-isella-orange md:w-32" />
        </div>
      </section>

      {/* ---- Section 2: Two-column - Image carousel left, Text right ---- */}
      <section className="relative overflow-hidden">
        <div className="grid min-h-[600px] lg:grid-cols-2">
          {/* Left: Image Carousel */}
          <div className="relative h-[400px] lg:h-auto">
            {CAROUSEL_IMAGES.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`Isella Group business image ${index + 1}`}
                fill
                className={`object-cover transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={index === 0}
              />
            ))}

            {/* Carousel indicators */}
            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {CAROUSEL_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-isella-orange'
                      : 'w-2.5 bg-white/60 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Decorative half-circle overlay on the edge */}
            <div className="absolute -right-12 top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden="true">
              <div className="h-24 w-24 rounded-full bg-isella-orange" />
            </div>
          </div>

          {/* Right: Text block with dark blue background */}
          <div className="flex items-center bg-[#233e58] px-8 py-16 md:px-12 lg:px-16 xl:px-20">
            <div className="max-w-xl">
              {/* Orange signet */}
              <div className="mb-8">
                <Image
                  src="/images/signet-orange.png"
                  alt="Isella Group signet"
                  width={48}
                  height={48}
                  className="opacity-80"
                />
              </div>

              <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                {t('home.about.descriptionPlain').split(t('home.about.bold1')).map((part, i, arr) => (
                  <span key={`b1-${i}`}>
                    {i > 0 && <strong className="font-bold text-white">{t('home.about.bold1')}</strong>}
                    {part.split(t('home.about.bold2')).map((subPart, j, subArr) => (
                      <span key={`b2-${j}`}>
                        {j > 0 && <strong className="font-bold text-white">{t('home.about.bold2')}</strong>}
                        {subPart.split(t('home.about.bold3')).map((subSubPart, k) => (
                          <span key={`b3-${k}`}>
                            {k > 0 && <strong className="font-bold text-white">{t('home.about.bold3')}</strong>}
                            {subSubPart}
                          </span>
                        ))}
                      </span>
                    ))}
                  </span>
                ))}
              </p>

              {/* Orange accent line */}
              <div className="mt-8 h-1 w-16 bg-isella-orange" />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Section 3: Teamwork - Text card on left with image background ---- */}
      <section className="relative min-h-[500px] overflow-hidden md:min-h-[550px]">
        {/* Background image */}
        <Image
          src="/images/hero-5.jpg"
          alt="Team collaboration"
          fill
          className="object-cover"
          sizes="100vw"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Decorative geometric element - top right */}
        <div className="absolute -top-8 right-8 hidden md:block" aria-hidden="true">
          <div className="h-32 w-32 rounded-full border-4 border-isella-orange/30" />
        </div>

        {/* Text card on the left */}
        <div className="relative z-10 flex h-full min-h-[500px] items-center md:min-h-[550px]">
          <div className="m-6 max-w-lg bg-[#233e58]/95 p-10 backdrop-blur-sm md:m-12 md:p-14 lg:m-20 lg:max-w-xl">
            <p className="text-lg leading-relaxed text-white/90 md:text-xl">
              {t('home.teamwork.descriptionPlain').split(t('home.teamwork.bold')).map((part, i) => (
                <span key={i}>
                  {i > 0 && <strong className="font-bold text-white">{t('home.teamwork.bold')}</strong>}
                  {part}
                </span>
              ))}
            </p>

            {/* Orange accent line */}
            <div className="mt-8 h-1 w-16 bg-isella-orange" />
          </div>
        </div>
      </section>

      {/* ---- Section 4: Innovation - Text card on right with image background ---- */}
      <section className="relative min-h-[550px] overflow-hidden md:min-h-[600px]">
        {/* Background image */}
        <Image
          src="/images/hero-4.jpg"
          alt="Innovation and business"
          fill
          className="object-cover"
          sizes="100vw"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Decorative half-circle - bottom left */}
        <div className="absolute -bottom-12 -left-12 hidden md:block" aria-hidden="true">
          <div className="h-40 w-40 rounded-full bg-isella-orange/20" />
        </div>

        {/* Text card on the right */}
        <div className="relative z-10 flex h-full min-h-[550px] items-center justify-end md:min-h-[600px]">
          <div className="m-6 max-w-lg bg-[#233e58]/95 p-10 backdrop-blur-sm md:m-12 md:p-14 lg:m-20 lg:max-w-xl">
            <p className="text-lg leading-relaxed text-white/90 md:text-xl">
              {t('home.innovation.description')}
            </p>

            <p className="mt-6 text-lg font-bold leading-relaxed text-white md:text-xl">
              {t('home.innovation.closing')}
            </p>

            {/* Orange accent line */}
            <div className="mt-8 h-1 w-16 bg-isella-orange" />
          </div>
        </div>
      </section>

    </main>
  );
}
