'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
            Siap Meningkatkan Produktivitas Desain Anda?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-100 md:text-xl">
            Bergabunglah dengan ribuan desainer dan developer yang sudah
            menghemat waktu mereka menggunakan Templas.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-10 py-5 text-lg font-bold text-blue-600 shadow-2xl transition hover:scale-105 hover:bg-blue-50 active:scale-95"
          >
            Daftar Gratis Sekarang
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-6 text-sm font-medium text-blue-200">
            Gratis 14 hari pertama • Tanpa kartu kredit • Batal kapan saja
          </p>
        </motion.div>
      </div>
    </section>
  );
}
