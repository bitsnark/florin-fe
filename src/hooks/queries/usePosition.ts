import { useQuery } from '@tanstack/react-query';
import { FlorinAPI } from '@/lib/api';
import { Position } from '@/lib/types';

/**
 * Hook to fetch a single position by ID
 */
export function usePosition(positionId: string | undefined) {
  return useQuery<Position>({
    queryKey: ['position', positionId],
    queryFn: () =>
      positionId
        ? FlorinAPI.getPositionById(positionId)
        : Promise.reject('No position ID provided'),
    enabled: !!positionId,
  });
}
