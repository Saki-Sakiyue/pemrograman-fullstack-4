import { templateService } from '@/services/template.service';
import { TemplateQueryParams } from '@/types/template.types';
import { useQuery } from '@tanstack/react-query';

export const useTemplates = (
  params: TemplateQueryParams = {
    limit: 1,
    page: 1,
  }
) => {
  return useQuery({
    queryKey: ['templates', params],
    queryFn: async () => {
      const response = await templateService.getAll(params);
      return response.data;
    },
    placeholderData: previousData => previousData,
  });
};
