'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeFlags, type Locale } from '@/i18n/config';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/ueber-uns' as const, label: t('aboutUs') },
    { href: '/projekte' as const, label: t('ourProjects') },
    { href: '/karriere' as const, label: t('career') },
    { href: '/kontakt' as const, label: t('contact') },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const switchLocale = useCallback(
    (newLocale: string) => {
      router.replace(pathname, { locale: newLocale as Locale });
      setLangDropdownOpen(false);
      setMobileMenuOpen(false);
    },
    [router, pathname]
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#233e58]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo-white.png"
              alt="Isella Group"
              width={140}
              height={36}
              className="h-8 md:h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher (Desktop) */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                onBlur={() => setTimeout(() => setLangDropdownOpen(false), 150)}
                className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
                aria-label="Switch language"
                aria-expanded={langDropdownOpen}
                aria-haspopup="listbox"
              >
                <Globe className="w-4 h-4" />
                <span>{localeFlags[locale as Locale]}</span>
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
                  role="listbox"
                  aria-label="Language selection"
                >
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      role="option"
                      aria-selected={locale === loc}
                      onClick={() => switchLocale(loc)}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                        locale === loc
                          ? 'text-isella-orange font-semibold'
                          : 'text-isella-blue'
                      }`}
                    >
                      <span className="text-base">{localeFlags[loc]}</span>
                      <span>
                        {loc === 'de'
                          ? 'Deutsch'
                          : loc === 'en'
                            ? 'English'
                            : 'Polski'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Language flag + Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile Language Flag */}
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              <span>{localeFlags[locale as Locale]}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white/80 hover:text-white transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Language Dropdown (appears below navbar) */}
      {langDropdownOpen && (
        <div className="lg:hidden absolute right-4 top-14 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                locale === loc
                  ? 'text-isella-orange font-semibold'
                  : 'text-isella-blue'
              }`}
            >
              <span className="text-base">{localeFlags[loc]}</span>
              <span>
                {loc === 'de'
                  ? 'Deutsch'
                  : loc === 'en'
                    ? 'English'
                    : 'Polski'}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out shadow-xl ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 h-14 bg-[#233e58]">
          <span className="text-lg font-bold text-white">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-base font-medium text-isella-blue hover:text-isella-orange transition-colors border-b border-gray-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Language Switcher */}
        <div className="px-6 pt-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
            Language
          </p>
          <div className="flex gap-2">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  locale === loc
                    ? 'bg-isella-blue text-white'
                    : 'bg-gray-100 text-isella-blue hover:bg-gray-200'
                }`}
                aria-label={`Switch to ${loc === 'de' ? 'Deutsch' : loc === 'en' ? 'English' : 'Polski'}`}
              >
                <span>{localeFlags[loc]}</span>
                <span className="uppercase">{loc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
