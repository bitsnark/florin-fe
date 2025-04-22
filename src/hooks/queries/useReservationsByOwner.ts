import { useQuery } from '@tanstack/react-query';
import { Reservation } from '@/types';
import { FlorinApiService } from '@/services/Api';

/**
 * Hook to fetch reservations by owner address
 */
export function useReservationsByOwner(ownerAddress: string | undefined) {
  return useQuery<Reservation[]>({
    queryKey: ['reservations', 'owner', ownerAddress],
    queryFn: async () => {return await FlorinApiService.getReservationsByOwner(ownerAddress)},
    staleTime: Infinity,
    gcTime: 0,
    //enabled: !!ownerAddress,
  });
}
