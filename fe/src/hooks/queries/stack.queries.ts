import { stackService } from '@/services/stack.service';
import { useQuery } from '@tanstack/react-query';

export const useStacks = () => {
  return useQuery({
    queryKey: ['stacks'],
    queryFn: async () => {
      const response = await stackService.getAll();
      return response.data; // Stack[]
    },
    staleTime: 1000 * 60 * 10, // Cache 10 menit
  });
};
