import { Card } from '@/components/ui/card';
import { TransactionStep } from './TransactionStep';
import { WarningMessage } from './WarningMessage';
import { AddressReveal } from './AddressReveal';

interface BtcSendStepProps {
  amount: string;
  recipientAddress: string;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  progress: number;
}

export function BtcSendStep({
  amount,
  recipientAddress,
  timeLeft,
  progress,
}: BtcSendStepProps) {
  const warningMessage =
    'We recommend to wait for at least 20 confirmations before sending BTC from your bitcoin wallet to insure your reservation. After revealing the address, you will have XX hours to send BTC. Make sure to send BTC before your reservation expires.';

  return (
    <TransactionStep
      title="Send BTC"
      description="Your Bitcoin transaction has been detected. You can send BTC from your bitcoin wallet to a specified address."
      status="current"
      completed={false}
    >
      <Card className="bg-[#100D16] rounded-xl p-3 md:p-4 border-none w-full md:w-[400px]">
        <WarningMessage message={warningMessage} />
        <AddressReveal
          amount={amount}
          address={recipientAddress}
          timeLeft={timeLeft}
          progress={progress}
        />
      </Card>
    </TransactionStep>
  );
}
