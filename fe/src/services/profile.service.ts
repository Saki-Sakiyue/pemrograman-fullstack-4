import apiClient from '@/api/axiosInstance';
import { BaseResponse } from '@/types/api';
import { UserProfile } from '@/types/auth.types';

export interface UpdateProfilePayload {
  username?: string;
  email?: string;
  avatar?: File;
}

export const profileService = {
  getProfile: async () => {
    const response = await apiClient.get<BaseResponse<UserProfile>>('/profile');
    return response.data;
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    // Pakai FormData karena bisa ada upload file avatar
    const formData = new FormData();
    if (payload.username) formData.append('username', payload.username);
    if (payload.email) formData.append('email', payload.email);
    if (payload.avatar) formData.append('avatar', payload.avatar);

    const response = await apiClient.patch<BaseResponse<UserProfile>>(
      '/profile',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  },
};