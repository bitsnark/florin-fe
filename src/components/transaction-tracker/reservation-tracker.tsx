import { Reservation, ReservationStatus } from '@/types';
import { useTimer } from './timer-logic';
import { TransactionStep } from './transaction-step';
import { BtcTransactionCard } from './btc-transaction-card';
import { BtcSendStep } from './btc-send-step';
import { EthCompletionCard } from './eth-completion-card';
import { BaseTransactionTracker } from './base-transaction-tracker';
import { useTrackerState } from '../../hooks/useTrackerState';
import { useReservation } from '@/hooks/queries/useReservation';
import { Button } from '../ui/button';
import { useBitcoinPrice } from '@/hooks/useBitcoinPrice';
import { useMemo } from 'react';
import { useTxConfirmations } from '@/hooks/useTxConfirmations';
import { useEVMReservationPolling } from '@/hooks/useEVMReservationPolling';
import { useChainId } from 'wagmi';

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
  const { data: bitcoinPrice } = useBitcoinPrice();

  const fiatAmount = useMemo(() => {
    if (!reservation?.amount || !bitcoinPrice?.bitcoin?.usd) return '0';
    const btcAmount = parseFloat(reservation.amount);
    const usdValue = btcAmount * bitcoinPrice.bitcoin.usd;
    return usdValue.toFixed(2);
  }, [reservation?.amount, bitcoinPrice?.bitcoin?.usd]);

  const {
    sendBtcStepCompleted,
    stepThreeCompleted,
    btcTransactionDetected,
    bridgingCompleted,
    handlePassToStepThree,
    handleExpireReservation,
    handleCompleteStepThree,
    handleCompleteStepFour,
  } = useTrackerState({
    hasOriginTxId: !!reservation?.originTxHash,
    hasDestinationTxId: !!reservation?.destinationTxHash,
    transactionStatus: reservation?.status,
    reservation: reservation as Reservation,
  });

  const chainId = useChainId();

  const {evmReservation} = useEVMReservationPolling({
    reservationId: reservation?.reservationId || '',
    chainId: chainId || 0,
    isActive: open,
  });

  console.log('evmReservation', evmReservation);
  const confirmations = useTxConfirmations({
    isActive: open,
    maxConfirmations: 20,
    transactionHash: reservation?.contractRegistrationTxHash,
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
                confirmations:
                  reservation.state !== ReservationStatus.Expired &&
                  !reservation.originTxHash
                    ? parseFloat(fiatAmount) <= 100 // when we finally have this info we should replace this with the actual real data...
                      ? 20
                      : confirmations
                    : 20,
                fiatAmount: fiatAmount,
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
            reservation={reservation}
            handlePassToStepThree={handlePassToStepThree}
            handleExpireReservation={handleExpireReservation}
            fiatAmount={fiatAmount}
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
                  confirmations: 20,
                  fiatAmount: fiatAmount,
                }}
                isStepThree={true}
              />
            )}
            <Button
              variant="orange"
              size="sm"
              onClick={handleCompleteStepThree}
              className="mt-3"
            >
              Complete step
            </Button>
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
                reservationTx={
                  reservation?.hash || reservation?.destinationTxHash || ''
                }
                type="reservation"
              />
            )}
            <Button
              variant="orange"
              size="sm"
              onClick={handleCompleteStepFour}
              className="mt-3"
            >
              Complete step
            </Button>
          </TransactionStep>
        </>
      )}
    </BaseTransactionTracker>
  );
}
