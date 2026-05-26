'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-black">
      <div className="mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row text-sm text-slate-500 dark:text-slate-400">
        {/* Left Section - Brand & Copyright */}
        <div className="flex items-center gap-1">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Templas
          </span>
          <span>© {currentYear}. Hak Cipta Dilindungi.</span>
        </div>

        {/* Middle Section - Made with Love */}
        <div className="flex items-center gap-1 text-xs">
          <span>Dibuat dengan</span>
          <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500 animate-pulse" />
          <span>oleh</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Kelompok 4
          </span>
        </div>

        {/* Right Section - Links */}
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="hover:text-primary transition-colors hover:underline"
          >
            Dashboard
          </Link>
          <Link
            href="/templates"
            className="hover:text-primary transition-colors hover:underline"
          >
            Templates
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
