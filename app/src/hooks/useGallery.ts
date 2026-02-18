import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { galleryApi } from '@/lib/supabase';
import type { GalleryItem } from '@/types';

export const useGallery = (category?: string) => {
  return useQuery({
    queryKey: ['gallery', category],
    queryFn: () => galleryApi.getAll(category),
  });
};

export const useFeaturedGallery = () => {
  return useQuery({
    queryKey: ['gallery', 'featured'],
    queryFn: () => galleryApi.getFeatured(),
  });
};

export const useCreateGalleryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (item: Omit<GalleryItem, 'id' | 'created_at'>) => 
      galleryApi.create(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
  });
};

export const useUpdateGalleryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, item }: { id: string; item: Partial<GalleryItem> }) => 
      galleryApi.update(id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
  });
};

export const useDeleteGalleryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => galleryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
  });
};
