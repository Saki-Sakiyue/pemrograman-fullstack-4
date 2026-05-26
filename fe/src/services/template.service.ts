import apiClient from '@/api/axiosInstance';
import { BaseResponse } from '@/types/api';
import {
  TemplateDetailResponseData,
  TemplateQueryParams,
  TemplateResponseData,
} from '@/types/template.types';

export const templateService = {
  getAll: async (params?: TemplateQueryParams) => {
    const response = await apiClient.get<BaseResponse<TemplateResponseData>>(
      '/templates',
      {
        params,
      }
    );
    return response.data;
  },

  getById: async (id: number | string) => {
    const response = await apiClient.get<
      BaseResponse<TemplateDetailResponseData>
    >(`/templates/${id}`);
    return response.data;
  },

  download: async (id: number | string) => {
    const response = await apiClient.patch<BaseResponse<any>>(
      `/templates/${id}/download`
    );
    return response.data;
  },

  upvote: async (id: number | string) => {
    const response = await apiClient.post<BaseResponse<any>>(
      `/templates/${id}/upvote`
    );
    return response.data;
  },

  bookmark: async (id: number | string) => {
    const response = await apiClient.post<BaseResponse<any>>(
      `/templates/${id}/bookmark`
    );
    return response.data;
  },
};
