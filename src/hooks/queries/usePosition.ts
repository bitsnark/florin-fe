import { useQuery } from '@tanstack/react-query';
import { Position } from '@/types';
import { FlorinApiService } from '@/services/Api';

/**
 * Hook to fetch a single position by ID
 */
export function usePosition(positionId: string | undefined, {
  refetchInterval
}: { refetchInterval?: number }) {
  return useQuery<Position | null>({
    queryKey: ['position', positionId],
    queryFn: () => FlorinApiService.getPositionById(positionId),
    enabled: !!positionId,
    refetchInterval : refetchInterval || undefined
  });
}
