import { useQuery } from '@tanstack/react-query';
import { FlorinAPI } from '@/lib/api';
import { Position } from '@/lib/types';

/**
 * Hook to fetch positions by owner address
 */
export function usePositionsByOwner(ownerAddress: string | undefined) {
  return useQuery<Position[]>({
    queryKey: ['positions', 'owner', ownerAddress],
    queryFn: () => ownerAddress ? FlorinAPI.getPositionsByOwner(ownerAddress) : Promise.resolve([]),
    enabled: !!ownerAddress,
  });
} 