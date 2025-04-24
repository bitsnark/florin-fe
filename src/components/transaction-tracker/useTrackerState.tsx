import { useEffect, useState } from 'react';
import { TransactionStatus } from '@/types';
import { useConfirmationsSimulator } from './useConfirmationsSimulator';

interface UseTrackerStateProps {
  isActive: boolean;
  hasOriginTxId: boolean;
  hasDestinationTxId: boolean;
  transactionStatus: TransactionStatus | undefined;
}

export function useTrackerState({
  isActive,
  hasOriginTxId,
  hasDestinationTxId,
  transactionStatus,
}: UseTrackerStateProps) {
  const [sendBtcStepCompleted, setSendBtcStepCompleted] = useState(false);
  const [stepThreeCompleted, setStepThreeCompleted] = useState(false);
  const [btcTransactionDetected, setBtcTransactionDetected] = useState(false);
  const [bridgingCompleted, setBridgingCompleted] = useState(false);

  const confirmations = useConfirmationsSimulator({
    isActive,
    maxConfirmations: 20,
  });

  useEffect(() => {
    if (confirmations === 20 && hasOriginTxId) {
      setTimeout(() => {
        setSendBtcStepCompleted(true);
        setStepThreeCompleted(true);
      }, 10000);
    }
  }, [confirmations, hasOriginTxId]);

  useEffect(() => {
    if (sendBtcStepCompleted && stepThreeCompleted && hasDestinationTxId) {
      setTimeout(() => {
        setBtcTransactionDetected(true);
      }, 10000);
    }
  }, [sendBtcStepCompleted, stepThreeCompleted, hasDestinationTxId]);

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

  return {
    sendBtcStepCompleted,
    stepThreeCompleted,
    btcTransactionDetected,
    bridgingCompleted,
    confirmations,
  };
}
