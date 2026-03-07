'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Facebook, Linkedin, MapPin, Phone, Mail, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tContact = useTranslations('contact');
  const tCommon = useTranslations('common');

  const isellaGroupSocials = [
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
    {
      href: 'https://www.instagram.com/isella.group',
      label: 'Instagram',
      icon: Instagram,
    },
    {
      href: 'https://www.youtube.com/@isellagroup',
      label: 'YouTube',
      icon: Youtube,
    },
  ];

  const berghausSocials = [
    {
      href: 'https://www.instagram.com/berghaus.house',
      label: 'Instagram',
      icon: Instagram,
    },
    {
      href: 'https://www.youtube.com/@berghaus.house',
      label: 'YouTube',
      icon: Youtube,
    },
    {
      href: 'https://www.linkedin.com/company/berghaus-house',
      label: 'LinkedIn',
      icon: Linkedin,
    },
    {
      href: 'https://www.facebook.com/berghaus.house',
      label: 'Facebook',
      icon: Facebook,
    },
  ];

  const brandLinks = [
    { href: 'https://berghaus.house', label: 'berghaus.house' },
    { href: 'https://tri2thrive.com', label: 'tri2thrive.com' },
    { href: 'https://becz.eu', label: 'becz.eu' },
    { href: 'https://dennis.cz', label: 'dennis.cz' },
  ];

  return (
    <footer className="bg-[#233e58] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1 - Germany Office */}
          <div>
            <h3 className="text-sm font-bold text-isella-orange uppercase tracking-wide mb-4">
              {tContact('offices.germany.title')}
            </h3>
            <address className="not-italic space-y-2">
              <p className="text-sm font-semibold text-white">
                {tContact('offices.germany.company')}
              </p>
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

          {/* Column 2 - Poland Office */}
          <div>
            <h3 className="text-sm font-bold text-isella-orange uppercase tracking-wide mb-4">
              {tContact('offices.poland.title')}
            </h3>
            <address className="not-italic space-y-2">
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
          </div>

          {/* Column 3 - Social Media */}
          <div>
            <h3 className="text-sm font-bold text-isella-orange uppercase tracking-wide mb-4">
              Social Media
            </h3>

            {/* Isella Group Socials */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-white mb-2">Isella Group</p>
              <div className="flex items-center gap-2">
                {isellaGroupSocials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-isella-orange flex items-center justify-center hover:bg-isella-orange-dark transition-colors"
                    aria-label={`Isella Group ${social.label}`}
                  >
                    <social.icon className="w-3.5 h-3.5 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Berghaus Socials */}
            <div>
              <p className="text-sm font-semibold text-white mb-2">Berghaus</p>
              <div className="flex items-center gap-2">
                {berghausSocials.map((social) => (
                  <a
                    key={`berghaus-${social.label}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-isella-orange transition-colors"
                    aria-label={`Berghaus ${social.label}`}
                  >
                    <social.icon className="w-3.5 h-3.5 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4 - Brands + CTA */}
          <div>
            <h3 className="text-sm font-bold text-isella-orange uppercase tracking-wide mb-4">
              Our Brands
            </h3>
            <div className="space-y-1.5 mb-6">
              {brandLinks.map((brand) => (
                <a
                  key={brand.label}
                  href={brand.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-white/70 hover:text-isella-orange transition-colors"
                >
                  {brand.label}
                </a>
              ))}
            </div>
            <Link
              href="/kontakt"
              className="inline-block bg-isella-orange text-white px-5 py-2 rounded text-sm font-semibold hover:bg-isella-orange-dark transition-colors"
            >
              {tCommon('contactUs')}
            </Link>
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
