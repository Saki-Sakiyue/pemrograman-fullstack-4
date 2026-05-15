'use client';

// import { useCategories } from "@/hooks/queries/category.queries";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryFilterProps {
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export function CategoryFilter({ selectedId, onSelect }: CategoryFilterProps) {
  const { data, isLoading } = {
    data: { data: [{ id: 1, name: 'Category 1' }] },
    isLoading: false,
  }; // useCategories();

  if (isLoading) return <FilterSkeleton />;

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Button
        variant={selectedId === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelect(null)}
        className="rounded-full"
      >
        Semua
      </Button>

      {data?.data?.map(cat => (
        <Button
          key={cat.id}
          variant={selectedId === cat.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelect(cat.id)}
          className="rounded-full"
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
}

function FilterSkeleton() {
  return (
    <div className="mb-8 flex gap-2">
      {[1, 2, 3, 4].map(i => (
        <Skeleton key={i} className="h-9 w-20 rounded-full" />
      ))}
    </div>
  );
}
