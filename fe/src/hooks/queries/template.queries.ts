import { templateService } from '@/services/template.service';
import { TemplateQueryParams } from '@/types/template.types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Query Keys for cache management
export const templateKeys = {
  all: ['templates'] as const,
  lists: () => [...templateKeys.all, 'list'] as const,
  list: (params: TemplateQueryParams) => [...templateKeys.lists(), params] as const,
  details: () => [...templateKeys.all, 'detail'] as const,
  detail: (id: string) => [...templateKeys.details(), id] as const,
};

export const useTemplates = (
  params: TemplateQueryParams = {
    limit: 1,
    page: 1,
  }
) => {
  return useQuery({
    queryKey: templateKeys.list(params),
    queryFn: async () => {
      const response = await templateService.getAll(params);
      return response.data;
    },
    placeholderData: previousData => previousData,
  });
};

export const useTemplateDetail = (id: number | string) => {
  return useQuery({
    queryKey: ['templates', String(id)],
    queryFn: async () => {
      const response = await templateService.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useBookmarks = (
  params: TemplateQueryParams = {
    limit: 5,
    page: 1,
  }
) => {
  return useQuery({
    queryKey: ['bookmarks', params],
    queryFn: async () => {
      const response = await templateService.getBookmarks(params);
      return response.data;
    },
    placeholderData: previousData => previousData,
  });
};

export const useMyTemplates = (
  params: TemplateQueryParams = {
    limit: 5,
    page: 1,
  }
) => {
  return useQuery({
    queryKey: ['myTemplates', params],
    queryFn: async () => {
      const response = await templateService.getMyTemplates(params);
      return response.data;
    },
    placeholderData: previousData => previousData,
  });
};

export const useDownloadTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => templateService.download(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['templates', String(id)] });
    },
    onError: () => {
      toast.error('Gagal mencatat download.');
    },
  });
};

export const useUpvoteTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => templateService.upvote(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['templates', String(id)] });
      toast.success(data.message_user || 'Berhasil upvote!');
    },
    onError: () => {
      toast.error('Gagal memproses upvote.');
    },
  });
};

export const useBookmarkTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => templateService.bookmark(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['templates', String(id)] });
      toast.success(data.message_user || 'Berhasil menyimpan bookmark!');
    },
    onError: () => {
      toast.error('Gagal memproses bookmark.');
    },
  });
};
