import { useQuery } from '@tanstack/react-query';
import { Position } from '@/types';
import { FlorinApiService } from '@/services/Api';

/**
 * Hook to fetch positions by owner address
 */
export function usePositionsByOwner(ownerAddress: string | undefined) {
  return useQuery<Position[]>({
    queryKey: ['positions', 'owner', ownerAddress],
    queryFn: () => FlorinApiService.getPositionsByOwner(ownerAddress),
    enabled: !!ownerAddress,
    staleTime: 1000 * 60 * 1, //1 minutes
  });
}
