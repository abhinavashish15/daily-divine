import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const adminSession = request.cookies.get('admin_session')?.value;

  if (!adminSession) {
    // Redirect to admin login
    const url = request.nextUrl.clone();
    url.pathname = '/admin-login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
