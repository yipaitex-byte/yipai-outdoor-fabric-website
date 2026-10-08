import { notFound } from 'next/navigation';
import { Button, CtaBand, Eyebrow, Shell } from '@/components/Site';
import { performances } from '@/data/site';
import { localizedEntityMetadata } from '@/i18n/metadata';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';

export function generateStaticParams() { return performances.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const performance = performances.find((item) => item.slug === slug);
  return performance && isLocale(locale) ? localizedEntityMetadata(locale, 'performances', performance.slug, `/performance/${performance.slug}`) : {};
}

export default async function PerformanceDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const source = performances.find((item) => item.slug === slug);
  if (!source) notFound();
  const messages = await getDictionary(locale);
  const localized = (messages.content.performances as Record<string, { name: string; title: string; description: string; points: string[] }>)[slug] ?? {};
  const performance = { ...source, ...localized };
  const t = messages.pages.performanceDetail;
  return <Shell><section className="detail-hero" style={{ backgroundImage: `url(${performance.image})` }}><div className="detail-inner"><Eyebrow>{t.eyebrow}</Eyebrow><h1>{performance.title}</h1><p>{performance.description}</p><Button href="/contact">{messages.common.discussRequirements} ↗</Button></div></section><section className="content-layout"><div><Eyebrow>{t.understandingEyebrow}</Eyebrow><h2>{t.understandingTitle}</h2><p>{performance.description} {t.bodySuffix}</p><h3>{t.whatToConsider}</h3><ul className="bullet-list">{performance.points.map((point) => <li key={point}>{point}</li>)}</ul><p>{t.bodyEnd}</p></div><aside className="spec-panel"><Eyebrow>{t.parametersEyebrow}</Eyebrow><h3>{t.parametersTitle}</h3>{t.parameters.map((parameter) => <div className="spec-row" key={parameter}><span>{parameter}</span><span>{t.parameterStatus}</span></div>)}<Button href="/custom-development">{messages.common.startProject}</Button></aside></section><CtaBand title={t.ctaTitle} text={t.ctaText} /></Shell>;
}
