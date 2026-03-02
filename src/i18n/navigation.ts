import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

const pathnames = {
  '/': '/',
  '/ueber-uns': {
    de: '/ueber-uns',
    en: '/about-us',
    pl: '/o-nas',
  },
  '/projekte': {
    de: '/projekte',
    en: '/our-projects',
    pl: '/projekty',
  },
  '/karriere': {
    de: '/karriere',
    en: '/career',
    pl: '/kariera',
  },
  '/kontakt': {
    de: '/kontakt',
    en: '/contact',
    pl: '/kontakt',
  },
  '/impressum': '/impressum',
  '/datenschutzerklaerung': {
    de: '/datenschutzerklaerung',
    en: '/privacy-policy',
    pl: '/polityka-prywatnosci',
  },
} as const;

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  pathnames,
});
