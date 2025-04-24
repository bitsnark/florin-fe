import { TransactionStatus } from '@/types';
import { TransactionStep } from './TransactionStep';
import { EthTransactionCard } from './EthTransactionCard';
import { BtcCompletionCard } from './BtcCompletionCard';
import { BaseTransactionTracker } from './BaseTransactionTracker';
import { useTrackerState } from './useTrackerState';
import { usePosition } from '@/hooks/queries/usePosition';

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

  const { bridgingCompleted, confirmations } = useTrackerState({
    isActive: open,
    hasOriginTxId: !!position?.originTxHash,
    hasDestinationTxId: !!position?.destinationTxHash,
    transactionStatus: position?.status,
  });

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
                confirmations: confirmations,
                fiatAmount: '100',
              }}
            />
          </TransactionStep>

          {/* Step 2 - Bridging complete */}
          <TransactionStep
            title="Bridging complete"
            description="Funds (BTC) are in your wallet now"
            status={
              position?.status === TransactionStatus.COMPLETED
                ? 'completed'
                : 'pending'
            }
            completed={
              position?.status === TransactionStatus.COMPLETED
            }
            isLastStep={true}
          >
            {bridgingCompleted && (
              <BtcCompletionCard
                amount={position.amount}
                recipientAddress={position.positionId}
                reservationTx={position?.contractRegistrationTxHash || ''}
              />
            )}
          </TransactionStep>
        </>
      )}
    </BaseTransactionTracker>
  );
}
