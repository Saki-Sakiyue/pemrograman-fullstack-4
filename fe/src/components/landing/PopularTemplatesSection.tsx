'use client';

import { motion } from 'framer-motion';
import { Download, Eye, Lock, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { useTemplates } from '@/hooks/queries/template.queries';
import { Skeleton } from '@/components/ui/skeleton';

export default function PopularTemplatesSection() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  // Fetch 3 template terpopuler untuk landing page
  const { data, isLoading, isError } = useTemplates({
    page: 1,
    limit: 3,
    // Jika custom hook Anda mendukung parameter sort, Anda bisa menambahkan sort: 'popular' di sini
  });

  const templates = data?.templates || [];

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

        {/* Loading Skeleton State */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4 p-4 border border-slate-200 rounded-xl">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between pt-4 border-t">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-dashed border-red-200 bg-red-50/50 py-12 text-center text-red-600">
            <p className="font-medium">Gagal memuat template populer.</p>
          </div>
        ) : templates.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <p>Belum ada template yang tersedia.</p>
          </div>
        ) : (
          /* Template Grid Real Data */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Preview Area (Thumbnail Dinamis) */}
                <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                  {template.thumbnail_url ? (
                    <img
                      src={template.thumbnail_url}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="text-slate-400">
                      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => router.push(`/templates/${template.id}`)}
                      className="p-2.5 bg-white rounded-lg text-slate-900 hover:bg-blue-50 transition shadow-lg"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md">
                      {template.category_name}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                      By @{template.author}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition line-clamp-1">
                    {template.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2 min-h-[40px]">
                    {template.description}
                  </p>

                  {/* Stats & Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5" title="Popularity Score">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{template.popularity_score}</span>
                      </div>
                      <div className="flex items-center gap-1.5" title="Total Download">
                        <Download className="h-4 w-4" />
                        <span>{template.download_count}</span>
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
        )}

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