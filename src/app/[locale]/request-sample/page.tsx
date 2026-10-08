import { Eyebrow, Shell } from '@/components/Site';
import InquiryForm from '@/components/InquiryForm';
import { localizedMetadata } from '@/i18n/metadata';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale) ? localizedMetadata(locale, 'requestSample', '/request-sample') : {};
}

export default async function RequestSample({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = await getDictionary(locale); const t = m.pages.requestSample;
  return <Shell><section className="form-page"><div className="form-intro"><Eyebrow>{t.eyebrow}</Eyebrow><h1>{t.title.split('|').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1><p>{t.intro}</p><div className="contact-details"><div><span>{t.quickContact}</span><a href="https://wa.me/8615995555711">{m.common.whatsapp} +86 15995555711 ↗</a></div><div><span>{m.common.emailLabel}</span><a href="mailto:yipaifabric@gmail.com">yipaifabric@gmail.com ↗</a></div></div></div><InquiryForm /></section></Shell>;
}
