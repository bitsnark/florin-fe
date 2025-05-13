import { TransactionStep } from './transaction-step';
import { EthTransactionCard } from './eth-transaction-card';
import { BtcCompletionCard } from './btc-completion-card';
import { BaseTransactionTracker } from './base-transaction-tracker';
import { useTrackerState } from '../../hooks/useTrackerState';
import { usePosition } from '@/hooks/queries/usePosition';
import { useEffect, useState, useRef } from 'react';
import { Position, PositionStatus } from '@/types';
import { useUpdatePosition } from '@/hooks/mutations/useUpdatePosition';
import { gasFee } from '@/lib/utils';
import { useTxConfirmations } from '@/hooks/useTxConfirmations';
import { useEVMPositionPolling } from '@/hooks/useEVMPositionPolling';
import { useChainId } from 'wagmi';

interface PositionTrackerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

export function PositionTracker({
  open,
  onOpenChange,
  id,
}: PositionTrackerProps) {
  const { data: position, isLoading, error } = usePosition(id, {});
  const updatePosition = useUpdatePosition();
  const hasUpdatedPosition = useRef(false);
  const chainId = useChainId();
  
  const { evmPosition } = useEVMPositionPolling({
    positionId: position?.positionId || '',
    chainId: chainId || 0,
    isActive: open,
  });

  console.log('evmPosition', position?.positionId, evmPosition);
  useTrackerState({
    hasOriginTxId: !!position?.originTxHash,
    hasDestinationTxId: !!position?.destinationTxHash,
    transactionStatus: position?.status,
  });

  const confirmations = useTxConfirmations({
    isActive: open,
    maxConfirmations: 20,
    transactionHash: position?.contractRegistrationTxHash,
  });

  const isPositionCompleted = position?.state === PositionStatus.Closed;
  const [bridgeCompleted, setBridgeCompleted] = useState(isPositionCompleted);

  // Update bridge status when position is completed
  useEffect(() => {
    if (isPositionCompleted) {
      setBridgeCompleted(true);
    }
  }, [isPositionCompleted]);

  // Update position status when confirmations reach threshold
  useEffect(() => {
    const shouldUpdatePosition =
      confirmations === 20 &&
      position &&
      !hasUpdatedPosition.current &&
      !bridgeCompleted;

    if (shouldUpdatePosition) {
      hasUpdatedPosition.current = true;

      updatePosition.mutate(
        {
          ...position,
          originTxHash: '0xoriginRandomHash',
          destinationTxHash: '0xdestinationRandomHash',
          state: PositionStatus.Closed,
          receivedAmount: (Number(position.amount) - gasFee).toString(),
        } as Position,
        {
          onSuccess: () => setBridgeCompleted(true),
          onError: (error) => console.error('Error updating position:', error),
        }
      );
    }
  }, [confirmations, position, updatePosition, bridgeCompleted]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setBridgeCompleted(false);
      hasUpdatedPosition.current = false;
    }
  }, [open]);

  // Display confirmations based on position state
  const displayConfirmations = isPositionCompleted ? 20 : confirmations;

  return (
    <BaseTransactionTracker
      open={open}
      onOpenChange={onOpenChange}
      isLoading={isLoading}
      error={error}
    >
      {position && (
        <>
          {/* Step 1 - Initiating transaction */}
          <TransactionStep
            title="Initiating transaction"
            description="Sending your request to the smart contract. It might take up to 5 min."
            status="completed"
            completed={true}
            isStepOne={true}
          >
            <EthTransactionCard
              data={{
                amount: position.amount,
                recipientAddress: position.positionId,
                reservationTx: position?.contractRegistrationTxHash || '',
                confirmations: displayConfirmations,
                fiatAmount: '100',
              }}
            />
          </TransactionStep>

          {/* Step 2 - Bridging complete */}
          <TransactionStep
            title="Bridging complete"
            description="Funds (BTC) are in your wallet now"
            status={bridgeCompleted ? 'completed' : 'pending'}
            completed={bridgeCompleted}
            isLastStep={true}
          >
            {bridgeCompleted && (
              <BtcCompletionCard
                amount={position.amount}
                recipientAddress={position.positionId}
                reservationTx={position?.contractRegistrationTxHash || ''}
                type="position"
              />
            )}
          </TransactionStep>
        </>
      )}
    </BaseTransactionTracker>
  );
}
