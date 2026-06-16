import apiClient from '@/api/axiosInstance';
import { BaseResponse } from '@/types/api';
import { Category } from '@/types/category.types';

export const categoryService = {
  getAll: async () => {
    const response = await apiClient.get<BaseResponse<Category[]>>('/categories');
    return response.data;
  },
};
