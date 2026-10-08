import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { isLocale, localeHtmlTags, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { I18nProvider } from '@/i18n/client';
import { siteUrl } from '@/data/site';

export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);
  const title = dictionary.seo.homeTitle;
  const description = dictionary.seo.homeDescription;
  const languages = Object.fromEntries(locales.map((item) => [localeHtmlTags[item], `${siteUrl}/${item}`]));
  languages['x-default'] = `${siteUrl}/en`;
  return {
    metadataBase: new URL(siteUrl), title: { default: title, template: `%s | YIPAI Textile` }, description,
    alternates: { canonical: `/${locale}`, languages },
    openGraph: { type: 'website', siteName: 'YIPAI Textile', locale: locale === 'zh' ? 'zh_CN' : `${locale}_${locale.toUpperCase()}`, url: `${siteUrl}/${locale}`, title, description },
    twitter: { card: 'summary_large_image', title, description },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = await getDictionary(locale);
  return <I18nProvider locale={locale} messages={messages}>{children}</I18nProvider>;
}
