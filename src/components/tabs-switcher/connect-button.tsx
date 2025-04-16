import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { TransactionTrackerDialog } from '@/components/transaction-tracker';

interface ConnectButtonProps {
  isWalletConnected: boolean;
  termsAccepted: boolean;
  toCurrency: 'btc' | 'eth' | 'xbtc';
  bitcoinAddress: string;
  isAnimating: boolean;
}

export function ConnectButton({
  isWalletConnected,
  termsAccepted,
  toCurrency,
  bitcoinAddress,
  isAnimating,
}: ConnectButtonProps) {
  const [trackerOpen, setTrackerOpen] = useState(false);

  // Sample transaction data - replace with actual data from your app
  const transactionData = {
    amount: '0.001',
    recipientAddress: bitcoinAddress,
    reservationTx: '0x1234567890abcdef',
    currentStep: 1,
  };

  const handleButtonClick = () => {
    setTrackerOpen(true);
  };

  return (
    <>
      <div
        className={cn(
          'flex justify-center items-center w-full mt-5 transition-all duration-300 ease-in-out',
          isAnimating ? 'opacity-0' : 'opacity-100'
        )}
      >
        <Button
          variant="orange"
          size="custom"
          disabled={
            !termsAccepted || (toCurrency === 'btc' && !bitcoinAddress.trim())
          }
          onClick={handleButtonClick}
        >
          {isWalletConnected ? 'Bridge funds' : 'Connect wallet'}
        </Button>
      </div>

      <TransactionTrackerDialog
        open={trackerOpen}
        onOpenChange={setTrackerOpen}
        transactionData={transactionData}
      />
    </>
  );
}
