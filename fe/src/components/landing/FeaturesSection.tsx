'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Download, Shield, Globe, Heart, Zap } from 'lucide-react';

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
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Kenapa Memilih Templas?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Platform template terlengkap dengan kualitas terbaik untuk mempercepat alur kerja desain Anda.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              <div className={`h-14 w-14 rounded-xl bg-${feature.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-7 w-7 text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}