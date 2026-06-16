import { profileService, UpdateProfilePayload } from '@/services/profile.service';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const profileKeys = {
  me: ['profile', 'me'] as const,
};

// Hook untuk GET /api/profile
export const useProfile = () => {
  return useQuery({
    queryKey: profileKeys.me,
    queryFn: () => profileService.getProfile(),
    select: data => data.data,
  });
};

// Hook untuk PATCH /api/profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      profileService.updateProfile(payload),
    onSuccess: response => {
      if (response.data) {
        // Update auth store supaya Navbar dll ikut update
        setUser(response.data);
        // Invalidate cache profile
        queryClient.invalidateQueries({ queryKey: profileKeys.me });
        toast.success('Profil berhasil diperbarui!');
      }
    },
  });
};