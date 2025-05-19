import { Card } from '@/components/ui/card';
import { TransactionStep } from './transaction-step';
import { WarningMessage } from './warning-message';
import { AddressReveal } from './address-reveal';
import { WarningIcon } from './warning-icon';
import { useState, useEffect } from 'react';
import { ReservationStatus, Reservation } from '@/types';

interface BtcSendStepProps {
  amount: string;
  recipientAddress?: string;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  progress: number;
  isSent: boolean;
  confirmations: number;
  state: ReservationStatus;
  reservation: Reservation;
  fiatAmount: string;
  maxConfirmations: number;
}

export function BtcSendStep({
  amount,
  recipientAddress,
  timeLeft,
  progress,
  isSent,
  confirmations,
  state,
  reservation,
  fiatAmount,
  maxConfirmations,
}: BtcSendStepProps) {
  const warningMessage = 'You can use any bitcoin wallet to send funds.';
  const [isReadyToSend, setIsReadyToSend] = useState(false);

  const descriptionMessage = isSent
    ? 'You initiated transaction in your wallet to send BTC.'
    : parseFloat(fiatAmount) > 100
      ? 'Your Bitcoin transaction has been detected. You need to send BTC from your bitcoin wallet to a specified address. If your transaction is $100+ in BTC, you must to wait for at least 6 confirmations before sending BTC. Make sure to send BTC within 12 hours.'
      : 'Your Bitcoin transaction has been detected. You can send BTC from your bitcoin wallet to a specified address. Make sure to send BTC within 12 hours.';
      
  useEffect(() => {
    if (confirmations >= maxConfirmations) {
      setIsReadyToSend(true);
    }
  }, [confirmations, maxConfirmations]);

  return (
    <TransactionStep
      title="Send BTC"
      description={descriptionMessage}
      status={
        reservation.state !== ReservationStatus.Expired &&
        (reservation.originTxHash || isReadyToSend)
          ? 'completed'
          : 'current'
      }
      completed={
        reservation.state !== ReservationStatus.Expired &&
        !!reservation.originTxHash
      }
    >
      {!isSent && (
        <Card className="bg-[#100D16] rounded-xl p-3 md:p-4 border-none w-full gap-2">
          <WarningMessage message={warningMessage} iconToShow="info" />
          {state === ReservationStatus.Expired ? (
            <div className="flex gap-2 bg-grey rounded-xl p-3">
              <div className="text-orange w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-0.5 mr-2 md:mr-3">
                <WarningIcon />
              </div>
              <span className="text-white text-[14px] md:text-[16px] font-medium text-center">
                Your reservation is not valid anymore. Try to create a new one.
              </span>
            </div>
          ) : (
            <AddressReveal
              amount={amount}
              address={recipientAddress!}
              timeLeft={timeLeft}
              progress={progress}
              isReadyToSend={isReadyToSend}
            />
          )}
        </Card>
      )}
     
    </TransactionStep>
  );
}
