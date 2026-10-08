'use client';

import LocaleLink from './LocaleLink';
import { nav } from '@/data/site';
import { useI18n } from '@/i18n/client';

export default function FooterContent() {
  const { messages: m } = useI18n();
  const labels = [m.navigation.fabrics, m.navigation.applications, m.navigation.performance];
  return <footer className="footer"><div className="footer-top"><div><LocaleLink href="/" className="wordmark"><strong>YIPAI</strong><span>TEXTILE</span></LocaleLink><p>{m.common.footerLine1}<br />{m.common.footerLine2}</p></div><div className="footer-links"><div><b>{m.common.footerExplore}</b>{nav.slice(0,3).map((x,i)=><LocaleLink key={x.href} href={x.href}>{labels[i]}</LocaleLink>)}</div><div><b>{m.common.footerConnect}</b><a href="mailto:yipaifabric@gmail.com">{m.common.email}</a><a href="https://wa.me/8615995555711" target="_blank" rel="noreferrer">{m.common.whatsapp}</a><LocaleLink href="/contact">{m.navigation.contact}</LocaleLink></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SUZHOU YIPAI TEXTILE CO., LTD.</span><span>{m.common.footerTagline}</span></div></footer>;
}
