import {
  TransactionHistoryItem,
  TransactionStatus,
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
  chainId: number;
  ownerAddress: string;
  tokenAddress: `0x${string}`;
  bitcoinAddress: string;
  exchangeRate: string;
  state: TransactionStatus;
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

const mapTxStatus = (
  status: PositionStatus | ReservationStatus
): TransactionStatus => {
  switch (status) {
    case PositionStatus.Active:
      return TransactionStatus.Pending;
    case PositionStatus.Closed:
      return TransactionStatus.Completed;
    case PositionStatus.Paused:
      return TransactionStatus.Pending;
    case ReservationStatus.Pending:
      return TransactionStatus.Pending;
    case ReservationStatus.Settled:
      return TransactionStatus.Completed;
    case ReservationStatus.Expired:
      return TransactionStatus.Failed;
    case ReservationStatus.Canceled:
      return TransactionStatus.Failed;
    default:
      return TransactionStatus.Pending;
  }
};
/**
 * Transforms a TransactionHistoryItem into a TransactionResponse object
 * This adapter ensures compatibility with the existing table component
 */
export function transactionHistoryAdapter(item: TransactionHistoryItem): TransactionNormalized {
  console.log('item', item);
  return {
    type: !item.reservationId ? 'position' : 'reservation',
    fromChain: !item.reservationId ? "bitcoin" : "ethereum",
    toChain: !item.reservationId ? "ethereum" : "bitcoin",
    positionId: item.positionId,
    chainId: item.registrationChain,
    ownerAddress: item.ownerAddress,
    tokenAddress: item.tokenAddress as `0x${string}`,
    bitcoinAddress: item.bitcoinAddress,
    exchangeRate: '1', // Not available in new API
    state: mapTxStatus(item?.state), // Default to ACTIVE as we don't have this info
    registrationFinality:
      item.registrationFinality === 'FINAL' ? Finality.FINAL : Finality.UNKNOWN,
    amount: formatEther(BigInt(item.amount)),
    blockNumber: item.registrationBlockNumber,
    blockHash: item.registrationBlockHash,
    createdAt: new Date().toISOString(), // Not available in new API, using current time
    contractRegistrationTxHash: item.registrationTxhash,
    originTxHash: item.originTxhash,
    destinationTxHash: item.destinationTxHash || '',
    destinationsTxConfirmations: item.destinationTxConfirmations, // Not available in new API
  };
}
