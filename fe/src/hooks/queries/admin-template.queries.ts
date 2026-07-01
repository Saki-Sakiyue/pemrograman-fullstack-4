import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminTemplateService } from '@/services/admin-template.service';
import { templateKeys } from './template.queries';
import {
  TemplateQueryParams,
  TemplateResponseData,
} from '@/types/template.types';
import { BaseResponse } from '@/types/api';

/**
 * Admin Template Queries and Mutations
 */

/**
 * Hook to fetch all templates with admin filtering
 */
export function useAdminTemplates(
  params: TemplateQueryParams = {
    limit: 10,
    page: 1,
  },
  options?: Omit<
    UseQueryOptions<TemplateResponseData | null>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: [...templateKeys.lists(), 'admin', params],
    queryFn: async () => {
      const data = await adminTemplateService.getAll(params);
      return data.data;
    },
    placeholderData: previousData => previousData,
    ...options,
  });
}

/**
 * Hook to update template status (approve/reject)
 */
export function useUpdateTemplateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      templateId,
      status,
    }: {
      templateId: number;
      status: 'pending' | 'approved' | 'rejected';
    }) => adminTemplateService.updateStatus(templateId, status),
    onSuccess: () => {
      // Invalidate template queries to refetch with updated status
      queryClient.invalidateQueries({ queryKey: templateKeys.all });
      toast.success('Template status updated successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to update template status'
      );
    },
  });
}

/**
 * Hook to delete template
 */
export function useDeleteTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateId: number) =>
      adminTemplateService.deleteTemplate(templateId),
    onSuccess: () => {
      // Invalidate template queries to refetch
      queryClient.invalidateQueries({ queryKey: templateKeys.all });
      toast.success('Template deleted successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete template'
      );
    },
  });
}
