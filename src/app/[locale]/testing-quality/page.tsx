import { CtaBand, Eyebrow, Shell } from '@/components/Site';
import { localizedMetadata } from '@/i18n/metadata';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale) ? localizedMetadata(locale, 'testing', '/testing-quality') : {};
}

export default async function Testing({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = await getDictionary(locale); const t = m.pages.testing;
  return <Shell><section className="detail-hero" style={{ backgroundImage: 'url(/images/lab-permeability.webp)' }}><div className="detail-inner"><Eyebrow>{t.heroEyebrow}</Eyebrow><h1>{t.heroTitle.split('|').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1><p>{t.heroText}</p></div></section><section className="content-layout"><div><Eyebrow>{t.approachEyebrow}</Eyebrow><h2>{t.approachTitle}</h2><p>{t.approachText}</p><p>{t.disclaimer}</p></div><div className="test-list">{m.content.testingCategories.map((category, index) => <div key={category}><span>0{index + 1}</span>{category}<i>{t.method} ↗</i></div>)}</div></section><section className="section" style={{ paddingTop: 0 }}><Eyebrow>{t.planEyebrow}</Eyebrow><div className="faq-grid">{t.faq.map(([question, answer]) => <article className="faq-card" key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></section><CtaBand title={t.ctaTitle} text={t.ctaText} /></Shell>;
}
