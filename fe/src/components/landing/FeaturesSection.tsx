'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Download,
  Shield,
  Globe,
  Heart,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Template Premium',
    desc: 'Ribuan template berkualitas tinggi yang dibuat oleh desainer profesional.',
    color: 'blue',
  },
  {
    icon: Download,
    title: 'Download Cepat',
    desc: 'Akses instant dan download tanpa batas untuk semua template yang tersedia.',
    color: 'green',
  },
  {
    icon: Shield,
    title: 'Lisensi Komersial',
    desc: 'Gunakan template untuk proyek klien atau bisnis Anda tanpa khawatir.',
    color: 'purple',
  },
  {
    icon: Globe,
    title: 'Update Berkala',
    desc: 'Koleksi template baru dan tren desain terbaru ditambahkan setiap minggu.',
    color: 'orange',
  },
  {
    icon: Heart,
    title: 'Support 24/7',
    desc: 'Tim support kami siap membantu Anda kapan saja jika mengalami kendala.',
    color: 'red',
  },
  {
    icon: Zap,
    title: 'Mudah Diedit',
    desc: 'File terstruktur dengan rapi, mudah disesuaikan dengan kebutuhan brand Anda.',
    color: 'yellow',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Kenapa Memilih Templas?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Platform template terlengkap dengan kualitas terbaik untuk
            mempercepat alur kerja desain Anda.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-xl"
            >
              <div
                className={`h-14 w-14 rounded-xl bg-${feature.color}-100 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className={`h-7 w-7 text-${feature.color}-600`} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-slate-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
