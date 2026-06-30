import apiClient from '@/api/axiosInstance';

// ============================================
// Admin Users API
// ============================================

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: 'admin' | 'user';
}

export interface AdminUsersResponse {
  users: AdminUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const adminUserService = {
  /**
   * Get all users with pagination and filters
   */
  async getUsers(params: AdminUsersParams = {}): Promise<AdminUsersResponse> {
    const response = await apiClient.get('/admin/users', { params });
    return response.data.data;
  },

  /**
   * Update user role
   */
  async updateRole(userId: number, role: 'admin' | 'user'): Promise<void> {
    await apiClient.put(`/admin/users/${userId}`, { role });
  },

  /**
   * Delete user (soft delete)
   */
  async deleteUser(userId: number): Promise<void> {
    await apiClient.delete(`/admin/users/${userId}`);
  },
};
