import { useQuery } from '@tanstack/react-query';
import { FlorinApiService } from '@/services/Api';

interface UseBtcBlockConfirmationsProps {
  isActive: boolean;
  targetBlockNumber?: number;
}

export function useBtcBlockConfirmations({
  isActive,
  targetBlockNumber,
}: UseBtcBlockConfirmationsProps) {
  const { data: currentBlockHeight } = useQuery({
    queryKey: ['btc-block-count'],
    queryFn: () => FlorinApiService.getBtcBlockCount(),
    enabled: isActive && !!targetBlockNumber,
  });

  if (!isActive || !targetBlockNumber || !currentBlockHeight) {
    return 0;
  }

  return Math.max(0, currentBlockHeight - targetBlockNumber);
} 