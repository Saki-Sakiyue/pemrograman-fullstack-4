'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Loader2, Sparkles, Code2, Tags } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCategories } from '@/hooks/queries/category.queries';
import { useTags } from '@/hooks/queries/tag.queries';
import { useStacks } from '@/hooks/queries/stack.queries';
import { templateService } from '@/services/template.service';

const optionalUrlSchema = (label: string) =>
  z.preprocess(
    value => (typeof value === 'string' ? value.trim() : value),
    z.union([z.string().url(`${label} tidak valid`), z.literal('')])
  );

const templateSchema = z.object({
  title: z.string().trim().min(3, 'Title minimal 3 karakter').max(100, 'Title maksimal 100 karakter'),
  description: z
    .string()
    .trim()
    .min(10, 'Description minimal 10 karakter')
    .max(1000, 'Description maksimal 1000 karakter'),
  category_id: z.coerce.number().int().positive('Pilih kategori template'),
  source_url: optionalUrlSchema('Source URL'),
  demo_url: optionalUrlSchema('Demo URL'),
  tag_ids: z.array(z.number()).optional(),
  stack_ids: z.array(z.number()).optional(),
});

type TemplateFormData = z.infer<typeof templateSchema>;

export default function NewTemplatePage() {
  const router = useRouter();
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useCategories();
  const { data: tags, isLoading: isTagsLoading } = useTags();
  const { data: stacks, isLoading: isStacksLoading } = useStacks();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      title: '',
      description: '',
      category_id: undefined,
      source_url: '',
      demo_url: '',
      tag_ids: [],
      stack_ids: [],
    },
  });

  const onSubmit = async (values: TemplateFormData) => {
    try {
      const response = await templateService.create({
        title: values.title,
        description: values.description,
        category_id: values.category_id,
        source_url: values.source_url || undefined,
        demo_url: values.demo_url || undefined,
        upload_type: values.source_url ? 'link' : 'file', // default fallback
        tag_ids: values.tag_ids || [],
        stack_ids: values.stack_ids || [],
      });

      toast.success(response.messageUser || 'Template berhasil ditambahkan.');
      router.push('/templates');
    } catch (err: any) {
      toast.error(err.response?.data?.messageUser || 'Gagal menambahkan template.');
    }
  };

  const isBusy = isSubmitting || isCategoriesLoading;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-lg md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-3">
          <Link href="/templates" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to templates
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Upload Template</h1>
              <p className="mt-1 text-sm text-slate-300">
                Tambahkan template baru dengan deskripsi, kategori, dan tautan referensi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.85fr)]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Template Details</CardTitle>
            <CardDescription>Isi informasi inti template sebelum dipublikasikan.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-slate-700">
                  Title
                </label>
                <Input id="title" placeholder="Contoh: Company Landing Page" {...register('title')} />
                {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-slate-700">
                  Desc
                </label>
                <textarea
                  id="description"
                  rows={6}
                  placeholder="Jelaskan fitur, stack, atau konteks penggunaan template ini."
                  {...register('description')}
                  className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 h-auto min-h-[140px] w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-3"
                />
                {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="category_id" className="text-sm font-medium text-slate-700">
                  Category
                </label>
                <select
                  id="category_id"
                  {...register('category_id')}
                  className="border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition-colors focus-visible:ring-3 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={isCategoriesLoading}
                >
                  <option value="">Select a category</option>
                  {categories?.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && <p className="text-sm text-red-600">{errors.category_id.message}</p>}
                {categoriesError && <p className="text-sm text-red-600">Gagal memuat kategori.</p>}
              </div>

              {/* Stacks Selector (Interactive Grid) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Code2 className="h-4 w-4 text-slate-400" />
                  <span>Tech Stacks</span>
                </div>
                {isStacksLoading ? (
                  <div className="flex gap-2 animate-pulse">
                    {[1, 2, 3, 4].map(n => (
                      <div key={n} className="h-10 w-24 bg-slate-200 rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <Controller
                    control={control}
                    name="stack_ids"
                    render={({ field }) => {
                      const selected = field.value || [];
                      const toggleStack = (id: number) => {
                        const next = selected.includes(id)
                          ? selected.filter(x => x !== id)
                          : [...selected, id];
                        field.onChange(next);
                      };

                      return (
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {stacks?.map(stack => {
                            const isSelected = selected.includes(stack.id);
                            return (
                              <button
                                type="button"
                                key={stack.id}
                                onClick={() => toggleStack(stack.id)}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                                  isSelected
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm scale-[0.98]'
                                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                                }`}
                              >
                                {stack.icon_url && (
                                  <img src={stack.icon_url} alt={stack.name} className="h-4 w-4 object-contain brightness-100 dark:invert" />
                                )}
                                <span>{stack.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      );
                    }}
                  />
                )}
              </div>

              {/* Tags Selector (Interactive Pills) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Tags className="h-4 w-4 text-slate-400" />
                  <span>Tags</span>
                </div>
                {isTagsLoading ? (
                  <div className="flex gap-2 animate-pulse">
                    {[1, 2, 3].map(n => (
                      <div key={n} className="h-8 w-20 bg-slate-200 rounded-full" />
                    ))}
                  </div>
                ) : (
                  <Controller
                    control={control}
                    name="tag_ids"
                    render={({ field }) => {
                      const selected = field.value || [];
                      const toggleTag = (id: number) => {
                        const next = selected.includes(id)
                          ? selected.filter(x => x !== id)
                          : [...selected, id];
                        field.onChange(next);
                      };

                      return (
                        <div className="flex flex-wrap gap-2">
                          {tags?.map(tag => {
                            const isSelected = selected.includes(tag.id);
                            return (
                              <button
                                type="button"
                                key={tag.id}
                                onClick={() => toggleTag(tag.id)}
                                className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide transition-all ${
                                  isSelected
                                    ? 'bg-cyan-500 border-cyan-500 text-white shadow-sm'
                                    : 'bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-600'
                                }`}
                              >
                                #{tag.name}
                              </button>
                            );
                          })}
                        </div>
                      );
                    }}
                  />
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="source_url" className="text-sm font-medium text-slate-700">
                    Source URL
                  </label>
                  <Input id="source_url" placeholder="https://github.com/..." {...register('source_url')} />
                  {errors.source_url && <p className="text-sm text-red-600">{errors.source_url.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="demo_url" className="text-sm font-medium text-slate-700">
                    Demo URL
                  </label>
                  <Input id="demo_url" placeholder="https://demo.example.com" {...register('demo_url')} />
                  {errors.demo_url && <p className="text-sm text-red-600">{errors.demo_url.message}</p>}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="submit" disabled={isBusy}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Publish Template
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/templates">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-slate-50/70 shadow-sm">
          <CardHeader>
            <CardTitle>Checklist</CardTitle>
            <CardDescription>Pastikan data yang dikirim bersih dan bisa dipakai orang lain.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              Title dan description harus singkat tapi jelas, karena itu yang pertama dilihat pengguna.
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              Category membantu template muncul di filter yang tepat pada halaman explore.
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              Pilih stacks teknologi yang relevan agar pengguna tahu framework/library yang dipakai.
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              Tambahkan tag untuk memudahkan pencarian berdasarkan konsep desain (misal: Responsive, Dark Mode).
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}