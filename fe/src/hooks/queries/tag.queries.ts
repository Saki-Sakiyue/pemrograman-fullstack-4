import { tagService } from '@/services/tag.service';
import { useQuery } from '@tanstack/react-query';

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await tagService.getAll();
      return response.data; // Tag[]
    },
    staleTime: 1000 * 60 * 10, // Cache 10 menit
  });
};
