import type { MetadataRoute } from 'next';
import { applications, performances, products, siteUrl } from '@/data/site';
import { localeHtmlTags, locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ['', '/fabrics', '/applications', '/performance', '/custom-development', '/testing-quality', '/about', '/contact', '/request-sample'];
  const paths = [
    ...fixed.map((path) => ({ path, priority: path === '' ? 1 : .75 })),
    ...products.map((item) => ({ path: `/fabrics/${item.slug}`, priority: .7 })),
    ...applications.map((item) => ({ path: `/applications/${item.slug}`, priority: .65 })),
    ...performances.map((item) => ({ path: `/performance/${item.slug}`, priority: .6 })),
  ];
  return locales.flatMap((locale) => paths.map(({ path, priority }) => ({
    url: `${siteUrl}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority,
    alternates: { languages: { ...Object.fromEntries(locales.map((targetLocale) => [localeHtmlTags[targetLocale], `${siteUrl}/${targetLocale}${path}`])), 'x-default': `${siteUrl}/en${path}` } },
  })));
}
