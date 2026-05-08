'use client';

import { useHydration } from '@/hooks/useHydration';
import { useAuthStore } from '@/store/useAuthStore';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();
  const isHydrated = useHydration();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    deleteCookie('templas_token', { path: '/' });

    clearAuth();
    toast.success('Logout berhasil!');
    router.push('/login');
  };

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Memuat data...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Selamat Datang, {user ? user.username : 'Praktikan'}!
        </h1>
        <p className="mb-8 text-gray-600">
          Status:{' '}
          <span className="font-semibold text-blue-600">
            {user?.role || 'Guest'}
          </span>
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
