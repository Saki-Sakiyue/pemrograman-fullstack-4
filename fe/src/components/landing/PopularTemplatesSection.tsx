'use client';

import { motion } from 'framer-motion';
import { Download, Eye, Lock, ThumbsUp, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

const popularTemplates = [
  {
    id: 1,
    title: 'Modern SaaS Dashboard',
    description: 'A complete admin dashboard with charts, data tables, and user management pages.',
    category: ['Admin', 'Next.js', 'Tailwind'],
    likes: 342,
    downloads: '1.2k',
    comments: 89,
  },
  {
    id: 2,
    title: 'Startup Landing Page',
    description: 'High-converting landing page template for tech startups and apps.',
    category: ['Landing', 'React'],
    likes: 289,
    downloads: '940',
    comments: 64,
  },
  {
    id: 3,
    title: 'Clean Auth Flow',
    description: 'Beautiful login, register, and forgot password screens with smooth animations.',
    category: ['Auth', 'Vue', 'Tailwind'],
    likes: 156,
    downloads: '620',
    comments: 42,
  },
];

export default function PopularTemplatesSection() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleDownload = (templateTitle: string) => {
    if (!user) {
      toast.error('Anda harus login terlebih dahulu untuk mendownload.', {
        action: {
          label: 'Login Sekarang',
          onClick: () => router.push('/login?redirect=/'),
        },
        duration: 5000,
      });
      return;
    }
    toast.success(`Memulai download: ${templateTitle}...`);
  };

  return (
    <section id="templates" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">🔥</span>
            <h2 className="text-2xl font-bold text-slate-900">Trending minggu ini</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10">
              <option>Urutkan: Terpopuler</option>
              <option>Terbaru</option>
              <option>Most Downloaded</option>
            </select>
          </motion.div>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTemplates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Preview Area */}
              <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="text-slate-400">
                  {idx === 0 && (
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="p-2.5 bg-white rounded-lg text-slate-900 hover:bg-blue-50 transition shadow-lg">
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {template.category.map((cat) => (
                    <span
                      key={cat}
                      className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                  {template.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {template.description}
                </p>

                {/* Stats & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{template.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Download className="h-4 w-4" />
                      <span>{template.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4" />
                      <span>{template.comments}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(template.title)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      user
                        ? 'text-blue-600 hover:bg-blue-50'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {user ? (
                      <>
                        <Download className="h-4 w-4" />
                        Download
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Lihat
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button
            onClick={() => {
              if (!user) {
                toast.error('Silakan login untuk melihat semua template.', {
                  action: { label: 'Login', onClick: () => router.push('/login?redirect=/') },
                });
              } else {
                router.push('/dashboard/templates');
              }
            }}
            className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition"
          >
            Lihat semua template
          </button>
        </motion.div>
      </div>
    </section>
  );
}