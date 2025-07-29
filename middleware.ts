import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { nanoid } from 'nanoid'; // Alternative plus légère à crypto

export function middleware(request: NextRequest) {
  // 1. Redirection HTTPS
  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto');
    const host = request.headers.get('host');
    
    if (proto === 'http') {
      return NextResponse.redirect(
        `https://${host}${request.nextUrl.pathname}`,
        301
      );
    }
  }

  // 2. Gestion du cache
  const response = NextResponse.next();
  
  // Cache long pour les assets statiques
  if (request.nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|webp|svg|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // 3. Headers de sécurité dynamiques
  const nonce = nanoid();
  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}'`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob:`,
    `font-src 'self' data:`,
    `connect-src 'self'`,
    `media-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Nonce', nonce);

  return response;
}

export const config = {
  matcher: [
    /*
     * Exclut:
     * - API routes
     * - Fichiers statiques
     * - _next/static
     * - _next/image
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};