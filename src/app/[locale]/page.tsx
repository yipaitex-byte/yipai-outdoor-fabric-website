import LocaleLink from '@/components/LocaleLink';
import HeroCarousel from '@/components/HeroCarousel';
import { ApplicationGrid, Button, CtaBand, ProductGrid, SectionTitle, Shell } from '@/components/Site';
import { applications, products, siteUrl } from '@/data/site';

import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = await getDictionary(locale);
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Organization', name: 'YIPAI TEXTILE', legalName: 'SUZHOU YIPAI TEXTILE CO., LTD.', url: siteUrl, email: 'yipaifabric@gmail.com', telephone: '+86 15995555711', description: m.common.organizationDescription };
  return <Shell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <HeroCarousel />
    <section className="section section-dark home-fabrics">
      <SectionTitle eyebrow={m.home.featured.eyebrow} title={m.home.featured.title} text={m.home.featured.text} dark />
      <ProductGrid items={[products[0], products[6], products[8], products[10]]} />
      <div className="section-link"><LocaleLink href="/fabrics">{m.common.exploreAllFabrics} ↗</LocaleLink></div>
    </section>
    <section className="section home-applications">
      <SectionTitle eyebrow={m.home.applications.eyebrow} title={m.home.applications.title} text={m.home.applications.text} />
      <ApplicationGrid items={applications.slice(0, 3)} />
      <div className="section-link"><LocaleLink href="/applications">{m.common.exploreAllApplications} ↗</LocaleLink></div>
    </section>
    <section className="section home-development"><SectionTitle eyebrow={m.home.development.eyebrow} title={m.home.development.title} text={m.home.development.text} /><Button href="/custom-development">{m.home.development.button} ↗</Button></section>
    <section className="section section-dark"><SectionTitle eyebrow={m.home.technical.eyebrow} title={m.home.technical.title} text={m.home.technical.text} dark /><div className="feature-grid">{m.home.technical.items.map((item, index) => <article className="feature-card" key={item}><span className="feature-number">0{index + 1}</span><h3>{item}</h3></article>)}</div></section>
    <section className="testing-block"><div><p className="eyebrow">{m.home.testing.eyebrow}</p><h2>{m.home.testing.title}</h2><p>{m.home.testing.text}</p><Button href="/testing-quality" secondary>{m.home.testing.button} ↗</Button></div><div className="testing-image-home" style={{ backgroundImage: 'url(/images/lab-permeability.webp)' }} role="img" aria-label={m.content.testingCategories[0]} /></section>
    <section className="section"><SectionTitle eyebrow={m.home.why.eyebrow} title={m.home.why.title} text={m.home.why.text} /><div className="feature-grid">{m.home.why.items.map((item, index) => <article className="feature-card" key={item}><span className="feature-number">0{index + 1}</span><h3>{item}</h3><p>{m.home.why.text}</p></article>)}</div></section>
    <CtaBand title={m.home.ctaTitle} text={m.home.ctaText} />
  </Shell>;
}

