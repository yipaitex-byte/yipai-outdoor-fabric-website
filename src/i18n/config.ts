export const locales = ['en', 'de', 'fr', 'es', 'vi', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  vi: 'Tiếng Việt',
  zh: '中文',
};
export const localeShortNames: Record<Locale, string> = {
  en: 'EN', de: 'DE', fr: 'FR', es: 'ES', vi: 'VI', zh: '中文',
};
export const localeHtmlTags: Record<Locale, string> = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', vi: 'vi', zh: 'zh-CN',
};
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

