'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';

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

/* ───────────────── Isella "I" Logo Icon ───────────────── */

function IsellaIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      {/* Circle background */}
      <circle cx="20" cy="20" r="20" fill="#233e58" />
      {/* Stylized "I" from Isella logo */}
      <rect x="16" y="8" width="3.5" height="24" rx="1" fill="#d98732" />
      <rect x="21" y="8" width="3.5" height="10" rx="1" fill="white" />
      <rect x="21" y="22" width="3.5" height="10" rx="1" fill="white" />
    </svg>
  );
}

/* ──────────── SVG Path definition (shared) ──────────── */

const JOURNEY_PATH = "M 400 50 C 250 50, 180 120, 180 200 C 180 320, 620 260, 620 400 C 620 500, 180 480, 180 600 C 180 700, 620 680, 620 780";
const PATH_LENGTH = 2200; // approximate

/* ──────────── Desktop Timeline ──────────── */

function TimelineDesktop({
  milestones,
  scrollProgress,
  t,
}: {
  milestones: readonly string[];
  scrollProgress: number;
  t: (key: string) => string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [logoPos, setLogoPos] = useState({ x: 400, y: 50, angle: 0 });
  const animProgress = Math.min(scrollProgress * 1.6, 1);

  // Calculate logo position along path
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const totalLen = path.getTotalLength();
    const currentLen = totalLen * animProgress;
    const point = path.getPointAtLength(currentLen);

    // Get angle from tangent
    const ahead = path.getPointAtLength(Math.min(currentLen + 2, totalLen));
    const angle = Math.atan2(ahead.y - point.y, ahead.x - point.x) * (180 / Math.PI);

    setLogoPos({ x: point.x, y: point.y, angle });
  }, [animProgress]);

  // Node positions along the path (fraction 0–1)
  const nodePositions = useMemo(() => [
    { frac: 0.0, x: '50%', y: '5.7%', align: 'left' as const },
    { frac: 0.22, x: '22.5%', y: '22.2%', align: 'right' as const },
    { frac: 0.44, x: '77.5%', y: '44.4%', align: 'left' as const },
    { frac: 0.66, x: '22.5%', y: '66.6%', align: 'right' as const },
    { frac: 0.88, x: '77.5%', y: '86.7%', align: 'left' as const },
  ], []);

  return (
    <div className="hidden md:block relative" style={{ height: `${milestones.length * 180}px` }}>
      {/* SVG Layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 900"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Glow filter for the orange path */}
        <defs>
          <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background path — dotted guide */}
        <path
          d={JOURNEY_PATH}
          stroke="#e5e7eb"
          strokeWidth="2"
          strokeDasharray="6 6"
          vectorEffect="non-scaling-stroke"
        />

        {/* Animated orange trail */}
        <path
          ref={pathRef}
          d={JOURNEY_PATH}
          stroke="#d98732"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pathGlow)"
          style={{
            strokeDasharray: PATH_LENGTH,
            strokeDashoffset: PATH_LENGTH - PATH_LENGTH * animProgress,
            transition: 'stroke-dashoffset 0.05s linear',
          }}
        />

        {/* Particle trail behind logo */}
        {animProgress > 0.02 && [0.01, 0.025, 0.04].map((offset, i) => {
          const path = pathRef.current;
          if (!path) return null;
          const totalLen = path.getTotalLength();
          const trailLen = Math.max(0, totalLen * animProgress - (offset * totalLen));
          const pt = path.getPointAtLength(trailLen);
          return (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={3 - i}
              fill="#d98732"
              opacity={0.4 - i * 0.12}
            />
          );
        })}
      </svg>

      {/* ═══ Isella logo "driving" along the path (HTML overlay) ═══ */}
      {animProgress > 0 && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: `${(logoPos.x / 800) * 100}%`,
            top: `${(logoPos.y / 900) * 100}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.05s linear, top 0.05s linear',
          }}
        >
          {/* Outer glow pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-isella-orange/15 animate-pulse" />
          </div>
          {/* Logo container */}
          <div className="relative w-12 h-12 rounded-full bg-white shadow-xl border-2 border-isella-orange flex items-center justify-center overflow-hidden">
            <img
              src="/images/isella-icon.svg"
              alt="Isella"
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>
      )}

      {/* Milestone cards */}
      {milestones.map((key, i) => {
        const pos = nodePositions[i];
        const isRevealed = animProgress > pos.frac + 0.02;

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
            {/* Glowing node dot */}
            <div
              className="transition-all duration-700"
              style={{
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? 'scale(1)' : 'scale(0.3)',
              }}
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute w-10 h-10 rounded-full bg-isella-orange/20 animate-pulse" />
                <div className="relative w-4 h-4 rounded-full bg-isella-orange border-[3px] border-white shadow-lg z-10" />
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
  );
}

/* ──────────── Mobile Timeline ──────────── */

function TimelineMobile({
  milestones,
  scrollProgress,
  t,
}: {
  milestones: readonly string[];
  scrollProgress: number;
  t: (key: string) => string;
}) {
  const mobilePathRef = useRef<SVGLineElement>(null);
  const animProgress = Math.min(scrollProgress * 1.6, 1);

  return (
    <div className="md:hidden relative pl-14">
      {/* Vertical SVG line + logo */}
      <svg
        className="absolute left-3 top-0 w-10 h-full"
        preserveAspectRatio="none"
      >
        <line x1="12" y1="0" x2="12" y2="100%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="6 6" />
        <line
          ref={mobilePathRef}
          x1="12" y1="0" x2="12" y2="100%"
          stroke="#d98732"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000 - 1000 * animProgress,
            transition: 'stroke-dashoffset 0.05s linear',
          }}
        />
      </svg>

      {/* Mobile driving logo */}
      {animProgress > 0 && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: '12px',
            top: `${animProgress * 100}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.05s linear',
          }}
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-lg border-2 border-isella-orange flex items-center justify-center overflow-hidden">
            <img
              src="/images/isella-icon.svg"
              alt="Isella"
              className="w-6 h-6 object-contain"
            />
          </div>
        </div>
      )}

      {milestones.map((key, i) => {
        const nodeThreshold = i / milestones.length;
        const isRevealed = animProgress > nodeThreshold;

        return (
          <div key={key} className="relative mb-10 last:mb-0">
            {/* Node dot */}
            <div
              className="absolute -left-[44px] top-1 flex items-center justify-center transition-all duration-500"
              style={{
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? 'scale(1)' : 'scale(0)',
              }}
            >
              <div className="absolute w-8 h-8 rounded-full bg-isella-orange/20 animate-pulse" />
              <div className="relative w-4 h-4 rounded-full bg-isella-orange border-[3px] border-white shadow-md z-10" />
            </div>

            {/* Content */}
            <div
              style={{
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.6s ease-out',
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
  );
}

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
          <div ref={timelineContainerRef} className="relative mt-32">
            <TimelineDesktop milestones={MILESTONES} scrollProgress={scrollProgress} t={t} />
            <TimelineMobile milestones={MILESTONES} scrollProgress={scrollProgress} t={t} />
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
