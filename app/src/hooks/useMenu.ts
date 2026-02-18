import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { menuApi } from '@/lib/supabase';
import type { MenuItem } from '@/types';

export const useMenuItems = (category?: string) => {
  return useQuery({
    queryKey: ['menuItems', category],
    queryFn: () => menuApi.getAll(category),
  });
};

export const useMenuItem = (id: string) => {
  return useQuery({
    queryKey: ['menuItem', id],
    queryFn: () => menuApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (item: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>) => 
      menuApi.create(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, item }: { id: string; item: Partial<MenuItem> }) => 
      menuApi.update(id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => menuApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};
