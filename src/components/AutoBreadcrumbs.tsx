'use client';

import LocaleLink from './LocaleLink';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n/client';

export default function AutoBreadcrumbs() {
  const pathname = usePathname();
  const { locale, messages } = useI18n();
  const parts = pathname.split('/').filter(Boolean).slice(1);
  if (!parts.length) return null;
  const crumbNames = messages.breadcrumbs as Record<string, string>;
  const productNames = messages.content.products as Record<string, { name: string }>;
  const applicationNames = messages.content.applications as Record<string, { name: string }>;
  const performanceNames = messages.content.performances as Record<string, { name: string }>;
  const localizedNames: Record<string, string> = {
    fabrics: messages.navigation.fabrics,
    applications: messages.navigation.applications,
    performance: messages.navigation.performance,
    'custom-development': messages.navigation.development,
    'testing-quality': messages.navigation.testing,
    about: messages.navigation.about,
    contact: messages.navigation.contact,
    'request-sample': messages.navigation.samples,
  };
  const crumbs = [{ label: messages.common.home, href: '/' }, ...parts.map((part, index) => ({
    label: localizedNames[part] || productNames[part]?.name || applicationNames[part]?.name || performanceNames[part]?.name || crumbNames[part] || part.replaceAll('-', ' '),
    href: index < parts.length - 1 ? `/${parts.slice(0, index + 1).join('/')}` : undefined,
  }))];
  const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, ...(item.href ? { item: `https://www.yipaifabric.com/${locale}${item.href}` } : {}) })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><nav className="breadcrumbs" aria-label={messages.common.breadcrumb}>{crumbs.map((item, index) => <span key={`${item.label}-${index}`}>{index > 0 && <i>/</i>}{item.href ? <LocaleLink href={item.href}>{item.label}</LocaleLink> : item.label}</span>)}</nav></>;
}
