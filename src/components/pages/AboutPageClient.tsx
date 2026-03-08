'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState, useEffect, useCallback } from 'react';

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

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const windowH = window.innerHeight;
          const start = windowH;
          const end = -rect.height;
          const current = rect.top;
          const p = Math.min(1, Math.max(0, (start - current) / (start - end)));
          setProgress(p);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);

  return progress;
}

/* ───────────────────── Timeline Data ───────────────────── */

const MILESTONES = ['milestone1', 'milestone2', 'milestone3', 'milestone4', 'milestone5'] as const;

/* ───────────────────── Component ───────────────────── */

export default function AboutPageClient() {
  const t = useTranslations();
  const scrollY = useScrollY();

  // InView refs
  const timeline = useInView(0.1);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(timelineContainerRef);
  const teamSection = useInView(0.15);
  const missionSection = useInView(0.2);

  // Check for mobile (disable parallax)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <main>
      {/* ═══════ Section 1: Hero — Full-viewport parallax ═══════ */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Parallax background */}
        <div
          className="absolute inset-0"
          style={{
            transform: isMobile ? undefined : `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <Image
            src="/images/about-team.jpg"
            alt="Isella Group team"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Dark overlay — stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

        {/* Title */}
        <div className="absolute bottom-20 left-6 z-10 md:bottom-28 md:left-16 lg:left-24">
          <h1
            className="animate-hero-word text-6xl font-bold leading-tight text-white md:text-7xl lg:text-8xl xl:text-9xl"
            style={{
              animationDelay: '0.2s',
              WebkitTextStroke: '2px rgba(255,255,255,0.3)',
            }}
          >
            {t('about.title')}
          </h1>
          <p
            className="animate-hero-word mt-4 text-xl font-light text-white/80 md:text-2xl"
            style={{ animationDelay: '0.5s' }}
          >
            {t('about.subtitle')}
          </p>
          <div className="mt-6 h-1 animate-line-grow bg-isella-orange md:w-32" />
        </div>

        {/* Scroll-down chevron */}
        <a
          href="#story"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-scroll-bounce text-white/70 hover:text-white"
          aria-label="Scroll down"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </section>

      {/* ═══════ Section 2: Story with SVG Path Timeline ═══════ */}
      <section id="story" className="bg-white py-20 px-4 md:py-28">
        <div className="mx-auto max-w-5xl">
          {/* Intro paragraph */}
          <div
            ref={timeline.ref}
            className={`animate-fade-in-up ${timeline.inView ? 'in-view' : ''}`}
          >
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700 md:text-xl">
              {t('about.story')}
            </p>
          </div>

          {/* SVG Path Journey Timeline */}
          <div ref={timelineContainerRef} className="relative mt-20">
            {/* ── Desktop: Winding SVG path ── */}
            <div className="hidden md:block relative" style={{ height: `${MILESTONES.length * 180}px` }}>
              {/* SVG Path */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 800 900"
                preserveAspectRatio="none"
                fill="none"
              >
                {/* Background path (faint) */}
                <path
                  d="M 400 50 C 400 50, 650 150, 650 230 C 650 310, 150 310, 150 420 C 150 530, 650 530, 650 620 C 650 710, 150 710, 150 800"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Animated path (orange) */}
                <path
                  d="M 400 50 C 400 50, 650 150, 650 230 C 650 310, 150 310, 150 420 C 150 530, 650 530, 650 620 C 650 710, 150 710, 150 800"
                  stroke="#d98732"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    strokeDasharray: 2600,
                    strokeDashoffset: 2600 - 2600 * Math.min(scrollProgress * 1.6, 1),
                    transition: 'stroke-dashoffset 0.05s linear',
                  }}
                />
              </svg>

              {/* Milestone nodes */}
              {MILESTONES.map((key, i) => {
                // Positions along the winding path (evenly distributed)
                const positions = [
                  { x: '50%', y: '5.5%', align: 'left' as const },
                  { x: '81.25%', y: '25.5%', align: 'left' as const },
                  { x: '18.75%', y: '46.5%', align: 'right' as const },
                  { x: '81.25%', y: '69%', align: 'left' as const },
                  { x: '18.75%', y: '89%', align: 'right' as const },
                ];
                const pos = positions[i];
                const nodeProgress = Math.min(scrollProgress * 1.6, 1);
                const nodeThreshold = i / MILESTONES.length;
                const isRevealed = nodeProgress > nodeThreshold;

                return (
                  <div
                    key={key}
                    className="absolute"
                    style={{
                      left: pos.x,
                      top: pos.y,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {/* Glow ring */}
                    <div
                      className="transition-all duration-700"
                      style={{
                        opacity: isRevealed ? 1 : 0,
                        transform: isRevealed ? 'scale(1)' : 'scale(0.3)',
                      }}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Outer glow */}
                        <div className="absolute w-12 h-12 rounded-full bg-isella-orange/20 animate-pulse" />
                        {/* Inner dot */}
                        <div className="relative w-5 h-5 rounded-full bg-isella-orange border-4 border-white shadow-lg z-10" />
                      </div>
                    </div>

                    {/* Content card */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-64 transition-all duration-700 ${
                        pos.align === 'right' ? 'right-full mr-8' : 'left-full ml-8'
                      }`}
                      style={{
                        opacity: isRevealed ? 1 : 0,
                        transform: isRevealed
                          ? 'translateY(-50%) translateX(0)'
                          : `translateY(-50%) translateX(${pos.align === 'right' ? '30px' : '-30px'})`,
                      }}
                    >
                      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <span className="text-3xl font-bold text-isella-orange">
                          {t(`about.timeline.${key}.year`)}
                        </span>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                          {t(`about.timeline.${key}.text`)}
                        </p>
                      </div>
                      {/* Arrow pointing to node */}
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-gray-100 rotate-45 ${
                          pos.align === 'right'
                            ? '-right-1.5 border-l-0 border-b-0'
                            : '-left-1.5 border-r-0 border-t-0'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Mobile: Vertical path ── */}
            <div className="md:hidden relative pl-12">
              {/* Vertical SVG line */}
              <svg
                className="absolute left-4 top-0 w-2 h-full"
                preserveAspectRatio="none"
              >
                <line x1="4" y1="0" x2="4" y2="100%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="6 6" />
                <line
                  x1="4" y1="0" x2="4" y2="100%"
                  stroke="#d98732"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 1000,
                    strokeDashoffset: 1000 - 1000 * Math.min(scrollProgress * 1.6, 1),
                    transition: 'stroke-dashoffset 0.05s linear',
                  }}
                />
              </svg>

              {MILESTONES.map((key, i) => {
                const nodeProgress = Math.min(scrollProgress * 1.6, 1);
                const nodeThreshold = i / MILESTONES.length;
                const isRevealed = nodeProgress > nodeThreshold;

                return (
                  <div key={key} className="relative mb-10 last:mb-0">
                    {/* Node dot */}
                    <div
                      className="absolute -left-12 top-1 flex items-center justify-center transition-all duration-500"
                      style={{
                        opacity: isRevealed ? 1 : 0,
                        transform: isRevealed ? 'scale(1)' : 'scale(0)',
                      }}
                    >
                      <div className="absolute w-8 h-8 rounded-full bg-isella-orange/20 animate-pulse" />
                      <div className="relative w-4 h-4 rounded-full bg-isella-orange border-3 border-white shadow-md z-10" />
                    </div>

                    {/* Content */}
                    <div
                      className="transition-all duration-600"
                      style={{
                        opacity: isRevealed ? 1 : 0,
                        transform: isRevealed ? 'translateX(0)' : 'translateX(-20px)',
                      }}
                    >
                      <span className="text-2xl font-bold text-isella-orange">
                        {t(`about.timeline.${key}.year`)}
                      </span>
                      <p className="mt-1 text-base leading-relaxed text-gray-600">
                        {t(`about.timeline.${key}.text`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Section 3: Team ═══════ */}
      <section className="bg-isella-gray py-20 px-4 md:py-28">
        <div ref={teamSection.ref} className="mx-auto max-w-5xl">
          <h2
            className={`text-3xl font-bold text-isella-blue md:text-4xl animate-fade-in-up ${teamSection.inView ? 'in-view' : ''}`}
          >
            {t('about.team.title')}
          </h2>
          <p
            className={`mt-4 max-w-3xl text-lg leading-relaxed text-gray-700 animate-fade-in-up ${teamSection.inView ? 'in-view' : ''}`}
            style={{ animationDelay: teamSection.inView ? '0.15s' : '0s' }}
          >
            {t('about.team.description')}
          </p>

          {/* Team Cards — overlapping grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {/* Dennis Czekalla */}
            <a
              href="https://dennis.cz"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative text-center animate-scale-in ${teamSection.inView ? 'in-view' : ''}`}
              style={{ animationDelay: teamSection.inView ? '0.3s' : '0s' }}
            >
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-3 shadow-md transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                <Image
                  src="/images/team/dennis-czekalla.jpg"
                  alt={t('about.team.members.dennis.name')}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
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
              <div
                key={i}
                className={`text-center animate-scale-in ${teamSection.inView ? 'in-view' : ''}`}
                style={{
                  animationDelay: teamSection.inView ? `${0.3 + i * 0.15}s` : '0s',
                  transform: i === 2 ? 'translateY(12px)' : undefined,
                }}
              >
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-gray-200 flex items-center justify-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
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

      {/* ═══════ Section 4: Mission — Cinematic full-width ═══════ */}
      <section className="relative min-h-[500px] overflow-hidden md:min-h-[550px]">
        {/* Background image with parallax */}
        <div
          className="absolute inset-0"
          style={{
            transform: isMobile ? undefined : `translateY(${(scrollY - 2500) * 0.15}px)`,
          }}
        >
          <Image
            src="/images/hero-5.jpg"
            alt="Mission background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Frosted glass card */}
        <div className="relative z-10 flex h-full min-h-[500px] items-center justify-center md:min-h-[550px]">
          <div
            ref={missionSection.ref}
            className={`m-6 max-w-2xl bg-[#233e58]/80 p-10 backdrop-blur-md md:p-14 animate-fade-in-up ${missionSection.inView ? 'in-view' : ''}`}
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {t('about.mission.title')}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/90 md:text-xl">
              {t('about.mission.description')}
            </p>
            {/* Orange accent line */}
            <div className="mt-8 h-1 w-16 bg-isella-orange" />
          </div>
        </div>
      </section>
    </main>
  );
}
