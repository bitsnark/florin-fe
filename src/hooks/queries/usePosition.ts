import { useQuery } from '@tanstack/react-query';
import { Position } from '@/types';
import { FlorinApiService } from '@/services/Api';

/**
 * Hook to fetch a single position by ID
 */
export function usePosition(positionId: string | undefined) {
  return useQuery<Position | undefined>({
    queryKey: ['position', positionId],
    queryFn: () => FlorinApiService.getPositionById(positionId),
    enabled: !!positionId,
  });
}
