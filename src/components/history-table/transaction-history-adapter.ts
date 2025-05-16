import {
  TransactionHistoryItem,
  PositionStatus,
  Finality,
  ReservationStatus,
} from '@/types';
import { formatEther } from 'viem';

export type TransactionType = 'position' | 'reservation';
export type ChainType = 'bitcoin' | 'ethereum';

export interface TransactionNormalized {
  type: TransactionType;
  fromChain: ChainType;
  toChain: ChainType;
  positionId: string;
  reservationId?: string;
  chainId: number;
  ownerAddress: string;
  tokenAddress: `0x${string}`;
  bitcoinAddress: string;
  exchangeRate: string;
  state: PositionStatus | ReservationStatus;
  registrationFinality: Finality;
  amount: string;
  blockNumber: number;
  blockHash: string;
  createdAt: string;
  contractRegistrationTxHash: string;
  originTxHash: string;
  destinationTxHash: string;
  destinationsTxConfirmations?: number;
  receivedAmount?: string;
}

// Map numeric status to PositionStatus enum
export const mapNumericStatusToPositionStatus = (
  status: number
): PositionStatus => {
  switch (status) {
    case 1:
      return PositionStatus.None;
    case 2:
      return PositionStatus.Active;
    case 3:
      return PositionStatus.Paused;
    case 4:
      return PositionStatus.Closed;
    default:
      return PositionStatus.Active;
  }
};

export const mapNumericStatusToReservationStatus = (
  status: number
): ReservationStatus => {
  switch (status) {
    case 1:
      return ReservationStatus.None;
    case 2:
      return ReservationStatus.Pending;
    case 3:
      return ReservationStatus.Expired;
    case 4:
      return ReservationStatus.Canceled;
    case 5:
      return ReservationStatus.Settled;
    default:
      return ReservationStatus.Pending;
  }
};

/**
 * Parse a string in the format "bigint:12a05f200n" to extract the BigInt value
 */
export function parseBigIntString(value: string): bigint {
  if (typeof value === 'string' && value.startsWith('bigint:')) {
    // Extract the hexadecimal part (remove "bigint:" prefix and "n" suffix)
    const hexValue = value.substring(7, value.length - 1);
    return BigInt(`0x${hexValue}`);
  }

  // If the format is not recognized, try direct parsing
  return BigInt(value);
}

/**
 * Transforms a TransactionHistoryItem into a TransactionResponse object
 * This adapter ensures compatibility with the existing table component
 */
export function transactionHistoryAdapter(
  item: TransactionHistoryItem
): TransactionNormalized {
  const type = !item.reservationId ? 'position' : 'reservation';

  // Parse amount properly if it's in the bigint string format
  const originalAmountToUse = parseBigIntString(
    item.originalAmount || (item.amount as string)
  );

  const createdAtDate = item.blockTimestamp 
    ? new Date(parseInt(item.blockTimestamp) * 1000) // Convert seconds to milliseconds
    : new Date();

  return {
    ...item,
    type: type,
    fromChain: !item.reservationId ? 'ethereum' : 'bitcoin',
    toChain: !item.reservationId ? 'bitcoin' : 'ethereum',
    positionId: item.positionId,
    reservationId: item.reservationId,
    chainId: item.registrationChain,
    ownerAddress: item.ownerAddress,
    tokenAddress: item.tokenAddress as `0x${string}`,
    bitcoinAddress: item.bitcoinAddress,
    exchangeRate: '1', // Not available in new API
    state:
      type === 'position'
        ? mapNumericStatusToPositionStatus(item.state)
        : mapNumericStatusToReservationStatus(item.state),
    registrationFinality:
      item.registrationFinality === 'FINAL' ? Finality.FINAL : Finality.UNKNOWN,
    amount: formatEther(originalAmountToUse) || '0',
    blockNumber: item.registrationBlockNumber,
    blockHash: item.registrationBlockHash,
    createdAt: createdAtDate.toISOString(), // Not available in new API, using current time
    contractRegistrationTxHash: item.registrationTxhash,
    originTxHash: item.originTxhash,
    destinationTxHash: item.destinationTxHash || '',
    destinationsTxConfirmations: item.destinationTxConfirmations, // Not available in new API
  };
}
