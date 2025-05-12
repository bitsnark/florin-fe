import { Position, Reservation, TransactionHistoryItem, TransactionStatus, PositionStatus, Finality } from '@/types';
import { formatEther } from 'viem';

/**
 * Transforms a TransactionHistoryItem into a Position object
 * This adapter ensures compatibility with the existing table component
 */
export function transactionHistoryToPosition(item: TransactionHistoryItem): Position {
  console.log('item', item);
  return {
    positionId: item.positionId,
    chainId: item.registrationChain,
    ownerAddress: item.ownerAddress,
    tokenAddress: item.tokenAddress as `0x${string}`,
    bitcoinAddress: item.bitcoinAddress,
    exchangeRate: '1', // Not available in new API
    state: item?.state || PositionStatus.ACTIVE, // Default to ACTIVE as we don't have this info
    finality: item.registrationFinality === 'FINAL' ? Finality.FINAL : Finality.UNKNOWN,
    amount: formatEther(BigInt(item.amount)),
    blockNumber: item.registrationBlockNumber,
    blockHash: item.registrationBlockHash,
    hash: item.registrationTxhash,
    createdAt: new Date().toISOString(), // Not available in new API, using current time
    status: mapFinalityToTransactionStatus(item.registrationFinality),
    contractRegistrationTxHash: item.registrationTxhash,
    originTxHash: item.originTxhash,
    destinationTxHash: undefined, // Not available in new API
    originTxConfirmations: undefined, // Not available in new API
    destinationsTxConfirmations: undefined, // Not available in new API
  };
}

/**
 * Maps the finality status from the new API to TransactionStatus
 */
function mapFinalityToTransactionStatus(finality: 'FINAL' | 'PENDING' | 'FAILED'): TransactionStatus {
  switch (finality) {
    case 'FINAL':
      return TransactionStatus.COMPLETED;
    case 'PENDING':
      return TransactionStatus.PENDING;
    case 'FAILED':
      return TransactionStatus.FAILED;
    default:
      return TransactionStatus.NONE;
  }
}

/**
 * Transforms an array of TransactionHistoryItem into an array of Position
 */
export function transactionHistoryToPositions(items: TransactionHistoryItem[]): Position[] {
  return items.map(transactionHistoryToPosition);
}

/**
 * Since the new API doesn't provide reservation data, we return an empty array
 * This maintains compatibility with the existing table component
 */
export function transactionHistoryToReservations(_items: TransactionHistoryItem[]): Reservation[] {
  return [];
} 