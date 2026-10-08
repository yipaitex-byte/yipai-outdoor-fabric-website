import type { Metadata } from 'next';
import { siteUrl } from './site';
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteUrl}${path}`;
  const image=`${siteUrl}/images/fabric-functional.webp`;
  return { title, description, alternates: { canonical: path }, openGraph: { type: 'website', siteName: 'YIPAI Textile', title, description, url, images: [{ url: image, alt: 'Close-up of a functional outdoor textile surface' }] }, twitter: { card: 'summary_large_image', title, description, images: [image] } };
}
