'use client';

import { deleteCookie } from 'cookies-next';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar({ initialUser }) {
  // Gunakan initialUser dari Server sebagai default state
  const [user, setUser] = useState(initialUser);

  const handleLogout = () => {
    deleteCookie('templas_token');
    setUser(null); // Update state lokal agar UI langsung berubah
    window.location.href = '/login';
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          TEMPLAS
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold">{user.username}</span>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-500"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-sm font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
