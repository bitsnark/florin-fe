import { useQuery } from '@tanstack/react-query';
import { FlorinAPI } from '@/lib/api';
import { Position } from '@/lib/types';

/**
 * Hook to fetch all active positions
 */
export function useActivePositions() {
  return useQuery<Position[]>({
    queryKey: ['positions', 'active'],
    queryFn: () => FlorinAPI.getActivePositions(),
  });
}
