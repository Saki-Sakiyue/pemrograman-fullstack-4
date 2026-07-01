'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const categories = [
  'Semua',
  'Admin Dashboard',
  'Landing Page',
  'E-Commerce',
  'Auth Page',
  'Portfolio',
  'React',
  'Next.js',
  'Tailwind CSS',
];

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 pt-32 pb-20">
      <div className="mx-auto max-w-5xl">
        {/* Community Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
            <span className="text-sm font-medium text-blue-700">
              Community-driven • Gratis selamanya
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-center text-4xl leading-tight font-bold text-slate-900 md:text-6xl"
        >
          Temukan template UI/UX &{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            kode sumber terbaik
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-10 max-w-3xl text-center text-lg text-slate-600"
        >
          Ribuan template siap pakai, dikurasi komunitas developer & desainer
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mb-8 max-w-2xl"
        >
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder='Cari template... contoh: "Admin Dashboard", "Tailwind", "Next.js"'
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:outline-none"
              />
            </div>
            <button className="rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-95">
              Cari
            </button>
          </div>
        </motion.div>

        {/* Category Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat, idx) => (
            <button
              key={cat}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                idx === 0
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">284</span>
            <span className="text-slate-500">template</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">1.2k</span>
            <span className="text-slate-500">kontributor</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">12k</span>
            <span className="text-slate-500">download</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
