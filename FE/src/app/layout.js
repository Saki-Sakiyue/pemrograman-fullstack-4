import Navbar from '@/containers/layout/Navbar';
import './globals.css';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Templas - Community UI/UX Assets',
  description: 'Platform repositori aset UI/UX dan template kode.',
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('templas_token')?.value;

  // Logic parsing token (Mocking sementara)
  let user = null;
  if (token) {
    try {
      // Jika nanti sudah pakai JWT asli, verifikasi di sini
      user = JSON.parse(token);
    } catch (e) {
      // Fallback jika token dummy plain text
      user = { username: 'RRT_User', role: 'user' };
    }
  }

  return (
    <html lang="en">
      <body className="bg-gray-50 text-slate-900 antialiased">
        <header>
          <Navbar initialUser={user} />
        </header>

        <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>

        <footer className="border-t py-8 text-center text-sm text-gray-500">
          © 2026 Templas by Abdul Developer.
        </footer>
      </body>
    </html>
  );
}
