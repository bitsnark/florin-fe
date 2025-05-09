import { useCallback, useEffect, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { ContractManager } from '@/services/ContractManager';
import { CMError } from '@/lib/errors';
import { Address, formatEther } from 'viem';
import { CONTRACTS_ADDRESS } from '@/constants/contracts';

export const useBitSnarkBalance = () => {
  const { address } = useAccount();
  const [balance, setBalance] = useState<bigint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chainId = useChainId();
  const erc20BitSnarkAddress = CONTRACTS_ADDRESS[
   chainId as keyof typeof CONTRACTS_ADDRESS
 ].erc20BitSnark as Address;

  const fetchBalance = useCallback(async () => {
    if (!address) {
      setBalance(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const contractManager = await ContractManager.getInstance();
      
      const result = await contractManager.readContract(
        'ERC20BitSnark',
        'balanceOf',
        [address],
        erc20BitSnarkAddress
      );
      setBalance(result as unknown as bigint);
    } catch (err) {
      if (err instanceof CMError) {
        setError(err.message);
      } else {
        setError('Failed to fetch balance');
      }
      console.error('Error fetching BitSnark balance:', err);
    } finally {
      setIsLoading(false);
    }
  }, [address, erc20BitSnarkAddress]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const xbtcAmount = balance ? formatEther(balance) : '0';
  return {
    balance: xbtcAmount,
    isLoading,
    error,
    refetch: fetchBalance,
  };
}; 