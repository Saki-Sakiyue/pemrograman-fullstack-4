'use client';

import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('templas_token', { path: '/' });
    toast.success('Logout berhasil!');
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Selamat Datang di Dashboard Templas V2!
        </h1>
        <p className="mb-8 text-gray-600">
          Jika kamu melihat halaman ini, berarti Proxy Edge dan sistem
          Autentikasi kita berjalan dengan sempurna. Gerbang sudah tertembus!
        </p>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-600"
        >
          Keluar (Logout)
        </button>
      </div>
    </div>
  );
}
