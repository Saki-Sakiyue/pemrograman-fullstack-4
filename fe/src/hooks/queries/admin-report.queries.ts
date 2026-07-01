import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  adminReportService,
  type AdminReportsParams,
  type AdminReportsResponse,
} from '@/services/admin-report.service';

// Query Keys
export const adminReportKeys = {
  all: ['admin-reports'] as const,
  lists: () => [...adminReportKeys.all, 'list'] as const,
  list: (params: AdminReportsParams) =>
    [...adminReportKeys.lists(), params] as const,
};

/**
 * Hook to fetch admin reports list with pagination and filters
 */
export function useAdminReports(params: AdminReportsParams = {}) {
  return useQuery({
    queryKey: adminReportKeys.list(params),
    queryFn: () => adminReportService.getReports(params),
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Hook to update report status (resolve/reject)
 */
export function useUpdateReportStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reportId,
      status,
    }: {
      reportId: number;
      status: 'resolved' | 'rejected';
    }) => adminReportService.updateStatus(reportId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminReportKeys.all });
      toast.success('Report status updated successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to update report status'
      );
    },
  });
}
