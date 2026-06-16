'use client';
import TemplateCard from '@/components/templates/TemplateCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useBookmarks } from '@/hooks/queries/bookmark.queries';
import { Bookmark } from 'lucide-react';

export default function BookmarksPage() {
  const { data: templates, isLoading, isError } = useBookmarks();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Bookmarks
        </h1>
        <p className="text-slate-500">
          Template yang kamu simpan untuk dibuka nanti.
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-44 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border-2 border-dashed bg-slate-50 py-20 text-center">
          <p className="font-medium text-red-500">
            Gagal mengambil data dari server.
          </p>
        </div>
      ) : templates?.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <Bookmark className="h-16 w-16 text-slate-200" />
          <div>
            <p className="font-semibold text-slate-700">Belum ada bookmark</p>
            <p className="text-sm text-slate-400">
              Simpan template favoritmu dan temukan lagi di sini.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates?.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}
