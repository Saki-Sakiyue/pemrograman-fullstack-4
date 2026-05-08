import apiClient from '@/api/axiosInstance';

export const templateService = {
  getAll: async () => {
    const response = await apiClient.get('/templates');
    return response.data;
  },
};
