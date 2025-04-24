import { ReservationStatus } from '@/types';
import { useTimer } from './TimerLogic';
import { TransactionStep } from './TransactionStep';
import { BtcTransactionCard } from './BtcTransactionCard';
import { BtcSendStep } from './BtcSendStep';
import { EthCompletionCard } from './EthCompletionCard';
import { BaseTransactionTracker } from './BaseTransactionTracker';
import { useTrackerState } from './useTrackerState';
import { useReservation } from '@/hooks/queries/useReservation';

interface ReservationTrackerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

export function ReservationTracker({
  open,
  onOpenChange,
  id,
}: ReservationTrackerProps) {
  const { timeLeft, progress } = useTimer(open);
  const { data: reservation, isLoading, error } = useReservation(id, {});

  const {
    sendBtcStepCompleted,
    stepThreeCompleted,
    btcTransactionDetected,
    bridgingCompleted,
    confirmations,
  } = useTrackerState({
    isActive: open,
    hasOriginTxId: !!reservation?.originTxHash,
    hasDestinationTxId: !!reservation?.destinationTxHash,
    transactionStatus: reservation?.status,
  });

  // Content height class for the dialog
  const maxHeightClass = !sendBtcStepCompleted
    ? 'max-h-[90vh] md:h-[813px]'
    : 'max-h-[90vh]';

  return (
    <BaseTransactionTracker
      open={open}
      onOpenChange={onOpenChange}
      isLoading={isLoading}
      error={error}
      maxHeight={maxHeightClass}
    >
      {reservation && (
        <>
          {/* Step 1 - Request Transfer */}
          <TransactionStep
            title="Request transfer"
            description="Sending your request to the smartcontract."
            status="completed"
            completed={true}
            isStepOne={true}
          >
            <BtcTransactionCard
              data={{
                amount: reservation.amount,
                recipientAddress: reservation.reservationId,
                reservationTx: reservation?.contractRegistrationTxHash || '',
                confirmations: confirmations,
                fiatAmount: '100',
              }}
            />
          </TransactionStep>

          {/* Step 2 - Send BTC */}
          <BtcSendStep
            amount={reservation.amount}
            timeLeft={timeLeft}
            progress={progress}
            isSent={sendBtcStepCompleted}
            confirmations={confirmations}
            state={reservation.state as ReservationStatus}
          />

          {/* Step 3 - BTC Transaction Detected */}
          <TransactionStep
            title="BTC transaction detected"
            description="Your bitcoin transfer was mined."
            status={btcTransactionDetected ? 'completed' : 'pending'}
            completed={btcTransactionDetected}
          >
            {stepThreeCompleted && btcTransactionDetected && (
              <BtcTransactionCard
                data={{
                  amount: reservation.amount,
                  txid: reservation?.destinationTxHash || '',
                  confirmations,
                  fiatAmount: '100',
                }}
                isStepThree={true}
              />
            )}
          </TransactionStep>

          {/* Step 4 - Transaction Complete */}
          <TransactionStep
            title="Bridging complete"
            description="Funds (xBTC) are in your wallet now."
            status={bridgingCompleted ? 'completed' : 'pending'}
            isLastStep={true}
            completed={bridgingCompleted}
          >
            {bridgingCompleted && (
              <EthCompletionCard
                amount={reservation.amount}
                recipientAddress={reservation.bitcoinAddress || ''}
                reservationTx={reservation?.hash || ''}
              />
            )}
          </TransactionStep>
        </>
      )}
    </BaseTransactionTracker>
  );
}
