import { useQuery } from '@tanstack/react-query';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

interface BitcoinPrice {
  bitcoin: {
    usd: number;
    usd_24h_change: number;
  };
}

export function useBitcoinPrice() {
  return useQuery<BitcoinPrice>({
    queryKey: ['bitcoin-price'],
    queryFn: async () => {
      const response = await fetch(
        `${COINGECKO_API_URL}/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch Bitcoin price');
      }
      
      return response.json();
    },
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });
} 