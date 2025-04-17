import { env } from '@/config/env';
import { useContractManager } from '@/hooks/useContractManager';
import { randomUUID } from 'crypto';
import { useState } from 'react';
import { Address, keccak256, toBytes } from 'viem';

export const useExchange = () => {
  const { data: contractManager } = useContractManager();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contractAddress = env.VITE_EXCHANGE_CONTRACT_ADDRESS as Address;
  const tokenAddress = env.VITE_TOKEN_ADDRESS as Address; // Asegurate de definir esto

  const openPosition = async ({
    tokenAmount,
    exchangeRate,
    bitcoinAddresses,
    deadline,
    owner,
  }: {
    tokenAmount: bigint;
    exchangeRate: number;
    bitcoinAddresses: `0x${string}`;
    deadline: number;
    owner: Address;
  }) => {
    try {
      if (!contractManager) throw new Error('contractManager not available');

      setLoading(true);
      // Get nonce from token
      const nonce = await contractManager.readContract(
        'ERC20BitSnark',
        'nonces',
        [owner],
        tokenAddress
      );
      const domain = {
        name: 'BitSnark',
        version: '1',
        verifyingContract: tokenAddress,
      };

      const types = {
        Permit: [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
        ],
      };

      const message = {
        owner,
        spender: contractAddress,
        value: tokenAmount,
        nonce,
        deadline,
      };

      const signature = await contractManager.signTypedData({
        domain,
        types,
        primaryType: 'Permit',
        message,
      });
      const { r, s, v } = contractManager.getRSV(signature);
      const { hash, wait } = await contractManager.writeContract(
        'AMMExchange',
        'openPosition',
        [tokenAmount, exchangeRate, bitcoinAddresses, deadline, v, r, s],
        contractAddress
      );
      const receipt = await wait();
      console.log('receipt', receipt);
      console.log('hash', hash);
      const rJson = JSON.stringify(receipt, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      );
      console.log('rJson', rJson);
      window.localStorage.setItem('hash', hash);
      window.localStorage.setItem('receipt_position', rJson);
      console.log('position created!!!');
      setLoading(false);
      return receipt;
    } catch (error) {
      setLoading(false);
      setError((error as Error).message);
    }
  };

  const reservePosition = async ({
    reservationId,
    positionId,
    evmReceivingAddress,
    tokenAmount,
  }: {
    reservationId: bigint;
    positionId: Address;
    evmReceivingAddress: Address;
    tokenAmount: bigint;
  }) => {
    try {
      if (!contractManager) throw new Error('contractManager not available');

      setLoading(true);

      const positionReceit = JSON.parse(
        window.localStorage.getItem('receipt_position') || ''
      );
      const rIdb32 = keccak256(
        toBytes(positionReceit?.logs[0].args?.positionId)
      ) as `0x${string}`;
      console.log('positionReceit', positionReceit?.logs[0].args?.positionId);
      const { hash, wait } = await contractManager.writeContract(
        'AMMExchange',
        'reservePosition',
        [
          rIdb32,
          positionReceit?.logs[0].args?.positionId,
          evmReceivingAddress,
          tokenAmount,
        ],
        contractAddress,
        { value: 0n }
      );
      const receipt = await wait();
      console.log('receipt', receipt);
      const rJson = JSON.stringify(receipt, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      );
      window.localStorage.setItem('receitp_reservation', rJson);

      setLoading(false);
      return receipt;
    } catch (error) {
      setLoading(false);
      setError((error as Error).message);
    }
  };

  return {
    loading,
    error,
    openPosition,
    reservePosition,
  };
};
