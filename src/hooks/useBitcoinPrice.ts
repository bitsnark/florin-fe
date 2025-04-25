import { useQuery } from '@tanstack/react-query';
import { BitcoinOracle, BitcoinPrice } from '@/services/BitcoinOracle';

export function useBitcoinPrice() {
  return useQuery<BitcoinPrice>({
    queryKey: ['bitcoin-price'],
    queryFn: () => BitcoinOracle.getBitcoinPrice(),
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });
} 