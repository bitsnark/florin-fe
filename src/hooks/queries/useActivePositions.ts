import { useQuery } from '@tanstack/react-query';
import { Position } from '@/types';
import { FlorinApiService } from '@/services/Api';

/**
 * Hook to fetch all active positions
 */
export function useActivePositions() {
  return useQuery<Position[]>({
    queryKey: ['positions', 'active'],
    queryFn: () => FlorinApiService.getActivePositions(),
  });
}
