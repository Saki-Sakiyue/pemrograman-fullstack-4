'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginRequest, setToken } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const result = await loginRequest(form);
      setToken(result.data.token);
      router.push('/');
    } catch (error) {
      setErrorMessage(error.message || 'Login gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100 px-6 py-12">
      <div className="mx-auto w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-2xl ring-1 ring-black/5 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">Templas</p>
        <h1 className="mt-3 text-3xl font-bold text-zinc-900">Masuk ke akun kamu</h1>
        <p className="mt-2 text-sm text-zinc-600">Gunakan username atau email, lalu password.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-zinc-700">Username / Email</span>
            <input
              name="identifier"
              type="text"
              required
              value={form.identifier}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-orange-500"
              placeholder="contoh: raffi_coder atau raffi@gmail.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-zinc-700">Password</span>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-orange-500"
              placeholder="Masukkan password"
            />
          </label>

          {errorMessage ? (
            <p className="rounded-lg bg-rose-100 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-sm text-zinc-600">
          <Link href="/" className="font-medium text-zinc-900 underline">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
