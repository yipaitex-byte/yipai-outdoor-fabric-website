'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
import { isLocale } from '@/i18n/config';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export default function LocaleLink({ href, ...props }: Props) {
  const pathname = usePathname();
  const first = pathname.split('/').filter(Boolean)[0];
  const locale = first && isLocale(first) ? first : 'en';
  const localizedHref = href.startsWith('/') && !href.startsWith('//')
    ? `/${locale}${href === '/' ? '' : href}`
    : href;
  return <Link href={localizedHref} {...props} />;
}
