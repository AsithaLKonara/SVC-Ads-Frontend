import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Get hostname (e.g. 'admin.localhost:3000' or 'admin.domain.com')
  const hostname = request.headers.get('host') || '';
  const adminSubdomain = process.env.NEXT_PUBLIC_ADMIN_SUBDOMAIN || 'admin.localhost:3000';

  // Redirect admin root to login
  if (hostname === adminSubdomain && url.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Only allow access to admin routes if the host matches the admin subdomain
  if (url.pathname.startsWith('/login') || url.pathname.startsWith('/dashboard')) {
    if (hostname !== adminSubdomain) {
      // Redirect to public homepage if accessed from a non-admin domain
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
};
