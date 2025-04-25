import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Position } from '@/types';
import { FlorinApiService } from '@/services/Api';

/**
 * Hook to update a position
 * This mutation will invalidate all position-related queries when successful
 */
export function useUpdatePosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (position: Position) => {
      const result = await FlorinApiService.updatePosition(position);
      return result;
    },
    onSuccess: (updatedPosition) => {
      // Invalidate specific position query
      queryClient.invalidateQueries({
        queryKey: ['position', updatedPosition.positionId],
      });

      // Invalidate positions by owner queries
      queryClient.invalidateQueries({
        queryKey: ['positions', 'owner'],
      });

      // Invalidate active positions queries
      queryClient.invalidateQueries({
        queryKey: ['positions', 'active'],
      });
    },
  });
}
