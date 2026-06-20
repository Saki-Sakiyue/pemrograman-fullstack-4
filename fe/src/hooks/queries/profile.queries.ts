import { profileService } from '@/services/profile.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { UpdateProfilePayload } from '@/types/profile.types';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await profileService.getProfile();
      return response.data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setUser, user } = useAuthStore();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      profileService.updateProfile(payload),
    onSuccess: data => {
      // Invalidate profile query untuk refresh data
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      // Update auth store jika username berubah
      if (data.data && data.data.username && user) {
        setUser({
          ...user,
          username: data.data.username,
          avatar_url: data.data.avatar_url || user.avatar_url,
        });
      }

      // Update token jika ada token baru (username berubah)
      if (data.data && data.data.token) {
        localStorage.setItem('token', data.data.token);
      }

      toast.success(data.message_user || 'Profil berhasil diperbarui');
    },
    onError: (error: unknown) => {
      const axiosError = error as { response?: { data?: { message_user?: string } } };
      const message =
        axiosError?.response?.data?.message_user ||
        'Terjadi kesalahan saat memperbarui profil';
      toast.error(message);
    },
  });
};
