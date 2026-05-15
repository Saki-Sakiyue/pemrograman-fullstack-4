'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTemplateDetail } from '@/hooks/queries/template.queries';
import { getFullImageUrl } from '@/lib/image';
import { formatCompactNumber } from '@/lib/utils';
import { ArrowLeft, Download, Eye, Layers, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function TemplateDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useTemplateDetail(id as string);

  // State untuk gambar yang sedang di-preview (Besar)
  const [userSelectedImage, setUserSelectedImage] = useState<string | null>(
    null
  );
  const template = data;

  // Logika untuk menentukan gambar utama yang ditampilkan
  const primaryImage =
    template?.images.find(img => img.is_primary === 1)?.image_url ||
    template?.images?.[0].image_url;

  const displayImage = userSelectedImage || primaryImage || null;

  // Fungsi untuk handle klik thumbnail
  const handleThumbnailClick = (url: string) => {
    setUserSelectedImage(url);
  };

  if (isLoading) return <DetailSkeleton />;
  if (error || !template)
    return <div className="p-10 text-center">Template tidak ditemukan.</div>;

  return (
    <div className="container mx-auto space-y-8 p-6">
      {/* Tombol Kembali */}
      <Link
        href="/templates"
        className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-medium transition-colors"
      >
        <ArrowLeft size={16} /> Kembali ke Galeri
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* === KIRI: VISUAL & DESKRIPSI (Col 8) === */}
        <div className="space-y-6 lg:col-span-8">
          {/* Main Preview (Gambar Besar) */}
          <div className="relative aspect-video overflow-hidden rounded-2xl border bg-slate-100 shadow-sm">
            {displayImage ? (
              <Image
                src={getFullImageUrl(displayImage)}
                alt={template.title}
                fill
                className="object-cover transition-all duration-500"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                No Preview
              </div>
            )}
          </div>

          {/* Gallery Thumbnails (Gambar Kecil) */}
          {template.images.length > 1 && (
            <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
              {template.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleThumbnailClick(img.image_url)}
                  className={`relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    displayImage === img.image_url
                      ? 'border-primary ring-primary/20 ring-2'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={getFullImageUrl(img.image_url)}
                    alt={`Thumbnail ${idx}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* About Section */}
          <div className="bg-card space-y-4 rounded-xl border p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Tentang Template
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="leading-relaxed whitespace-pre-line text-slate-600">
                {template.description}
              </p>
            </div>
          </div>
        </div>

        {/* === KANAN: SIDEBAR INFO & ACTION (Col 4) === */}
        <div className="space-y-6 lg:col-span-4">
          <div className="sticky top-6 space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
            <div>
              <Badge
                variant="secondary"
                className="mb-2 border-none bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                {template.category_name}
              </Badge>
              <h1 className="text-2xl leading-tight font-black text-slate-900">
                {template.title}
              </h1>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                {template.avatar_url ? (
                  <Image
                    src={getFullImageUrl(template.avatar_url)}
                    alt={template.author}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="p-2 text-slate-400" />
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Diunggah oleh
                </p>
                <p className="text-sm font-bold text-slate-900">
                  @{template.author}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="text-md h-12 w-full gap-2 font-bold shadow-lg shadow-blue-200"
                size="lg"
              >
                <Download size={20} /> Download Source
              </Button>
              <Button
                variant="outline"
                className="text-md h-12 w-full gap-2 font-bold"
                size="lg"
                asChild
              >
                <a href={template.demo_url} target="_blank">
                  <Eye size={20} /> Live Preview
                </a>
              </Button>
            </div>

            <hr className="border-slate-100" />

            {/* Tech Stacks */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Layers size={16} className="text-primary" /> Tech Stacks
              </h3>
              <div className="flex flex-wrap gap-2">
                {template.stacks.map((stack, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 rounded-lg border bg-slate-50 px-3 py-1.5"
                  >
                    <Image
                      src={getFullImageUrl(stack.icon_url)}
                      alt={stack.name}
                      width={16}
                      height={16}
                      className="object-contain"
                      unoptimized={stack.icon_url.endsWith('.svg')}
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      {stack.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metadata Stats */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl bg-slate-50/50 p-3 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Total Download
                </p>
                <p className="text-lg font-black text-slate-900">
                  {formatCompactNumber(template.download_count)}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50/50 p-3 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Popularity
                </p>
                <p className="text-lg font-black text-orange-500">
                  {formatCompactNumber(template.popularity_score)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton untuk Loading State yang rapi
function DetailSkeleton() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <Skeleton className="h-6 w-32" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Skeleton className="aspect-video w-full rounded-2xl" />
          <div className="flex gap-4">
            <Skeleton className="h-20 w-32 rounded-lg" />
            <Skeleton className="h-20 w-32 rounded-lg" />
            <Skeleton className="h-20 w-32 rounded-lg" />
          </div>
        </div>
        <div className="lg:col-span-4">
          <Skeleton className="h-[500px] w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
