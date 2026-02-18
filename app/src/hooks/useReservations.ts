import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationsApi } from '@/lib/supabase';
import type { Reservation } from '@/types';

export const useReservations = () => {
  return useQuery({
    queryKey: ['reservations'],
    queryFn: () => reservationsApi.getAll(),
  });
};

export const useReservationsByDate = (date: string) => {
  return useQuery({
    queryKey: ['reservations', date],
    queryFn: () => reservationsApi.getByDate(date),
    enabled: !!date,
  });
};

export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (reservation: Omit<Reservation, 'id' | 'created_at' | 'updated_at' | 'status'>) => 
      reservationsApi.create(reservation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};

export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Reservation['status'] }) => 
      reservationsApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => reservationsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};
