'use client';

import LocaleLink from './LocaleLink';
import { useI18n } from '@/i18n/client';

export default function CtaBandClient({ title, text }: { title?: string; text?: string }) {
  const { messages: m } = useI18n();
  return <section className="cta-band"><div><p className="eyebrow">{m.common.ctaEyebrow}</p><h2>{title ?? m.common.ctaTitle}</h2><p>{text ?? m.common.ctaText}</p></div><div className="cta-actions"><LocaleLink className="button" href="/request-sample">{m.navigation.samples} ↗</LocaleLink><LocaleLink className="button button-secondary" href="/contact">{m.common.contact}</LocaleLink></div></section>;
}
