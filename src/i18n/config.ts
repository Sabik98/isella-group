export const locales = ['de', 'en', 'pl'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  pl: 'Polski',
};

export const localeFlags: Record<Locale, string> = {
  de: '\u{1F1E9}\u{1F1EA}',
  en: '\u{1F1EC}\u{1F1E7}',
  pl: '\u{1F1F5}\u{1F1F1}',
};
