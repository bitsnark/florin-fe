/**
 * @fileoverview Custom hook for fetching and transforming transaction data
 *
 * This hook bridges the gap between the backend data model and the UI requirements.
 * It uses our existing query hooks and transforms their data into Transaction objects
 * that match the exact format expected by the UI components designed in Figma.
 */

import { Transaction } from '@/components/history-table/types';
import {
  positionToTransaction,
  reservationToTransaction,
} from '@/components/history-table/data-adapter';
import { useActivePositions } from './queries/useActivePositions';
import { useReservationsByOwner } from './queries/useReservationsByOwner';

/**
 * Custom hook to transform position and reservation data into transactions
 * @param ownerAddress - Ethereum address of the owner
 * @returns A React Query result with transaction data and status information
 */
export function useTransactions(
  ownerAddress = '0xabc123def456abc123def456abc123def456abc1'
) {
  // Use our individual hooks instead of defining queries directly
  const {
    data: positions = [],
    isLoading: isLoadingPositions,
    isError: isErrorPositions,
    error: positionsError,
  } = useActivePositions();

  const {
    data: reservations = [],
    isLoading: isLoadingReservations,
    isError: isErrorReservations,
    error: reservationsError,
  } = useReservationsByOwner(ownerAddress);

  // Derive loading and error states
  const isLoading = isLoadingPositions || isLoadingReservations;
  const isError = isErrorPositions || isErrorReservations;
  const error = positionsError || reservationsError;

  // Transform and combine data only when both sets are available
  let transactions: Transaction[] = [];

  if (!isLoading && !isError) {
    const positionTransactions = positions.map(positionToTransaction);
    const reservationTransactions = reservations.map(reservationToTransaction);

    // Combine and sort by date (most recent first)
    transactions = [...positionTransactions, ...reservationTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  // Return data and status in a format consistent with React Query hooks
  return {
    data: transactions,
    isLoading,
    isError,
    error,
  };
}
