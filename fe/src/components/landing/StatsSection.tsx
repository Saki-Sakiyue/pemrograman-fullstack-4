'use client';

import { motion } from 'framer-motion';

const stats = [
  { number: '12,000+', label: 'Template Premium' },
  { number: '45,000+', label: 'Total Downloads' },
  { number: '8,500+', label: 'Desainer Aktif' },
  { number: '99%', label: 'Tingkat Kepuasan' },
];

export default function StatsSection() {
  return (
    <section className="bg-slate-900 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <p className="mb-2 text-4xl font-extrabold text-white md:text-5xl">
                {stat.number}
              </p>
              <p className="font-medium text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
