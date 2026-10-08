import { Button, CtaBand, Eyebrow, Shell } from '@/components/Site';
import { localizedMetadata } from '@/i18n/metadata';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale) ? localizedMetadata(locale, 'development', '/custom-development') : {};
}

export default async function Development({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = await getDictionary(locale); const t = messages.pages.development;
  return <Shell><section className="detail-hero" style={{ backgroundImage: 'url(/images/fabric-stretch.webp)' }}><div className="detail-inner"><Eyebrow>{t.heroEyebrow}</Eyebrow><h1>{t.heroTitle.split('|').map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h1><p>{t.heroText}</p><Button href="/request-sample">{messages.common.startProject} ↗</Button></div></section><section className="content-layout"><div><Eyebrow>{t.briefEyebrow}</Eyebrow><h2>{t.briefTitle.split('|').map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h2><p>{t.briefText}</p><ul className="bullet-list">{t.requirements.map((item) => <li key={item}>{item}</li>)}</ul></div><aside className="spec-panel"><Eyebrow>{t.flowEyebrow}</Eyebrow><h3>{t.flowTitle}</h3>{t.steps.map((step, i) => <div className="spec-row" key={step}><span>0{i + 1} / {step}</span><span>{t.projectStatus}</span></div>)}</aside></section><section className="process-band"><Eyebrow>{t.collaborateEyebrow}</Eyebrow><h2 style={{ fontSize: 'clamp(41.8px,5.5vw,68.2px)', letterSpacing: '-.055em', fontWeight: 500, margin: 0 }}>{t.processTitle}</h2><div className="process-grid">{t.steps.slice(0, 5).map((step, i) => <div className="process-step" key={step}><span>0{i + 1}</span><h3>{step}</h3></div>)}</div></section><section className="section"><Eyebrow>{t.startEyebrow}</Eyebrow><h2 style={{ fontSize: 44, fontWeight: 500, letterSpacing: '-.04em' }}>{t.startTitle}</h2><p style={{ fontSize: 14.3, color: '#656961', lineHeight: 1.7, maxWidth: 560 }}>{t.startText}</p><Button href="/request-sample">{messages.common.shareProject} ↗</Button></section><CtaBand title={t.ctaTitle} text={t.ctaText} /></Shell>;
}
