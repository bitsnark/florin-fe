import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Reservation } from '@/types';
import { FlorinApiService } from '@/services/Api';

/**
 * Hook to update a reservation
 * This mutation will invalidate all reservation-related queries when successful
 */
export function useUpdateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reservation: Reservation) => {
      const result = await FlorinApiService.updateReservation(reservation);
      return result;
    },
    onSuccess: (updatedReservation) => {
      // Invalidate specific reservation query
      queryClient.invalidateQueries({
        queryKey: ['reservation', updatedReservation.reservationId],
      });

      // Invalidate reservations by owner queries
      queryClient.invalidateQueries({
        queryKey: ['reservations', 'owner'],
      });

      // Invalidate active reservations queries
      queryClient.invalidateQueries({
        queryKey: ['reservations', 'active'],
      });
    },
  });
}
