import apiClient from '@/api/axiosInstance';
import { BaseResponse } from '@/types/api';

export interface ReportPayload {
  template_id: number;
  reason: string;
}

export interface ReportResponse {
  id: number;
  template_id: number;
  user_id: number;
  reason: string;
  status: string;
  created_at: string;
}

export const reportService = {
  submitReport: async (payload: ReportPayload) => {
    const response = await apiClient.post<BaseResponse<ReportResponse>>(
      '/reports',
      payload
    );
    return response.data;
  },
};
