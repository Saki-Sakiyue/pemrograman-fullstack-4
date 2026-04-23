'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearToken, getToken, logoutRequest } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      router.replace('/login');
      return;
    }

    setLoading(false);
  }, [router]);

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch {
      // Keep client logout robust even if API call fails.
    } finally {
      clearToken();
      router.replace('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-700">
        Mengecek sesi login...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 px-6 py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-500"
          >
            Logout
          </button>
        </div>

        <p className="text-zinc-700">
          Halaman ini hanya bisa dibuka jika token login tersedia di
          localStorage.
        </p>

        <Link
          href="/"
          className="text-sm font-semibold text-zinc-900 underline"
        >
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
