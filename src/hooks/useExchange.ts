import { env } from '@/config/env';
import { useContractManager } from '@/hooks/useContractManager';
import { FlorinApiService } from '@/services/Api';
import {
  Finality,
  Position,
  PositionStatus,
  Reservation,
  ReservationStatus,
  Transaction,
  TransactionStatus,
} from '@/types';
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
    chainId,
  }: {
    tokenAmount: bigint;
    exchangeRate: number;
    bitcoinAddresses: `0x${string}`;
    deadline: number;
    owner: Address;
    chainId: number;
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
      const rJson = JSON.stringify(receipt, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      );
      console.log('rJson', rJson);
      const transaction: Transaction = {
        hash: hash,
        contractRegistration: hash,
        blockHash: receipt.receipt?.blockHash,
        blockNumber: receipt.receipt?.blockNumber,
        status: receipt.receipt?.status,
        date: new Date().toISOString(),
        receivedAmount: '0',
      };
      const newPosition: Position = {
        positionId: receipt.logs[0].args.positionId,
        ownerAddress: owner,
        amount: tokenAmount.toString(),
        deadline: deadline,
        exchangeRate: receipt?.logs[0]?.args?.exchangeRate?.toString(),
        tokenAddress: receipt.logs[0].address,
        bitcoinAddress: receipt.logs[0].args.bitcoinAddresses ? receipt.logs[0].args.bitcoinAddresses[0] : '',
        transaction: transaction,
        state: PositionStatus.ACTIVE,
        finality: Finality.FINAL,
        chainId: chainId,
      };
      //window.localStorage.setItem('receipt_position', rJson);
      await FlorinApiService.addPosition(newPosition);
      console.log('position created!!!');
      setLoading(false);
      return newPosition;
    } catch (error) {
      setLoading(false);
      setError((error as Error).message);
      console.log('openPosition error', error);
    }
  };

  const reservePosition = async ({
    evmReceivingAddress,
    tokenAmount,
    chainId,
    owner,
  }: {
    evmReceivingAddress: Address;
    tokenAmount: bigint;
    chainId: number;
    owner: Address;
  }) => {
    console.log('reservePosition');
    try {
      if (!contractManager) throw new Error('contractManager not available');
      setLoading(true);
      /* const positionReceit = JSON.parse(
        window.localStorage.getItem('receipt_position') || ''
      ); */

      const positionId = '1234'; //positionReceit?.logs[0].args?.positionId;
      const rIdb32 = keccak256(toBytes(positionId)) as `0x${string}`;
      console.log('positionReceit', positionId);
      let writeReceipt;
      let receipt;
      try {
        writeReceipt = await contractManager.writeContract(
          'AMMExchange',
          'reservePosition',
          [rIdb32, positionId, evmReceivingAddress, tokenAmount],
          contractAddress,
          { value: 0n }
        );
        receipt = await writeReceipt.wait();
        console.log('receipt', receipt);
        const rJson = JSON.stringify(receipt, (_, value) =>
          typeof value === 'bigint' ? value.toString() : value
        );
        window.localStorage.setItem('receitp_reservation', rJson);
      } catch (error) {
        console.log('sadasd', error);
      }

      const transaction: Transaction = {
        hash: receipt?.hash || '0xrandomhash',
        contractRegistration: receipt?.hash || '0xrandomhash',
        blockHash: receipt?.receipt?.blockHash || '0xrandomhash',
        blockNumber: receipt?.receipt?.blockNumber || '1234',
        status: receipt?.receipt?.status || TransactionStatus.PENDING,
        date: new Date().toISOString(),
        receivedAmount: '0',
      };

      const newReservation: Reservation = {
        positionId: positionId,
        reservationId: receipt?.logs ? receipt.logs[0].args.reservationId : '0',
        ownerAddress: owner,
        amount: tokenAmount.toString(),
        tokenAddress: receipt?.logs ? receipt.logs[0].address : '0x123',
        state: ReservationStatus.ACTIVE,
        finality: Finality.FINAL,
        chainId: chainId,
        transaction: transaction,
      };
      console.log('newReservation', newReservation);
      await FlorinApiService.addReservation(newReservation);

      setLoading(false);
      return newReservation;
    } catch (error) {
      setLoading(false);
      setError((error as Error).message);
      console.log('reservePosition error', error);
    }
  };

  return {
    loading,
    error,
    openPosition,
    reservePosition,
  };
};
