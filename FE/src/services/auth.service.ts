import apiClient from '@/api/axiosInstance';
import { BaseResponse } from '@/types/api';
import { LoginPayload, LoginResponseData, RegisterPayload } from '@/types/auth.types';

export const authService = {
  login: async (payload: LoginPayload) => {
    // TODO: Define the payload type
    const response = await apiClient.post<BaseResponse<LoginResponseData>>(
      '/auth/login',
      payload
    );
    return response.data;
  },
  register: async (payload: RegisterPayload) => {
    // TODO: Define the payload type
    const response = await apiClient.post<BaseResponse<LoginResponseData>>(
      '/auth/register',
      payload
    );
    return response.data;
  },
};
