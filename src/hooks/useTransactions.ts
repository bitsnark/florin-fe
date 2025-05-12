/**
 * @fileoverview Custom hook for fetching and transforming transaction data
 *
 * This hook bridges the gap between the backend data model and the UI requirements.
 * It uses our existing query hooks and transforms their data into Transaction objects
 * that match the exact format expected by the UI components designed in Figma.
 */

import { Transaction } from '@/components/history-table/types';
import { Position, Reservation } from '@/types';
import { useTransactionHistory } from './queries/useTransactionHistory';
import { transactionHistoryToPositions, transactionHistoryToReservations } from '@/components/history-table/transaction-history-adapter';
import { positionToTransaction, reservationToTransaction } from '@/components/history-table/data-adapter';

/**
 * Custom hook to transform transaction history data into transactions
 * @param ownerAddress - Ethereum address of the owner
 * @returns A React Query result with transaction data and status information
 */
export function useTransactions(ownerAddress: string | undefined) {
  const {
    data: transactionHistory = [],
    isLoading,
    isError,
    error,
  } = useTransactionHistory(ownerAddress);

  console.log('transactionHistory', transactionHistory);
  // Transform the transaction history into positions and reservations
  const positions = transactionHistoryToPositions(transactionHistory);
  const reservations = transactionHistoryToReservations(transactionHistory);

  // Transform positions and reservations into transactions
  const transactions: Transaction[] = !isLoading && !isError
    ? [
        ...positions.map(positionToTransaction),
        ...reservations.map(reservationToTransaction),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : [];

  return {
    data: transactions,
    isLoading,
    isError,
    error,
  };
}
