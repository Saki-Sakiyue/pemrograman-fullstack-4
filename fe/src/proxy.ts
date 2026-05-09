import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/templates'];
const authRoutes = ['/login', '/register'];

export function proxy(request: NextRequest) {
  const token = request.cookies.get('templas_token')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Skenario A: Belum login dan mengakses protected route
  if (!token && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Skenario B: Sudah login dan mengakses auth route
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Skenario C: Akses normal
  return NextResponse.next();
}

// Middleware tidak dijalankan di file statis (gambar, css)
export const config = {
  matcher: [
    /*
     * Match semua request path KECUALI untuk:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - rute publik lainnya yang kamu punya
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
