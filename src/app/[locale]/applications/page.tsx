import { ApplicationGrid, CtaBand, SectionTitle, Shell } from '@/components/Site';
import { localizedMetadata } from '@/i18n/metadata';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale) ? localizedMetadata(locale, 'applications', '/applications') : {};
}

export default async function Applications({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = (await getDictionary(locale)).pages.applications;
  return <Shell><section className="detail-hero application-hero" style={{ backgroundImage: 'url(/images/app-jacket.webp)' }}><div className="detail-inner"><p className="eyebrow">{t.heroEyebrow}</p><h1>{t.heroTitle.split('|').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1><p>{t.heroText}</p></div></section><section className="section applications-page"><SectionTitle eyebrow={t.sectionEyebrow} title={t.sectionTitle} text={t.sectionText} /><ApplicationGrid /></section><CtaBand /></Shell>;
}
