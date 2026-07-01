import apiClient from '@/api/axiosInstance';
import { BaseResponse } from '@/types/api';
import { UserProfile } from '@/types/auth.types';

export interface UpdateProfilePayload {
  username?: string;
  password?: string;
  avatar?: File;
}

export const profileService = {
  getProfile: async () => {
    const response = await apiClient.get<BaseResponse<UserProfile>>('/profile');
    return response.data;
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    // Convert to FormData for multipart/form-data
    const formData = new FormData();

    if (payload.username) {
      formData.append('username', payload.username);
    }
    if (payload.password) {
      formData.append('password', payload.password);
    }
    if (payload.avatar) {
      formData.append('avatar', payload.avatar);
    }

    const response = await apiClient.patch<BaseResponse<UserProfile>>(
      '/profile',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};
