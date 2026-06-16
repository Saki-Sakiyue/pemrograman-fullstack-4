'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Siap Meningkatkan Produktivitas Desain Anda?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan desainer dan developer yang sudah menghemat waktu mereka menggunakan Templas.
          </p>
          <Link 
            href="/register"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-2xl hover:scale-105 active:scale-95"
          >
            Daftar Gratis Sekarang
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-6 text-blue-200 text-sm font-medium">
            Gratis 14 hari pertama • Tanpa kartu kredit • Batal kapan saja
          </p>
        </motion.div>
      </div>
    </section>
  );
}