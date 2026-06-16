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
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                {stat.number}
              </p>
              <p className="text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}