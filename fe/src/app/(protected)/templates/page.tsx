'use client';

import { CategoryFilter } from '@/components/templates/CategoryFilter';
import TemplateCard from '@/components/templates/TemplateCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks/common/useDebounce';
import { useTemplates } from '@/hooks/queries/template.queries';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function TemplatesPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data, isLoading, isError } = useTemplates({
    page,
    limit: 5,
    search: debouncedSearch,
  });

  const templates = data?.templates || [];
  const pagination = data?.pagination;
  // Logika Filter Sederhana

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Explore Templates
          </h1>
          <p className="text-slate-500">
            Temukan ribuan aset UI dan template kode terbaik.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Cari template (ex: Landing Page, Auth...)"
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Pasang Komponen Filter */}
      <CategoryFilter
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Main Content */}
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
            Gagal mengambil data dari server.
          </p>
        </div>
      ) : templates?.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-slate-400">Template tidak ditemukan.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templates?.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {/* Controls Pagination */}
          <div className="mt-8 flex justify-center gap-4">
            <Button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
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
