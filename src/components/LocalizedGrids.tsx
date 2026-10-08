'use client';

import LocaleLink from './LocaleLink';
import { applications, products, type Product } from '@/data/site';
import { useI18n } from '@/i18n/client';

export function ProductGrid({ items = products }: { items?: readonly Product[] }) {
  const { messages } = useI18n();
  const localized = messages.content.products as Record<string, { name: string; short: string; category: string; features: string[] }>;
  return <div className="product-grid">{items.map((product, index) => {
    const copy = localized[product.slug] ?? product;
    return <LocaleLink href={`/fabrics/${product.slug}`} className="product-card" key={product.slug}><div className="card-image" role="img" aria-label={`${copy.name} fabric detail`} style={{ backgroundImage: `url(${product.image})` }}><span className="card-index">0{index + 1}</span><span className="round-arrow">↗</span></div><div className="card-copy"><span className="eyebrow">{copy.category}</span><h3>{copy.name}</h3><p>{copy.short}</p><div className="tag-row">{copy.features.slice(0, 2).map((feature) => <span key={feature}>{feature}</span>)}</div></div></LocaleLink>;
  })}</div>;
}

export function ApplicationGrid({ items = applications }: { items?: readonly (typeof applications)[number][] }) {
  const { messages } = useI18n();
  const localized = messages.content.applications as Record<string, { name: string; title: string; description: string }>;
  return <div className="application-grid">{items.map((application, index) => {
    const copy = localized[application.slug] ?? application;
    return <LocaleLink href={`/applications/${application.slug}`} className={`application-card${application.slug === 'hiking' ? ' application-card-hiking' : ''}`} key={application.slug} style={{ backgroundImage: `url(${application.image})` }}><span className="app-index">0{index + 1} / {messages.navigation.applications.toUpperCase()}</span><div><h3>{copy.name}</h3><span>{messages.common.explore} {messages.navigation.applications.toLowerCase()} ↗</span></div></LocaleLink>;
  })}</div>;
}
