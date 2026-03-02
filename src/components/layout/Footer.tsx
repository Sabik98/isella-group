'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');

  const navLinks = [
    { href: '/' as const, label: tNav('home') },
    { href: '/ueber-uns' as const, label: tNav('aboutUs') },
    { href: '/projekte' as const, label: tNav('ourProjects') },
    { href: '/karriere' as const, label: tNav('career') },
    { href: '/kontakt' as const, label: tNav('contact') },
  ];

  const socialLinks = [
    {
      href: 'https://www.facebook.com/isella.group',
      label: 'Facebook',
      icon: Facebook,
    },
    {
      href: 'https://www.linkedin.com/company/isella-group',
      label: 'LinkedIn',
      icon: Linkedin,
    },
  ];

  return (
    <footer className="bg-[#233e58] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold tracking-wide mb-4">
              ISELLA GROUP
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {tContact('description')}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-isella-orange transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-isella-orange mb-4">
              {tNav('home')}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-isella-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Germany Office */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-isella-orange mb-4">
              {tContact('offices.germany.title')}
            </h4>
            <address className="not-italic space-y-3">
              <p className="text-sm font-medium text-white">
                {tContact('offices.germany.company')}
              </p>
              <div className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-isella-orange" />
                <span>{tContact('offices.germany.address')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4 shrink-0 text-isella-orange" />
                <a
                  href={`tel:${tContact('offices.germany.phone').replace(/\s/g, '')}`}
                  className="hover:text-isella-orange transition-colors"
                >
                  {tContact('offices.germany.phone')}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4 shrink-0 text-isella-orange" />
                <a
                  href={`mailto:${tContact('offices.germany.email')}`}
                  className="hover:text-isella-orange transition-colors"
                >
                  {tContact('offices.germany.email')}
                </a>
              </div>
            </address>
          </div>

          {/* Poland Office */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-isella-orange mb-4">
              {tContact('offices.poland.title')}
            </h4>
            <address className="not-italic space-y-3">
              <p className="text-sm font-medium text-white">
                {tContact('offices.poland.company')}
              </p>
              <div className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-isella-orange" />
                <span>{tContact('offices.poland.address')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4 shrink-0 text-isella-orange" />
                <a
                  href={`tel:${tContact('offices.poland.phone').replace(/\s/g, '')}`}
                  className="hover:text-isella-orange transition-colors"
                >
                  {tContact('offices.poland.phone')}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4 shrink-0 text-isella-orange" />
                <a
                  href={`mailto:${tContact('offices.poland.email')}`}
                  className="hover:text-isella-orange transition-colors"
                >
                  {tContact('offices.poland.email')}
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              &copy; 2026 Isella Group. {t('rights')}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/impressum"
                className="text-sm text-white/50 hover:text-isella-orange transition-colors"
              >
                {t('impressum')}
              </Link>
              <Link
                href="/datenschutzerklaerung"
                className="text-sm text-white/50 hover:text-isella-orange transition-colors"
              >
                {t('privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
