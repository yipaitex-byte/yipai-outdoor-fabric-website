import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale } from '@/i18n/config';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || /\.[^/]+$/.test(pathname)) return NextResponse.next();
  const first = pathname.split('/').filter(Boolean)[0];
  if (first && isLocale(first)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-site-locale', first);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'] };
