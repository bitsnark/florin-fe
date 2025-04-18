import { useQuery } from '@tanstack/react-query';
import { FlorinAPI } from '@/lib/api';
import { Reservation } from '@/lib/types';

/**
 * Hook to fetch reservations by owner address
 */
export function useReservationsByOwner(ownerAddress: string | undefined) {
  return useQuery<Reservation[]>({
    queryKey: ['reservations', 'owner', ownerAddress],
    queryFn: () =>
      ownerAddress
        ? FlorinAPI.getReservationsByOwner(ownerAddress)
        : Promise.resolve([]),
    enabled: !!ownerAddress,
  });
}
