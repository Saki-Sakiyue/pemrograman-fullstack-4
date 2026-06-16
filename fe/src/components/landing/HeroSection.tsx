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
    <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto">
        {/* Community Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <span className="text-sm text-blue-700 font-medium">
              Community-driven • Gratis selamanya
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-center text-slate-900 mb-6 leading-tight"
        >
          Temukan template UI/UX &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            kode sumber terbaik
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 text-center mb-10 max-w-3xl mx-auto"
        >
          Ribuan template siap pakai, dikurasi komunitas developer & desainer
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder='Cari template... contoh: "Admin Dashboard", "Tailwind", "Next.js"'
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition shadow-sm"
              />
            </div>
            <button className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/20 active:scale-95">
              Cari
            </button>
          </div>
        </motion.div>

        {/* Category Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat, idx) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                idx === 0
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
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
          className="flex justify-center items-center gap-4 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-slate-900 font-bold">284</span>
            <span className="text-slate-500">template</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-900 font-bold">1.2k</span>
            <span className="text-slate-500">kontributor</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-900 font-bold">12k</span>
            <span className="text-slate-500">download</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}