import apiClient from '@/api/axiosInstance';
import { TemplateQueryParams, TemplateResponseData } from '@/types/template.types';
import { BaseResponse } from '@/types/api';

// ============================================
// Admin Templates API
// ============================================

export const adminTemplateService = {
  /**
   * Get all templates with admin filtering (pending, approved, rejected)
   */
  async getAll(params?: TemplateQueryParams) {
    const response = await apiClient.get<BaseResponse<TemplateResponseData>>(
      '/admin/templates',
      { params }
    );
    return response.data;
  },
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
