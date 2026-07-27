import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const adminCookie = req.cookies.get('admin_session')?.value;

  const isLoginPage = pathname.startsWith('/admin/login');

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && !isLoginPage) {
    if (adminCookie !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // Redirect logged-in users away from /admin/login to /admin
  if (isLoginPage && adminCookie === 'authenticated') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
  ],
};
