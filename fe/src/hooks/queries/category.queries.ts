import { categoryService } from '@/services/category.service';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await categoryService.getAll();
      return response.data; // Category[]
    },
    staleTime: 1000 * 60 * 10, // Cache 10 menit — data kategori jarang berubah
  });
};
