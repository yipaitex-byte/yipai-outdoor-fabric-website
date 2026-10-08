import 'server-only';
import type { Locale } from './config';
import en from './messages/en.json';

export type Messages = typeof en;

const loaders: Record<Locale, () => Promise<Messages>> = {
  en: async () => (await import('./messages/en.json')).default,
  de: async () => (await import('./messages/de.json')).default as Messages,
  fr: async () => (await import('./messages/fr.json')).default as Messages,
  es: async () => (await import('./messages/es.json')).default as Messages,
  vi: async () => (await import('./messages/vi.json')).default as Messages,
  zh: async () => (await import('./messages/zh.json')).default as Messages,
};

function mergeFallback<T>(fallback: T, localized: unknown): T {
  if (localized === undefined || localized === null || localized === '') return fallback;
  if (Array.isArray(fallback)) return (Array.isArray(localized) ? localized : fallback) as T;
  if (typeof fallback === 'object' && fallback !== null) {
    const translated = typeof localized === 'object' && localized !== null ? localized as Record<string, unknown> : {};
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fallback)) result[key] = mergeFallback(value, translated[key]);
    return result as T;
  }
  return localized as T;
}

export async function getDictionary(locale: Locale): Promise<Messages> {
  if (locale === 'en') return loaders.en();
  const [fallback, localized] = await Promise.all([loaders.en(), loaders[locale]()]);
  return mergeFallback(fallback, localized);
}

