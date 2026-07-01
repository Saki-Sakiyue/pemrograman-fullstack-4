'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/common/useDebounce';
import { useMyTemplates } from '@/hooks/queries/template.queries';
import { CategoryFilter } from '@/components/templates/CategoryFilter';
import TemplateCard from '@/components/templates/TemplateCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

export default function MyTemplatesSection() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data, isLoading, isError } = useMyTemplates({
    page,
    limit: 5,
    search: debouncedSearch,
    category_id: selectedCategory,
  });

  const templates = data?.templates || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            My Templates
          </h2>
          <p className="text-slate-500">
            Kelola dan lihat semua template yang kamu upload.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Cari template saya..."
            className="pl-10"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <CategoryFilter
        selectedId={selectedCategory}
        onSelect={id => {
          setSelectedCategory(id);
          setPage(1);
        }}
      />

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[180px] w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border-2 border-dashed bg-slate-50 py-20 text-center">
          <p className="font-medium text-red-500">
            Gagal mengambil data template saya. Silakan coba lagi.
          </p>
        </div>
      ) : templates.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-slate-400">
            Kamu belum mengupload template apa pun.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Button
              disabled={page === 1}
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <span className="flex items-center">
              Halaman {pagination?.page} dari {pagination?.totalPages}
            </span>
            <Button
              disabled={page === pagination?.totalPages}
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
