'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tContact = useTranslations('contact');
  const tCommon = useTranslations('common');

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left Column - Contact Us */}
          <div>
            <h3 className="text-xl font-bold text-isella-orange mb-6">
              {tCommon('contactUs')}
            </h3>

            {/* Germany Office */}
            <address className="not-italic space-y-2 mb-6">
              <p className="text-sm font-semibold text-white">
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

            {/* Poland Office */}
            <address className="not-italic space-y-2 mb-8">
              <p className="text-sm font-semibold text-white">
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

            {/* Contact Us Button */}
            <Link
              href="/kontakt"
              className="inline-block bg-isella-orange text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-isella-orange-dark transition-colors"
            >
              {tCommon('contactUs')}
            </Link>
          </div>

          {/* Right Column - Tagline + Social */}
          <div className="flex flex-col justify-center">
            <h3 className="text-white text-3xl md:text-4xl font-light leading-snug mb-6">
              It&apos;s all about what we can do{' '}
              <span className="font-bold">together</span>
            </h3>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-isella-orange flex items-center justify-center hover:bg-isella-orange-dark transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0 text-sm text-white/50">
            <span>Isella Group &copy; 2022</span>
            <span className="hidden sm:inline mx-2">&ndash;</span>
            <span>{t('rights')}</span>
            <span className="hidden sm:inline mx-2">&ndash;</span>
            <Link
              href="/datenschutzerklaerung"
              className="hover:text-isella-orange transition-colors"
            >
              {t('privacy')}
            </Link>
            <span className="hidden sm:inline mx-2">&ndash;</span>
            <Link
              href="/impressum"
              className="hover:text-isella-orange transition-colors"
            >
              {t('impressum')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
