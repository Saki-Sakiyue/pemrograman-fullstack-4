import apiClient from '@/api/axiosInstance';
import { BaseResponse } from '@/types/api';
import { Template } from '@/types/template.types';

export const bookmarkService = {
  getAll: async () => {
    const response = await apiClient.get<BaseResponse<Template[]>>('/bookmarks');
    return response.data;
  },
};