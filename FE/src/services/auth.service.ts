import apiClient from '@/api/axiosInstance';
import { BaseResponse } from '@/types/api';

export interface LoginData {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export const authService = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: async (payload: any) => {
    // TODO: Define the payload type
    const response = await apiClient.post<BaseResponse<LoginData>>(
      '/auth/login',
      payload
    );
    return response.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: async (payload: any) => {
    // TODO: Define the payload type
    const response = await apiClient.post<BaseResponse<LoginData>>(
      '/auth/register',
      payload
    );
    return response.data;
  },
};
