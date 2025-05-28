import { useQuery } from '@tanstack/react-query';
import { useExchange } from './useExchange';

interface UseEVMReservationPollingProps {
  reservationId: string;
  chainId: number;
  isActive?: boolean;
  pollingInterval?: number;
}

export const useEVMReservationPolling = ({
  reservationId,
  chainId,
  isActive = true,
  pollingInterval = 5000,
}: UseEVMReservationPollingProps) => {
  const { getReservation } = useExchange();

  const queryKey = ['evmReservation', reservationId, chainId];

  const { data: evmReservation, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => getReservation({ reservationId, chainId }),
    enabled: isActive && !!reservationId && !!chainId,
    refetchInterval: isActive ? pollingInterval : false,
    refetchIntervalInBackground: false,
    staleTime: 0,
  });

  return {
    evmReservation,
    error: error as Error | null,
    isLoading,
  };
}; 