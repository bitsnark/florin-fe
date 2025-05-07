//import { useContractManager } from '@/hooks/useContractManager';
import { FlorinApiService } from '@/services/Api';
import {
  Finality,
  Position,
  PositionStatus,
  Reservation,
  ReservationStatus,
  TransactionStatus,
} from '@/types';
import { useState } from 'react';
import { Address /* keccak256, toBytes */ } from 'viem';
import { v4 as uuidv4 } from 'uuid';
import { CONTRACTS_ADDRESS } from '@/constants/contracts';
import { ContractManager } from '@/services/ContractManager';

export const useExchange = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openPosition = async ({
    tokenAmount,
    exchangeRate,
    bitcoinAddresses = '0x9f3c9346dd5edc74032aef79b3e4585f7a4dffb51aa3780704e63f87c4170dd3',
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
      setLoading(true);
     

      const contractManager = await ContractManager.getInstance();
      const contractAddress = CONTRACTS_ADDRESS[
        chainId as keyof typeof CONTRACTS_ADDRESS
      ].ammExchange as Address;
      const tokenAddress = CONTRACTS_ADDRESS[
        chainId as keyof typeof CONTRACTS_ADDRESS
      ].erc20BitSnark as Address;

      const mockBlockNumber = Math.floor(Math.random() * 1000000);

      //get erc20BitSnark token name
      const tokenName = await contractManager.readContract(
        'ERC20BitSnark',
        'name',
        [],
        tokenAddress
      );

      console.log('tokenName', tokenName);
      // Get nonce from token
      const nonce = await contractManager.readContract(
        'ERC20BitSnark',
        'nonces',
        [owner],
        tokenAddress
      );
      console.log('nonce', nonce);
      const domain = {
        name: tokenName,
        version: '1',
        verifyingContract: tokenAddress,
      };
      console.log('domain', domain);

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

      console.log('signature', signature);
      
      const { r, s, v } = contractManager.getRSV(signature);
      // Convert bech32 address to a valid bytes32 value
      const encoder = new TextEncoder();
      const bytes = encoder.encode(bitcoinAddresses);
      const bytes32 = `0x${Array.from(bytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .slice(0, 64)
        .padEnd(64, '0')}`;
      
      console.log('Parameters being sent to contract:', {
        tokenAmount: tokenAmount.toString(),
        exchangeRate: exchangeRate.toString(),
        bytes32,
        deadline: deadline.toString(),
        v,
        r,
        s
      });

      const { hash, wait } = await contractManager.writeContract(
        'AMMExchange',
        'openPosition',
        [
          tokenAmount, // bigint
          BigInt(exchangeRate), // convert to bigint for uint64
          bytes32 as `0x${string}`, // bytes32
          BigInt(deadline), // convert to bigint
          v, // uint8
          r, // bytes32
          s // bytes32
        ],
        contractAddress
      );
      console.log('hash', hash);
      const receipt = await wait();
      console.log('receipt', receipt);
      const transaction = {
        hash, // hash
        contractRegistrationTxHash: hash, // hash
        blockHash: `0x${Math.random().toString(16).slice(2)}`, // receipt.receipt?.blockHash
        blockNumber: mockBlockNumber, // receipt.receipt?.blockNumber
        status: TransactionStatus.PENDING,
        createdAt: new Date().toISOString(),
        receivedAmount: '0',
      };

      const newPosition: Position = {
        positionId: hash, // receipt.logs[0].args.positionId
        ownerAddress: owner,
        amount: tokenAmount.toString(),
        deadline: deadline,
        exchangeRate: exchangeRate.toString(), // receipt?.logs[0]?.args?.exchangeRate?.toString()
        tokenAddress: tokenAddress, // receipt.logs[0].address
        bitcoinAddress: bitcoinAddresses, // receipt.logs[0].args.bitcoinAddresses ? receipt.logs[0].args.bitcoinAddresses[0] : ''
        state: PositionStatus.ACTIVE,
        finality: Finality.FINAL,
        chainId: chainId,
        ...transaction,
      };

      await FlorinApiService.addPosition(newPosition);
      console.log('position created (mocked)!!!');
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
    console.log('reservePosition', evmReceivingAddress);
    try {
      setLoading(true);
      const contractManager = await ContractManager.getInstance();
      const tokenAddress = CONTRACTS_ADDRESS[
        chainId as keyof typeof CONTRACTS_ADDRESS
      ].erc20BitSnark as Address;
      // Mock data
      const mockHash = `0x${Math.random().toString(16).slice(2)}`;
      const mockBlockNumber = Math.floor(Math.random() * 1000000);
      const positionId = '1234';

      /* const rIdb32 = keccak256(toBytes(positionId)) as `0x${string}`;
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
        const rJson = JSON.stringify(receipt, (_, value) =>
          typeof value === 'bigint' ? value.toString() : value
        );
        window.localStorage.setItem('receitp_reservation', rJson);
      } catch (error) {
        console.log('error', error);
      } */

      const transaction = {
        hash: mockHash,
        contractRegistrationTxHash: mockHash,
        blockHash: `0x${Math.random().toString(16).slice(2)}`,
        blockNumber: mockBlockNumber,
        status: TransactionStatus.COMPLETED,
        receivedAmount: '0',
      };

      const newReservation: Reservation = {
        positionId: positionId,
        reservationId: uuidv4(),
        ownerAddress: owner,
        amount: tokenAmount.toString(),
        tokenAddress: tokenAddress,
        state: ReservationStatus.ACTIVE,
        finality: Finality.FINAL,
        chainId: chainId,
        ...transaction,
        createdAt: new Date().toISOString(),
      };

      await FlorinApiService.addReservation(newReservation);
      console.log('reservation created (mocked)!!!');
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
