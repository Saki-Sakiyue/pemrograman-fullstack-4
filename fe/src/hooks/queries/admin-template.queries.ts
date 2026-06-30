import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminTemplateService } from '@/services/admin-template.service';
import { templateKeys } from './template.queries';

/**
 * Admin Template Mutations Only
 * Note: Template fetching now uses regular useTemplates hook from template.queries.ts
 * with status parameter for role-based filtering
 */

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
    mutationFn: (templateId: number) => adminTemplateService.deleteTemplate(templateId),
    onSuccess: () => {
      // Invalidate template queries to refetch
      queryClient.invalidateQueries({ queryKey: templateKeys.all });
      toast.success('Template deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete template');
    },
  });
}
