import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Ambil token dari cookies
  const token = request.cookies.get('templas_token')?.value;

  // 2. Tentukan rute yang ingin diproteksi
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith('/admin');
  const isProtectedRoute =
    pathname.startsWith('/upload') || pathname.startsWith('/bookmarks');
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  // --- LOGIKA PROTEKSI (DRAFT) ---

  // Jika user mencoba akses halaman login/register padahal sudah login
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Jika akses halaman terproteksi (User/Admin) tapi tidak punya token
  if ((isProtectedRoute || isAdminRoute) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Khusus Admin: Cek role di dalam token
  // Karena saat ini JWT belum siap, kita asumsikan jika token ada & berisi string 'admin', dia Admin.
  // Nanti setelah SR selesai, bagian ini akan menggunakan library 'jose' untuk decode JWT.
  if (isAdminRoute && token !== 'mock-admin-token') {
    // Jika bukan admin, tendang ke home
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// 3. Matcher: Tentukan rute mana saja yang harus melewati middleware ini
export const config = {
  matcher: ['/admin/:path*', '/upload', '/bookmarks', '/login', '/register'],
};
