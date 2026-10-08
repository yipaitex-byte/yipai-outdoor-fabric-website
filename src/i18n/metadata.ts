import type { Metadata } from 'next';
import { getDictionary } from './dictionary';
import { localeHtmlTags, locales, type Locale } from './config';
import { siteUrl } from '@/data/site';

export async function localizedMetadata(locale: Locale, route: string, path: string, overrides?: { title?: string; description?: string }): Promise<Metadata> {
  const messages = await getDictionary(locale);
  const page = (messages.pages as Record<string, { seoTitle?: string; seoDescription?: string }>)[route];
  const title = overrides?.title ?? page?.seoTitle ?? messages.seo.homeTitle;
  const description = overrides?.description ?? page?.seoDescription ?? messages.seo.homeDescription;
  const languages: Record<string, string> = Object.fromEntries(locales.map((item) => [localeHtmlTags[item], `${siteUrl}/${item}${path}`]));
  languages['x-default'] = `${siteUrl}/en${path}`;
  const canonical = `/${locale}${path}`;
  const image = `${siteUrl}/images/fabric-functional.webp`;
  return {
    title: { absolute: title }, description,
    alternates: { canonical, languages },
    openGraph: { type: 'website', siteName: 'YIPAI Textile', title, description, url: `${siteUrl}${canonical}`, images: [{ url: image, alt: 'Technical outdoor textile' }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export async function localizedEntityMetadata(locale: Locale, collection: 'products' | 'applications' | 'performances', slug: string, path: string): Promise<Metadata> {
  const messages = await getDictionary(locale);
  const data = (messages.content[collection] as Record<string, { name?: string; title?: string; short?: string; description?: string }>)[slug];
  const title = data?.title ?? data?.name ?? messages.seo.homeTitle;
  const description = data?.description ?? data?.short ?? `${title} | YIPAI Textile`;
  return localizedMetadata(locale, collection === 'products' ? 'fabrics' : collection, path, { title, description });
}
