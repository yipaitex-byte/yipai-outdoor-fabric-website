import { notFound } from 'next/navigation';
import { Button, CtaBand, Eyebrow, ProductGrid, SectionTitle, Shell } from '@/components/Site';
import { applications, products } from '@/data/site';
import { localizedEntityMetadata } from '@/i18n/metadata';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';

export function generateStaticParams() { return applications.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const application = applications.find((item) => item.slug === slug);
  return application && isLocale(locale) ? localizedEntityMetadata(locale, 'applications', application.slug, `/applications/${application.slug}`) : {};
}

export default async function ApplicationDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const source = applications.find((item) => item.slug === slug);
  if (!source) notFound();
  const messages = await getDictionary(locale);
  const localized = (messages.content.applications as Record<string, Partial<typeof source>>)[slug] ?? {};
  const application = { ...source, ...localized };
  const t = messages.pages.applicationDetail;
  const related = products.filter((product) => application.products.some((slug) => slug === product.slug));
  const categoryTitle = t.categoryTitle.replace('{name}', application.name.toLowerCase());
  const ctaTitle = t.ctaTitle.replaceAll('{name}', application.name.toLowerCase());
  const sampleText = t.sampleButton.replace('{name}', application.name);
  return <Shell><section className="detail-hero" style={{ backgroundImage: `url(${application.image})` }}><div className="detail-inner"><Eyebrow>{t.eyebrow} / {application.name.toUpperCase()}</Eyebrow><h1>{application.title}</h1><p>{application.description}</p><Button href="/request-sample">{sampleText} ↗</Button></div></section><section className="content-layout"><div><Eyebrow>{t.builtEyebrow}</Eyebrow><h2>{t.builtTitle}</h2><p>{application.description}</p><ul className="bullet-list">{t.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div><aside className="spec-panel"><Eyebrow>{t.briefEyebrow}</Eyebrow><h3>{t.briefTitle}</h3>{t.briefFields.map((field) => <div className="spec-row" key={field}><span>{field}</span><span>{t.defineTogether}</span></div>)}<p>{t.customizable}</p></aside></section><section className="section"><SectionTitle eyebrow={t.categoriesEyebrow} title={categoryTitle} /><ProductGrid items={related} /></section><CtaBand title={ctaTitle} text={t.ctaText} /></Shell>;
}
