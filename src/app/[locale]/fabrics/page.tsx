import LocaleLink from '@/components/LocaleLink';
import { CtaBand, Eyebrow, ProductGrid, SectionTitle, Shell } from '@/components/Site';
import { products } from '@/data/site';
import { localizedMetadata } from '@/i18n/metadata';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale) ? localizedMetadata(locale, 'fabrics', '/fabrics') : {};
}

export default async function Fabrics({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = (await getDictionary(locale)).pages.fabrics;
  return <Shell><section className="detail-hero fabric-hero" style={{ backgroundImage: 'url(/images/waterproof-blue.webp)' }}><div className="detail-inner"><Eyebrow>{t.heroEyebrow}</Eyebrow><h1>{t.heroTitle.split('|').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1><p>{t.heroText}</p></div></section><section className="section fabric-library"><SectionTitle eyebrow={t.libraryEyebrow} title={t.libraryTitle} text={t.libraryText} /><nav className="fabric-category-links" aria-label="Fabric categories">{t.categoryLinks.map((label, index) => <a key={label} href={['#weather-protection', '#active-comfort', '#specialty-fabrics'][index]}>{label}</a>)}</nav><div id="weather-protection" className="fabric-group"><h3>{t.groups[0]}</h3><ProductGrid items={[products[0], products[1], products[2]]} /></div><div id="active-comfort" className="fabric-group"><h3>{t.groups[1]}</h3><ProductGrid items={[products[3], products[6], products[7], products[8]]} /></div><div id="specialty-fabrics" className="fabric-group"><h3>{t.groups[2]}</h3><ProductGrid items={[products[4], products[5], products[9], products[10]]} /></div><div className="section-link"><LocaleLink href="/request-sample">{t.recommendation} ↗</LocaleLink></div></section><CtaBand /></Shell>;
}

