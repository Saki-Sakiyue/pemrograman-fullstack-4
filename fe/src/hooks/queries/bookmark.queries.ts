import { bookmarkService } from '@/services/bookmark.service';
import { useQuery } from '@tanstack/react-query';

export const useBookmarks = () => {
  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const response = await bookmarkService.getAll();
      return response.data;
    },
  });
};