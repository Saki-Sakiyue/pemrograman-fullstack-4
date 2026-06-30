import apiClient from '@/api/axiosInstance';

// ============================================
// Admin Reports API
// ============================================

export interface AdminReport {
  id: number;
  reason: string;
  status: 'pending' | 'resolved' | 'rejected';
  created_at: string;
  template_id: number;
  template_title: string;
  template_thumbnail: string | null;
  reporter_id: number;
  reporter_username: string;
}

export interface AdminReportsParams {
  page?: number;
  limit?: number;
  status?: 'pending' | 'resolved' | 'rejected';
}

export interface AdminReportsResponse {
  reports: AdminReport[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const adminReportService = {
  /**
   * Get all reports with pagination and filters
   */
  async getReports(params: AdminReportsParams = {}): Promise<AdminReportsResponse> {
    const response = await apiClient.get('/admin/reports', { params });
    return response.data.data;
  },

  /**
   * Update report status (resolve or reject)
   */
  async updateStatus(
    reportId: number,
    status: 'resolved' | 'rejected'
  ): Promise<void> {
    await apiClient.patch(`/admin/reports/${reportId}`, { status });
  },
};
