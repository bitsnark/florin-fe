import { useQuery } from '@tanstack/react-query';
import { FlorinAPI } from '@/lib/api';
import { Reservation } from '@/lib/types';

/**
 * Hook to fetch a single reservation by ID
 */
export function useReservation(reservationId: string | undefined) {
  return useQuery<Reservation>({
    queryKey: ['reservation', reservationId],
    queryFn: () =>
      reservationId
        ? FlorinAPI.getReservationById(reservationId)
        : Promise.reject('No reservation ID provided'),
    enabled: !!reservationId,
  });
}
