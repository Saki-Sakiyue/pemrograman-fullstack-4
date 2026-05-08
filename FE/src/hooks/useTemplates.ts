import { templateService } from '@/services/template.service';
import { useQuery } from '@tanstack/react-query';

export const useTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: templateService.getAll,
  });
};
