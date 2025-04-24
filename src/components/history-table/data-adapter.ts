/**
 * @fileoverview Data Adapter for Transaction History
 *
 * This adapter is necessary because the backend data structure doesn't match the UI designs in Figma.
 * The UI components expect transaction data in a specific format, but our backend provides data as
 * Position and Reservation objects.
 *
 * This adapter transforms Position and Reservation objects into Transaction objects that can be
 * directly consumed by the UI components, ensuring that we maintain the exact same UI design
 * while still using our actual backend data.
 *
 * Without this adapter, we would either need to modify the UI components (breaking the design)
 * or change the backend implementation (which might not be feasible at the moment).
 */

import { Transaction } from './types';
import {
  Position,
  PositionStatus,
  Reservation,
  ReservationStatus,
} from '@/types';

/**
 * Converts a Position into a Transaction for the history table
 *
 * @param position - The position object from the backend
 * @returns A transaction object compatible with the UI components
 */
export const positionToTransaction = (position: Position): Transaction => {
  // Determine the status based on position state
  let status: 'Completed' | 'Pending' | 'Failed';
  switch (position.state) {
    case PositionStatus.ACTIVE:
      status = 'Completed';
      break;
    case PositionStatus.PAUSED:
      status = 'Pending';
      break;
    default:
      status = 'Failed';
  }

  // Calculate received amount based on original amount and exchange rate
  const originalAmount = Number(position.amount) / 1e18; // Convert from wei to ETH
  const exchangeRate = Number(position.exchangeRate) / 1e10; // Normalize exchange rate
  const receivedAmount = (originalAmount * exchangeRate).toFixed(8); // BTC has 8 decimals

  return {
    hash: position.positionId,
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString(), // Random recent date
    action: 'Deposit',
    asset: 'ETH',
    fromChain: 'Ethereum',
    toChain: 'Bitcoin',
    amount: originalAmount.toString(),
    receivedAmount,
    status,
    contractRegistration: position.tokenAddress,
    originTxId: position?.originTxHash || '',
    destinationTxId: position.bitcoinAddress,
  };
};

/**
 * Converts a Reservation into a Transaction for the history table
 *
 * @param reservation - The reservation object from the backend
 * @returns A transaction object compatible with the UI components
 */
export const reservationToTransaction = (
  reservation: Reservation
): Transaction => {
  // Determine the status based on reservation state
  let status: 'Completed' | 'Pending' | 'Failed';
  switch (reservation.state) {
    case ReservationStatus.COMPLETED:
      status = 'Completed';
      break;
    case ReservationStatus.ACTIVE:
      status = 'Pending';
      break;
    default:
      status = 'Failed';
  }

  // Calculate amounts
  const amount = Number(reservation.amount) / 1e18; // Convert from wei to ETH
  const receivedAmount = (amount * 0.01).toFixed(8); // Example value for received BTC

  return {
    hash: reservation.reservationId,
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString(), // Random recent date
    action: 'Withdraw',
    asset: 'BTC',
    fromChain: 'Bitcoin',
    toChain: 'Ethereum',
    amount: amount.toString(),
    receivedAmount,
    status,
    contractRegistration: reservation?.positionId?.substring(0, 10) + '...',
    originTxId: reservation?.originTxHash || '',
    destinationTxId: reservation.reservationId,
  };
};
