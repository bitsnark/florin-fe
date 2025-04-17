'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { TransactionStep } from './TransactionStep';
import { TransactionCard } from './TransactionCard';
import { BtcSendStep } from './BtcSendStep';

interface TransactionData {
  amount: string;
  recipientAddress: string;
  reservationTx: string;
  currentStep: number;
}

interface TransactionTrackerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionData: TransactionData;
}

export function TransactionTrackerDialog({
  open,
  onOpenChange,
  transactionData,
}: TransactionTrackerDialogProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 12,
    seconds: 53,
  });
  const [progress, setProgress] = useState(15); // Starting at 15% complete
  const stepThreeCompleted = false;

  useEffect(() => {
    // Mock countdown timer
    if (!open) return;

    const totalSeconds =
      timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;

    const timer = setTimeout(() => {
      if (totalSeconds <= 0) return;

      // Update time
      let newSeconds = timeLeft.seconds - 1;
      let newMinutes = timeLeft.minutes;
      let newHours = timeLeft.hours;

      if (newSeconds < 0) {
        newSeconds = 59;
        newMinutes -= 1;
      }

      if (newMinutes < 0) {
        newMinutes = 59;
        newHours -= 1;
      }

      setTimeLeft({
        hours: newHours,
        minutes: newMinutes,
        seconds: newSeconds,
      });

      // Update progress (slowly increases as time decreases)
      // Total time is 4h 12m 53s = 15173 seconds
      // We'll go from 15% to 100% during this time
      const initialTotalSeconds = 4 * 3600 + 12 * 60 + 53;
      const currentProgress =
        15 + (85 * (initialTotalSeconds - totalSeconds)) / initialTotalSeconds;
      setProgress(Math.min(100, currentProgress));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1E1C21] border-none rounded-xl overflow-y-auto w-full md:w-[585px] max-h-[90vh] md:h-[813px] pt-4 md:pt-6 px-4 md:pr-6 md:pl-6 pb-6 md:pb-9">
        <h3 className="font-semibold text-base">Tracker</h3>
        <div>
          {/* Timeline */}
          <div className="relative">
            {/* Step 1 - Request Transfer */}
            <TransactionStep
              title="Request transfer"
              description="Sending your request to the smartcontract."
              status="completed"
              completed={false}
            >
              <TransactionCard
                type="request"
                data={{
                  amount: transactionData.amount,
                  recipientAddress: transactionData.recipientAddress,
                  reservationTx: transactionData.reservationTx,
                  confirmations: 157,
                }}
              />
            </TransactionStep>

            {/* Step 2 - Send BTC */}
            <BtcSendStep
              amount={transactionData.amount}
              recipientAddress={transactionData.recipientAddress}
              timeLeft={timeLeft}
              progress={progress}
            />

            {/* Step 3 - BTC Transaction Detected */}
            <TransactionStep
              title="BTC transaction detected"
              description="Your bitcoin transfer was mined."
              status="pending"
              completed={false}
            >
              {stepThreeCompleted && (
                <TransactionCard
                  type="btc"
                  data={{
                    amount: transactionData.amount,
                    txid: transactionData.reservationTx,
                    confirmations: 6,
                  }}
                />
              )}
            </TransactionStep>

            {/* Step 4 - Transaction Complete */}
            <TransactionStep
              title="Transaction complete"
              description="Funds (xBTC) are in your wallet now."
              status="pending"
              isLastStep={true}
              completed={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
