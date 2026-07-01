import apiClient from '@/api/axiosInstance';
import { BaseResponse } from '@/types/api';
import { Tag } from '@/types/tag.types';

export const tagService = {
  getAll: async () => {
    const response = await apiClient.get<BaseResponse<Tag[]>>('/tags');
    return response.data;
  },
};
