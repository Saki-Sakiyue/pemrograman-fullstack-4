import apiClient from '@/api/axiosInstance';

// ============================================
// Admin Templates API - Mutations Only
// ============================================
// Note: Template fetching now uses regular template.service.ts
// with status parameter for role-based filtering

export const adminTemplateService = {
  /**
   * Update template status (approve/reject)
   */
  async updateStatus(
    templateId: number,
    status: 'pending' | 'approved' | 'rejected'
  ): Promise<void> {
    await apiClient.patch(`/admin/templates/${templateId}/status`, { status });
  },

  /**
   * Delete template (soft delete)
   */
  async deleteTemplate(templateId: number): Promise<void> {
    await apiClient.patch(`/admin/templates/${templateId}/status`, {
      action: 'delete',
    });
  },
};
