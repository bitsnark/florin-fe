import { useQuery } from '@tanstack/react-query';
import { Reservation } from '@/types';
import { FlorinApiService } from '@/services/Api';

export function useActiveReservations() {
  return useQuery<Reservation[]>({
    queryKey: ['reservations', 'active'],
    queryFn: () => FlorinApiService.getActiveReservations(),
  });
}
