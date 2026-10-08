import { notFound } from 'next/navigation';
import { Button, CtaBand, Eyebrow, ProductGrid, SectionTitle, Shell } from '@/components/Site';
import { products } from '@/data/site';
import { localizedEntityMetadata } from '@/i18n/metadata';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product && isLocale(locale) ? localizedEntityMetadata(locale, 'products', product.slug, `/fabrics/${product.slug}`) : {};
}

export default async function FabricDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const source = products.find((item) => item.slug === slug);
  if (!source) notFound();
  const messages = await getDictionary(locale);
  const translated = (messages.content.products as Record<string, { name: string; short: string; category: string; features: string[]; applications: string[] }>)[slug] ?? {};
  const product = { ...source, ...translated };
  const t = messages.pages.productDetail;
  const context = slug === 'pfc-free' ? t.pfcContext : t.generalContext;

  return <Shell><section className="detail-hero" style={{ backgroundImage: `url(${product.image})` }}><div className="detail-inner"><Eyebrow>{t.eyebrow} / {product.category}</Eyebrow><h1>{product.name}</h1><p>{product.short} {t.customized}</p><Button href="/request-sample">{messages.common.requestSamples} ↗</Button></div></section><section className="content-layout"><div><Eyebrow>{t.overviewEyebrow}</Eyebrow><h2>{t.overviewTitle}</h2><p>{context}</p><h3>{t.keyPerformance}</h3><ul className="bullet-list">{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><h3>{t.applications}</h3><ul className="bullet-list">{product.applications.map((application) => <li key={application}>{application}</li>)}</ul></div><aside className="spec-panel"><Eyebrow>{t.specEyebrow}</Eyebrow><h3>{t.specTitle}</h3>{t.specs.map((spec) => <div className="spec-row" key={spec}><span>{spec}</span><span>{t.toDefine}</span></div>)}<p>{t.shareSpec}</p><Button href="/custom-development">{messages.common.discussDevelopment}</Button></aside></section><section className="testing-block"><div><Eyebrow>{t.finishingEyebrow}</Eyebrow><h2>{t.finishingTitle}</h2><p>{t.finishingText}</p><Button href="/testing-quality" secondary>{messages.common.testingQuality}</Button></div><div className="spec-panel"><h3>{t.projectLed}</h3>{[[t.finishingOptions, t.defineApplication], [t.testMethod, t.agreeProject], [t.acceptance, t.provideTarget]].map(([label, value]) => <div className="spec-row" key={label}><span>{label}</span><span>{value}</span></div>)}</div></section><section className="section"><SectionTitle eyebrow={t.relatedEyebrow} title={t.relatedTitle} /><ProductGrid items={products.filter((item) => item.slug !== product.slug).slice(0, 3)} /></section><CtaBand title={`${messages.common.requestSamples}: ${product.name}`} text={t.ctaText} /></Shell>;
}
