import { CtaBand, Eyebrow, Shell } from '@/components/Site';
import InquiryForm from '@/components/InquiryForm';
import { localizedMetadata } from '@/i18n/metadata';
import { getDictionary } from '@/i18n/dictionary';
import { isLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale) ? localizedMetadata(locale, 'contact', '/contact') : {};
}

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = await getDictionary(locale); const t = m.pages.contact;
  return <Shell><section className="form-page"><div className="form-intro"><Eyebrow>{t.eyebrow}</Eyebrow><h1>{t.title.split('|').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1><p>{t.intro}</p><div className="contact-details"><div><span>{t.company}</span>SUZHOU YIPAI TEXTILE CO., LTD.</div><div><span>{m.common.emailLabel}</span><a href="mailto:yipaifabric@gmail.com">yipaifabric@gmail.com ↗</a></div><div><span>{m.common.whatsapp}</span><a href="https://wa.me/8615995555711">+86 15995555711 ↗</a></div><div><span>{m.common.website}</span><a href="https://www.yipaifabric.com">www.yipaifabric.com ↗</a></div></div></div><InquiryForm mode="contact" /></section><CtaBand title={t.ctaTitle} text={t.ctaText} /></Shell>;
}
