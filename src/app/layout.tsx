import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import './globals.css';
import Analytics from '@/components/Analytics';
import { isLocale } from '@/i18n/config';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const localeHeader = (await headers()).get('x-site-locale') ?? 'en';
  const locale = isLocale(localeHeader) ? localeHeader : 'en';
  return <html lang={locale === 'zh' ? 'zh-CN' : locale}><body>{children}<Analytics /></body></html>;
}
