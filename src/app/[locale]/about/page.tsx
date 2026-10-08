import { Button, CtaBand, Eyebrow, SectionTitle, Shell } from '@/components/Site';
import { localizedMetadata } from '@/i18n/metadata';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale) ? localizedMetadata(locale, 'about', '/about') : {};
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = await getDictionary(locale); const t = m.pages.about;
  return <Shell><section className="detail-hero" style={{ backgroundImage: 'url(/images/waterproof-blue.webp)' }}><div className="detail-inner"><Eyebrow>{t.heroEyebrow}</Eyebrow><h1>{t.heroTitle.split('|').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1><p>{t.heroText}</p></div></section><section className="content-layout"><div><Eyebrow>{t.whoEyebrow}</Eyebrow><h2>{t.whoTitle}</h2></div><div>{t.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Button href="/contact">{m.common.contact} ↗</Button></div></section><section className="section about-benefits"><SectionTitle eyebrow={t.benefitEyebrow} title={t.benefitTitle} text={t.benefitText} /><div className="feature-grid about-benefit-grid">{t.benefits.map((benefit, index) => <article className="feature-card" key={benefit}><span className="feature-number">0{index + 1}</span><div className="feature-icon">↗</div><h3>{benefit}</h3><p>{t.benefitCardText}</p></article>)}</div></section><CtaBand /></Shell>;
}
