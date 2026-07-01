import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  adminUserService,
  type AdminUsersParams,
  type AdminUsersResponse,
} from '@/services/admin-user.service';

// Query Keys
export const adminUserKeys = {
  all: ['admin-users'] as const,
  lists: () => [...adminUserKeys.all, 'list'] as const,
  list: (params: AdminUsersParams) =>
    [...adminUserKeys.lists(), params] as const,
};

/**
 * Hook to fetch admin users list with pagination and filters
 */
export function useAdminUsers(params: AdminUsersParams = {}) {
  return useQuery({
    queryKey: adminUserKeys.list(params),
    queryFn: () => adminUserService.getUsers(params),
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Hook to update user role
 */
export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      role,
    }: {
      userId: number;
      role: 'admin' | 'user';
    }) => adminUserService.updateRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminUserKeys.all });
      toast.success('User role updated successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to update user role'
      );
    },
  });
}

/**
 * Hook to delete user
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => adminUserService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminUserKeys.all });
      toast.success('User deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete user');
    },
  });
}
