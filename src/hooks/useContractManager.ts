import { ContractManager } from '@/services/ContractManager';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';

export const useContractManager = () => {
  const { address } = useAccount();
  const chainId = useChainId();

  return useQuery({
    queryKey: ['contractManager'],
    queryFn: async () => {
      const manager = await ContractManager.getInstance();
      await manager.refreshWalletClient();
      return manager;
    },
    throwOnError: true, 
    enabled: !!address && !!chainId,
    staleTime: 0,
  });
};
