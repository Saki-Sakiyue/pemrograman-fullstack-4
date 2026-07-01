import apiClient from '@/api/axiosInstance';
import { BaseResponse } from '@/types/api';
import { Stack } from '@/types/stack.types';

export const stackService = {
  getAll: async () => {
    const response = await apiClient.get<BaseResponse<Stack[]>>('/stacks');
    return response.data;
  },
};
