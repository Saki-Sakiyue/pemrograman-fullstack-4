import apiClient from '@/api/axiosInstance';
import { BaseResponse } from '@/types/api';
import {
  CreateTemplatePayload,
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

  create: async (payload: CreateTemplatePayload) => {
    const response = await apiClient.post<BaseResponse<any>>('/templates', payload);
    return response.data;
  },

  /**
   * Create template with multiple images
   * @param formData FormData dengan: title, description, category_id, images[], etc
   */
  createWithImages: async (formData: FormData) => {
    const response = await apiClient.post<BaseResponse<any>>(
      '/templates',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  getBookmarks: async (params?: TemplateQueryParams) => {
    const response = await apiClient.get<BaseResponse<TemplateResponseData>>(
      '/profile/bookmarks',
      {
        params,
      }
    );
    return response.data;
  },

  getMyTemplates: async (params?: TemplateQueryParams) => {
    const response = await apiClient.get<BaseResponse<TemplateResponseData>>(
      '/profile/templates',
      {
        params,
      }
    );
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
