import { useQuery } from '@tanstack/react-query';
import { useExchange } from './useExchange';

interface UseEVMPositionPollingProps {
  positionId: string;
  chainId: number;
  isActive?: boolean;
  pollingInterval?: number;
}

export const useEVMPositionPolling = ({
  positionId,
  chainId,
  isActive = true,
  pollingInterval = 10000,
}: UseEVMPositionPollingProps) => {
  const { getPosition } = useExchange();

  const queryKey = ['evmPosition', positionId, chainId];
  const { data: evmPosition, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => getPosition({ positionId, chainId }),
    enabled: isActive && !!positionId && !!chainId,
    refetchInterval: isActive ? pollingInterval : false,
    refetchIntervalInBackground: false,
    staleTime: 0,
  });

  return {
    evmPosition,
    error: error as Error | null,
    isLoading,
  };
}; 