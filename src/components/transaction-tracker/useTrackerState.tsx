import { useEffect, useState } from 'react';
import { Reservation, ReservationStatus, TransactionStatus } from '@/types';
import { useConfirmationsSimulator } from './useConfirmationsSimulator';
import { useUpdateReservation } from '@/hooks/mutations/useUpdateReservation';

interface UseTrackerStateProps {
  isActive: boolean;
  hasOriginTxId: boolean;
  hasDestinationTxId: boolean;
  transactionStatus: TransactionStatus | undefined;
  reservation?: Reservation;
}

export function useTrackerState({
  isActive,
  transactionStatus,
  reservation,
}: UseTrackerStateProps) {
  const { mutate: updateReservation } = useUpdateReservation();

  // Initialize states based on reservation data
  const [sendBtcStepCompleted, setSendBtcStepCompleted] = useState(
    !!reservation?.originTxHash
  );
  const [stepThreeCompleted, setStepThreeCompleted] = useState(
    !!reservation?.originTxHash
  );
  const [btcTransactionDetected, setBtcTransactionDetected] = useState(
    !!reservation?.destinationTxHash
  );
  const [bridgingCompleted, setBridgingCompleted] = useState(
    reservation?.state === ReservationStatus.COMPLETED
  );

  // Update states when reservation changes
  useEffect(() => {
    if (reservation) {
      setSendBtcStepCompleted(!!reservation.originTxHash);
      setStepThreeCompleted(!!reservation.originTxHash);
      setBtcTransactionDetected(!!reservation.destinationTxHash);
      setBridgingCompleted(reservation.state === ReservationStatus.COMPLETED);
    }
  }, [reservation]);

  const confirmations = useConfirmationsSimulator({
    isActive,
    maxConfirmations: 20,
  });

  useEffect(() => {
    if (
      btcTransactionDetected &&
      transactionStatus === TransactionStatus.COMPLETED
    ) {
      setTimeout(() => {
        setBridgingCompleted(true);
      }, 10000);
    }
  }, [btcTransactionDetected, transactionStatus]);

  // function to update the states of a reservation

  function handlePassToStepThree() {
    updateReservation(
      {
        ...reservation,
        originTxHash: '0xrandomhash',
      } as Reservation,
      {
        onSuccess: () => {
          setSendBtcStepCompleted(true);
          setStepThreeCompleted(true);
        },
      }
    );
  }

  function handleExpireReservation() {
    updateReservation({
      ...reservation,
      state: ReservationStatus.EXPIRED,
    } as Reservation);
  }

  function handleCompleteStepThree() {
    updateReservation({
      ...reservation,
      destinationTxHash: '0xrandomhash',
    } as Reservation);
    setStepThreeCompleted(true);
    setBtcTransactionDetected(true);
  }

  function handleCompleteStepFour() {
    updateReservation({
      ...reservation,
      state: ReservationStatus.COMPLETED,
      bitcoinAddress: 'bc1qeeaumkv7r9r5uc0aacrfzejv0dmu2cmlvva5gu',
    } as Reservation);
  }

  return {
    sendBtcStepCompleted,
    stepThreeCompleted,
    btcTransactionDetected,
    bridgingCompleted,
    confirmations,
    handleExpireReservation,
    handlePassToStepThree,
    handleCompleteStepThree,
    handleCompleteStepFour,
  };
}
