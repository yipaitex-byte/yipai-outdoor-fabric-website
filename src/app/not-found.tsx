import { headers } from 'next/headers';
import LocaleLink from '@/components/LocaleLink';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';

export default async function NotFound() {
  const candidate = (await headers()).get('x-site-locale') ?? 'en';
  const locale = isLocale(candidate) ? candidate : 'en';
  const messages = await getDictionary(locale);
  return <main className="section"><p className="eyebrow">404</p><h1>{messages.common.notFoundTitle}</h1><p>{messages.common.notFoundText}</p><LocaleLink href="/" className="button">{messages.common.backHome}</LocaleLink></main>;
}
