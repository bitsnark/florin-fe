import { Card } from '@/components/ui/card';
import { TransactionStep } from './TransactionStep';
import { WarningMessage } from './WarningMessage';
import { AddressReveal } from './AddressReveal';
import { WarningIcon } from './WarningIcon';

interface BtcSendStepProps {
  amount: string;
  recipientAddress: string;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  progress: number;
  type: 'btc' | 'eth';
  isSent: boolean;
}

export function BtcSendStep({
  amount,
  recipientAddress,
  timeLeft,
  progress,
  type,
  isSent,
}: BtcSendStepProps) {
  const warningMessage = 'You can use any bitcoin wallet to send funds.';
  const isReadyToSend = true;
  const isExpired = false;
  const descriptionMessage = isSent
    ? 'You initiated transaction in your wallet to send BTC.'
    : 'Your Bitcoin transaction has been detected. You can send BTC from your bitcoin wallet to a specified address.';

  return (
    <TransactionStep
      title="Send BTC"
      description={descriptionMessage}
      status={isReadyToSend ? 'completed' : 'current'}
      completed={isReadyToSend}
    >
      {!isSent && (
        <Card className="bg-[#100D16] rounded-xl p-3 md:p-4 border-none w-full md:w-[400px]">
          <WarningMessage message={warningMessage} iconToShow="info" />
          {isExpired ? (
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
              address={recipientAddress}
              timeLeft={timeLeft}
              progress={progress}
              isReadyToSend={isReadyToSend}
              type={type}
            />
          )}
        </Card>
      )}
    </TransactionStep>
  );
}
