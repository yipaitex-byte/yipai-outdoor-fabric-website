'use client';

import { usePathname, useRouter } from 'next/navigation';
import { localeNames, locales, isLocale } from '@/i18n/config';
import { useI18n } from '@/i18n/client';

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const { messages } = useI18n();
  const parts = pathname.split('/').filter(Boolean);
  const active = parts[0] && isLocale(parts[0]) ? parts[0] : 'en';
  return <label className={`language-switcher${compact ? ' language-switcher-compact' : ''}`}>
    <span className="sr-only">{messages.navigation.language}</span>
    <select aria-label={messages.navigation.language} value={active} onChange={(event) => {
      const next = [...parts];
      if (next.length && isLocale(next[0])) next[0] = event.target.value;
      else next.unshift(event.target.value);
      router.push(`/${next.join('/')}`);
    }}>
      {locales.map((locale) => <option key={locale} value={locale}>{localeNames[locale]}</option>)}
    </select>
  </label>;
}
