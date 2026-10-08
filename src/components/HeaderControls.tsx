'use client';

import LocaleLink from './LocaleLink';
import LanguageSwitcher from './LanguageSwitcher';
import MobileNav from './MobileNav';
import { useI18n } from '@/i18n/client';

export default function HeaderControls() {
  const { messages: m } = useI18n();
  const links = [
    [m.navigation.fabrics, '/fabrics'], [m.navigation.applications, '/applications'],
    [m.navigation.performance, '/performance'], [m.navigation.development, '/custom-development'],
    [m.navigation.about, '/about'],
  ];
  return <header className="header"><LocaleLink href="/" className="wordmark"><strong>YIPAI</strong><span>TEXTILE</span></LocaleLink>
    <nav className="desktop-nav">{links.map(([label, href]) => <LocaleLink key={href} href={href}>{label}</LocaleLink>)}</nav>
    <LanguageSwitcher /> <MobileNav />
    <LocaleLink className="button header-sample-button" href="/request-sample">{m.navigation.samples} <span>↗</span></LocaleLink>
  </header>;
}
