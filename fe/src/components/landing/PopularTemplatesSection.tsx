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
  const user = useAuthStore(state => state.user);

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
    <section id="templates" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">🔥</span>
            <h2 className="text-2xl font-bold text-slate-900">
              Trending minggu ini
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <select className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:outline-none">
              <option>Urutkan: Terpopuler</option>
              <option>Terbaru</option>
              <option>Most Downloaded</option>
            </select>
          </motion.div>
        </div>

        {/* Loading Skeleton State */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="space-y-4 rounded-xl border border-slate-200 p-4"
              >
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between border-t pt-4">
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.1 }}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-xl"
              >
                {/* Preview Area (Thumbnail Dinamis) */}
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-slate-100">
                  {template.thumbnail_url ? (
                    <img
                      src={template.thumbnail_url}
                      alt={template.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-slate-400">
                      <svg
                        className="h-16 w-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-slate-900/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => router.push(`/templates/${template.id}`)}
                      className="rounded-lg bg-white p-2.5 text-slate-900 shadow-lg transition hover:bg-blue-50"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category Tags */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                      {template.category_name}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      By @{template.author}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mb-2 line-clamp-1 text-lg font-bold text-slate-900 transition group-hover:text-blue-600">
                    {template.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 min-h-[40px] text-sm text-slate-600">
                    {template.description}
                  </p>

                  {/* Stats & Action */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div
                        className="flex items-center gap-1.5"
                        title="Popularity Score"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{template.popularity_score}</span>
                      </div>
                      <div
                        className="flex items-center gap-1.5"
                        title="Total Download"
                      >
                        <Download className="h-4 w-4" />
                        <span>{template.download_count}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(template.title)}
                      className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition ${
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
          className="mt-10 text-center"
        >
          <button
            onClick={() => {
              if (!user) {
                toast.error('Silakan login untuk melihat semua template.', {
                  action: {
                    label: 'Login',
                    onClick: () => router.push('/login?redirect=/'),
                  },
                });
              } else {
                router.push('/dashboard/templates');
              }
            }}
            className="rounded-xl border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
          >
            Lihat semua template
          </button>
        </motion.div>
      </div>
    </section>
  );
}
