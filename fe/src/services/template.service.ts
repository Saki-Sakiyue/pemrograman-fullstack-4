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

  getById: async (id: string) => {
    const response = await apiClient.get<
      BaseResponse<TemplateDetailResponseData>
    >(`/templates/${id}`);
    return response.data;
  },
};
