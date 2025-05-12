/**
 * @fileoverview Custom hook for fetching and transforming transaction data
 *
 * This hook bridges the gap between the backend data model and the UI requirements.
 * It uses our existing query hooks and transforms their data into Transaction objects
 * that match the exact format expected by the UI components designed in Figma.
 */

import { transactionHistoryAdapter } from '@/components/history-table/transaction-history-adapter';
import { useTransactionHistory } from './queries/useTransactionHistory';

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
  

  // Transform positions and reservations into transactions
  const transactions = !isLoading && !isError
    ? transactionHistory.map(transactionHistoryAdapter).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  return {
    data: transactions,
    isLoading,
    isError,
    error,
  };
}
