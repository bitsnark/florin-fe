import { useQuery } from '@tanstack/react-query';
import { FlorinApiService } from '@/services/Api';

interface UseBtcBlockConfirmationsProps {
  isActive: boolean;
  blockNumber?: number;
}

export function useBtcBlockConfirmations({
  isActive,
  blockNumber,
}: UseBtcBlockConfirmationsProps) {
  const { data: currentBlockHeight } = useQuery({
    queryKey: ['btc-block-count'],
    queryFn: () => FlorinApiService.getBtcBlockCount(),
    enabled: isActive && !!blockNumber,
  });

  const blockCount = currentBlockHeight?.blockCount;
  if (!isActive || !blockNumber || !blockCount) {
    return 0;
  }

  
  return Math.max(0, blockCount - blockNumber);
} 