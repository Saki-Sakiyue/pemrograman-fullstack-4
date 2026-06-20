import apiClient from '@/api/axiosInstance';
import { BaseResponse } from '@/types/api';
import {
  ProfileData,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '@/types/profile.types';

export const profileService = {
  getProfile: async () => {
    const response = await apiClient.get<BaseResponse<ProfileData>>('/profile');
    return response.data;
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
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

    const response = await apiClient.patch<
      BaseResponse<UpdateProfileResponse>
    >('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
