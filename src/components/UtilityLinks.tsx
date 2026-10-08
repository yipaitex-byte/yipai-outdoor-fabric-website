'use client';

import LocaleLink from './LocaleLink';
import { useI18n } from '@/i18n/client';

export function MobileCtaLink() {
  const { messages } = useI18n();
  return <div className="mobile-cta"><LocaleLink href="/request-sample">{messages.navigation.samples} <span>↗</span></LocaleLink></div>;
}

export function WhatsAppLink() {
  const { messages } = useI18n();
  return <a className="whatsapp-widget" href="https://wa.me/8615995555711" target="_blank" rel="noreferrer" aria-label={messages.common.whatsappAria} title={messages.common.whatsappTitle}><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.4A12.4 12.4 0 0 0 5.3 22.1L3.7 28l6.1-1.6A12.5 12.5 0 1 0 16 3.4Zm0 22.5c-1.8 0-3.6-.5-5.1-1.5l-.4-.2-3.6.9 1-3.5-.3-.4A10 10 0 1 1 16 25.9Zm5.5-7.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-2.5-1.5 9.2 9.2 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.8s1.2 3.2 1.4 3.4c.1.2 2.4 3.7 5.9 5.1.8.3 1.4.5 1.9.6.8.2 1.5.2 2.1.1.7-.1 1.8-.8 2-1.5.3-.7.3-1.3.2-1.5-.1-.2-.3-.3-.6-.5Z"/></svg><span>{messages.common.whatsapp}</span></a>;
}
