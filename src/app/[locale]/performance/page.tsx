import LocaleLink from '@/components/LocaleLink';
import { CtaBand, Eyebrow, SectionTitle, Shell } from '@/components/Site';
import { performances } from '@/data/site';
import { localizedMetadata } from '@/i18n/metadata';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale) ? localizedMetadata(locale, 'performance', '/performance') : {};
}

export default async function Performance({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = await getDictionary(locale); const t = messages.pages.performance;
  const content = messages.content.performances as Record<string, { title: string; description: string }>;
  return <Shell><section className="detail-hero" style={{ backgroundImage: 'url(/images/fabric-functional.webp)' }}><div className="detail-inner"><Eyebrow>{t.heroEyebrow}</Eyebrow><h1>{t.heroTitle.split('|').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1><p>{t.heroText}</p></div></section><section className="section"><SectionTitle eyebrow={t.sectionEyebrow} title={t.sectionTitle} text={t.sectionText} /><div className="faq-grid">{performances.map((p, i) => { const localized = content[p.slug] ?? p; return <LocaleLink className="faq-card" href={`/performance/${p.slug}`} key={p.slug}><span className="feature-number">0{i + 1}</span><h3>{localized.title}</h3><p>{localized.description}</p><span style={{ display: 'block', marginTop: 20, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em' }}>{messages.common.exploreTopic} ↗</span></LocaleLink>; })}</div></section><CtaBand /></Shell>;
}
