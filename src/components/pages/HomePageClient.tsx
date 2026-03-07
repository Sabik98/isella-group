'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

/* ───────────────────── Constants ───────────────────── */

const CAROUSEL_IMAGES = [
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
];
const CAROUSEL_INTERVAL = 5000;

const SECTION_IDS = ['hero', 'about', 'stats', 'teamwork', 'innovation'] as const;

const STATS = [
  { key: 'founded', numericValue: 2020, suffix: '' },
  { key: 'team', numericValue: 20, suffix: '+' },
  { key: 'countries', numericValue: 3, suffix: '' },
  { key: 'projects', numericValue: 100, suffix: '+' },
] as const;

/* ───────────────────── Custom Hooks ───────────────────── */

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollY;
}

function useActiveSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTION_IDS.indexOf(
              entry.target.id as (typeof SECTION_IDS)[number]
            );
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.35 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function useAnimatedCounter(target: number, trigger: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start: number | null = null;
    let rafId: number;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [trigger, target, duration]);

  return value;
}

/* ───────────────────── Component ───────────────────── */

export default function HomePageClient() {
  const t = useTranslations();
  const scrollY = useScrollY();
  const activeSection = useActiveSection();

  // Carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  }, []);
  useEffect(() => {
    const timer = setInterval(nextSlide, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // InView refs
  const aboutText = useInView(0.2);
  const statsSection = useInView(0.3);
  const teamworkCard = useInView(0.2);
  const innovationCard = useInView(0.2);

  // Hero words
  const heroWords = useMemo(
    () => t('home.hero.title').split(' '),
    [t]
  );

  // Section labels for dot nav
  const sectionLabels = useMemo(
    () => ['Hero', t('home.about.title'), 'Stats', 'Teamwork', 'Innovation'],
    [t]
  );

  return (
    <main>
      {/* ═══════ Floating Dot Navigator (desktop) ═══════ */}
      <nav
        className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
        aria-label="Section navigation"
      >
        {SECTION_IDS.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            className="group relative flex items-center justify-end"
            aria-label={sectionLabels[i]}
          >
            {/* Tooltip */}
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded bg-isella-blue/90 px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {sectionLabels[i]}
            </span>
            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === i
                  ? 'h-3.5 w-3.5 bg-isella-orange'
                  : 'h-2.5 w-2.5 bg-white/50 group-hover:bg-white/80'
              }`}
            />
          </a>
        ))}
      </nav>

      {/* ═══════ Section 1: Hero ═══════ */}
      <section id="hero" className="relative h-screen w-full overflow-hidden">
        {/* Parallax + Ken Burns background */}
        <div
          className="absolute inset-0 animate-slow-zoom"
          style={{ transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.00004})` }}
        >
          <Image
            src="/images/hero-1.jpg"
            alt="Isella Group office"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Decorative geometric shape */}
        <div className="absolute -bottom-16 -right-16 hidden md:block" aria-hidden="true">
          <Image
            src="/images/geometric-shape.png"
            alt=""
            width={300}
            height={300}
            className="opacity-20"
          />
        </div>

        {/* Title — word-by-word reveal */}
        <div className="absolute bottom-16 left-6 z-10 md:bottom-24 md:left-16 lg:left-24">
          <h1 className="flex flex-wrap gap-x-4 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl xl:text-8xl">
            {heroWords.map((word, i) => (
              <span
                key={i}
                className="animate-hero-word"
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
              >
                {word}
              </span>
            ))}
          </h1>
          {/* Orange line animates width */}
          <div className="mt-4 h-1 animate-line-grow bg-isella-orange md:w-32" />
        </div>

        {/* Scroll-down chevron */}
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-scroll-bounce text-white/70 hover:text-white"
          aria-label="Scroll down"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </section>

      {/* ═══════ Section 2: About ═══════ */}
      <section
        id="about"
        className="relative overflow-hidden"
        style={{ clipPath: 'polygon(0 4vw, 100% 0, 100% 100%, 0 100%)' }}
      >
        <div className="grid min-h-[600px] lg:grid-cols-2" style={{ marginTop: '-4vw' }}>
          {/* Left: Image Carousel with clip-path wipe */}
          <div className="relative h-[400px] lg:h-auto">
            {CAROUSEL_IMAGES.map((src, index) => (
              <div
                key={src}
                className="absolute inset-0 transition-[clip-path] duration-1000 ease-in-out"
                style={{
                  clipPath: index === currentSlide
                    ? 'inset(0 0 0 0)'
                    : 'inset(0 100% 0 0)',
                  zIndex: index === currentSlide ? 2 : 1,
                }}
              >
                <Image
                  src={src}
                  alt={`Isella Group business image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
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

            {/* Decorative half-circle */}
            <div className="absolute -right-12 top-1/2 z-10 hidden -translate-y-1/2 lg:block" aria-hidden="true">
              <div className="h-24 w-24 rounded-full bg-isella-orange" />
            </div>
          </div>

          {/* Right: Text block — slides in from right */}
          <div className="flex items-center bg-[#233e58] px-8 py-16 md:px-12 lg:px-16 xl:px-20">
            <div
              ref={aboutText.ref}
              className={`max-w-xl animate-slide-in-right ${aboutText.inView ? 'in-view' : ''}`}
            >
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
                {t('home.about.descriptionPlain')
                  .split(t('home.about.bold1'))
                  .map((part, i, arr) => (
                    <span key={`b1-${i}`}>
                      {i > 0 && (
                        <strong className="font-bold text-white">
                          {t('home.about.bold1')}
                        </strong>
                      )}
                      {part.split(t('home.about.bold2')).map((subPart, j) => (
                        <span key={`b2-${j}`}>
                          {j > 0 && (
                            <strong className="font-bold text-white">
                              {t('home.about.bold2')}
                            </strong>
                          )}
                          {subPart.split(t('home.about.bold3')).map((subSubPart, k) => (
                            <span key={`b3-${k}`}>
                              {k > 0 && (
                                <strong className="font-bold text-white">
                                  {t('home.about.bold3')}
                                </strong>
                              )}
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

      {/* ═══════ Section 3: Stats ═══════ */}
      <section id="stats" className="relative overflow-hidden bg-isella-blue py-20">
        <div
          ref={statsSection.ref}
          className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4 md:gap-12"
        >
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.key}
              numericValue={stat.numericValue}
              suffix={stat.suffix}
              label={t(`home.stats.${stat.key}.label`)}
              trigger={statsSection.inView}
              delay={i}
            />
          ))}
        </div>
      </section>

      {/* ═══════ Section 4: Teamwork ═══════ */}
      <section id="teamwork" className="relative min-h-[500px] overflow-hidden md:min-h-[550px]">
        {/* Parallax background */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${(scrollY - 1500) * 0.15}px)` }}
        >
          <Image
            src="/images/hero-5.jpg"
            alt="Team collaboration"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 bg-black/30" />

        {/* Decorative ring with orbit */}
        <div className="absolute -top-8 right-8 hidden md:block" aria-hidden="true">
          <div className="animate-orbit-slow h-32 w-32 rounded-full border-4 border-isella-orange/30" />
        </div>

        {/* Card — slides in from left, frosted glass */}
        <div className="relative z-10 flex h-full min-h-[500px] items-center md:min-h-[550px]">
          <div
            ref={teamworkCard.ref}
            className={`m-6 max-w-lg bg-[#233e58]/80 p-10 backdrop-blur-md md:m-12 md:p-14 lg:m-20 lg:max-w-xl animate-slide-in-left ${teamworkCard.inView ? 'in-view' : ''}`}
          >
            <p className="text-lg leading-relaxed text-white/90 md:text-xl">
              {t('home.teamwork.descriptionPlain')
                .split(t('home.teamwork.bold'))
                .map((part, i) => (
                  <span key={i}>
                    {i > 0 && (
                      <strong className="font-bold text-white">
                        {t('home.teamwork.bold')}
                      </strong>
                    )}
                    {part}
                  </span>
                ))}
            </p>
            <div className="mt-8 h-1 w-16 bg-isella-orange" />
          </div>
        </div>
      </section>

      {/* ═══════ Section 5: Innovation ═══════ */}
      <section
        id="innovation"
        className="relative min-h-[550px] overflow-hidden md:min-h-[600px]"
        style={{ clipPath: 'polygon(0 0, 100% 4vw, 100% 100%, 0 100%)' }}
      >
        <Image
          src="/images/hero-4.jpg"
          alt="Innovation and business"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Decorative half-circle */}
        <div className="absolute -bottom-12 -left-12 hidden md:block" aria-hidden="true">
          <div className="h-40 w-40 rounded-full bg-isella-orange/20" />
        </div>

        {/* Card — slides in from right */}
        <div className="relative z-10 flex h-full min-h-[550px] items-center justify-end md:min-h-[600px]">
          <div
            ref={innovationCard.ref}
            className={`m-6 max-w-lg bg-[#233e58]/80 p-10 backdrop-blur-md md:m-12 md:p-14 lg:m-20 lg:max-w-xl animate-slide-in-right ${innovationCard.inView ? 'in-view' : ''}`}
          >
            <p className="text-lg leading-relaxed text-white/90 md:text-xl">
              {t('home.innovation.description')}
            </p>
            <p className="mt-6 text-lg font-bold leading-relaxed text-white md:text-xl">
              {t('home.innovation.closing')}
            </p>
            <div className="mt-8 h-1 w-16 bg-isella-orange" />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ───────────────────── Stat Card Sub-Component ───────────────────── */

function StatCard({
  numericValue,
  suffix,
  label,
  trigger,
  delay,
}: {
  numericValue: number;
  suffix: string;
  label: string;
  trigger: boolean;
  delay: number;
}) {
  const count = useAnimatedCounter(numericValue, trigger);

  return (
    <div
      className={`animate-fade-in-up text-center ${trigger ? 'in-view' : ''}`}
      style={{ animationDelay: trigger ? `${delay * 0.15}s` : '0s' }}
    >
      <span className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
        {count}
        {suffix}
      </span>
      <div
        className={`mx-auto mt-3 h-0.5 w-12 bg-isella-orange animate-line-grow-center ${trigger ? 'in-view' : ''}`}
        style={{ animationDelay: trigger ? `${0.3 + delay * 0.15}s` : '0s' }}
      />
      <p className="mt-3 text-sm font-medium tracking-wide text-white/70 uppercase">
        {label}
      </p>
    </div>
  );
}
