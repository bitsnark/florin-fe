import { useQuery } from '@tanstack/react-query';
import { FlorinApiService } from '@/services/Api';

interface UseBtcBlockConfirmationsProps {
  isActive: boolean;
  targetBlockHeight?: number;
}

export function useBtcBlockConfirmations({
  isActive,
  targetBlockHeight,
}: UseBtcBlockConfirmationsProps) {
  const { data: currentBlockHeight } = useQuery({
    queryKey: ['btc-block-count'],
    queryFn: () => FlorinApiService.getBtcBlockCount(),
    enabled: isActive && !!targetBlockHeight,
  });

  if (!isActive || !targetBlockHeight || !currentBlockHeight) {
    return 0;
  }

  return Math.max(0, currentBlockHeight - targetBlockHeight);
} 