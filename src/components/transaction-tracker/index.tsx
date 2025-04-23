import { Dialog, DialogContent } from '@/components/ui/dialog';
import { TransactionStep } from './TransactionStep';
import { TransactionCard } from './TransactionCard';
import { BtcSendStep } from './BtcSendStep';
import { CompletionCard } from './CompletionCard';
import { useTimer } from './TimerLogic';
import { useEffect, useState } from 'react';
import { PositionStatus, Reservation, TransactionStatus } from '@/types';
import { TrackerSkeleton } from './TrackerSkeleton';
import { useConfirmationsSimulator } from './useConfirmationsSimulator';
import { useTrackerData } from '@/hooks/useTrackerData';

interface TransactionTrackerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'reservation' | 'position';
  id: string;
}

export function TransactionTrackerDialog({
  open,
  onOpenChange,
  type,
  id,
}: TransactionTrackerDialogProps) {
  const { timeLeft, progress } = useTimer(open);

  const {
    data: transactionData,
    isLoading: loading,
    error,
  } = useTrackerData(type, id);

  const [sendBtcStepCompleted, setSendBtcStepCompleted] = useState(false);
  const [stepThreeCompleted, setStepThreeCompleted] = useState(false);
  const [btcTransactionDetected, setBtcTransactionDetected] = useState(false);
  const [bridgingCompleted, setBridgingCompleted] = useState(false);

  const confirmations = useConfirmationsSimulator({
    isActive: open,
    maxConfirmations: 20,
  });

  useEffect(() => {
    if (confirmations === 20 && transactionData?.transaction?.originTxId) {
      setTimeout(() => {
        setSendBtcStepCompleted(true);
        setStepThreeCompleted(true);
      }, 10000);
    }
  }, [confirmations, transactionData]);

  useEffect(() => {
    if (
      sendBtcStepCompleted &&
      stepThreeCompleted &&
      !transactionData?.transaction?.destinationTxId
    ) {
      setTimeout(() => {
        setBtcTransactionDetected(true);
      }, 10000);
    }
  }, [sendBtcStepCompleted, stepThreeCompleted, transactionData]);

  useEffect(() => {
    if (
      btcTransactionDetected &&
      transactionData?.transaction?.status === TransactionStatus.COMPLETED
    ) {
      setTimeout(() => {
        setBridgingCompleted(true);
      }, 10000);
    }
  }, [btcTransactionDetected, transactionData]);

  const getFirstStepTitle = () =>
    type === 'position' ? 'Request transfer' : 'Initiating transaction';

  const getFirstStepDescription = () =>
    type === 'position'
      ? 'Sending your request to the smartcontract.'
      : 'Sending your request to the smart contract. It might take up to 5 min (tbd).';

  const getFundsDescription = () =>
    `Funds (${type === 'position' ? 'xBTC' : 'BTC'}) are in your wallet now.`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`bg-[#1E1C21] border-none rounded-xl overflow-y-auto w-full md:w-[585px] ${
          type === 'reservation'
            ? 'max-h-[90vh]'
            : !sendBtcStepCompleted
              ? 'max-h-[90vh] md:h-[813px]'
              : ''
        } pt-4 md:pt-6 px-4 md:pr-6 md:pl-6 pb-6 md:pb-9`}
      >
        <h3 className="font-semibold text-base">Tracker</h3>
        {loading ? (
          <TrackerSkeleton />
        ) : error ? (
          <div className="text-red-500 text-center py-4">
            {error instanceof Error ? error.message : 'An error occurred'}
          </div>
        ) : (
          <>
            <div>
              {/* Timeline */}
              <div className="relative">
                {/* Step 1 - Request Transfer */}
                <TransactionStep
                  title={getFirstStepTitle()}
                  description={getFirstStepDescription()}
                  status="completed"
                  completed={true}
                  isStepOne={true}
                >
                  {transactionData && (
                    <TransactionCard
                      type={type === 'position' ? 'btc' : 'eth'}
                      data={{
                        amount: transactionData.amount,
                        recipientAddress:
                          'positionId' in transactionData
                            ? transactionData.positionId
                            : (transactionData as Reservation).reservationId,
                        reservationTx: transactionData.transaction?.hash || '',
                        confirmations: confirmations,
                        fiatAmount: '100',
                      }}
                    />
                  )}
                </TransactionStep>

                {type === 'position' && (
                  <>
                    {/* Step 2 - Send BTC */}
                    {transactionData && 'bitcoinAddress' in transactionData && (
                      <BtcSendStep
                        amount={transactionData.amount}
                        recipientAddress={transactionData.bitcoinAddress || ''}
                        timeLeft={timeLeft}
                        progress={progress}
                        type="btc"
                        isSent={sendBtcStepCompleted}
                        confirmations={confirmations}
                        state={transactionData.state as PositionStatus}
                      />
                    )}

                    {/* Step 3 - BTC Transaction Detected */}
                    <TransactionStep
                      title="BTC transaction detected"
                      description="Your bitcoin transfer was mined."
                      status={btcTransactionDetected ? 'completed' : 'pending'}
                      completed={btcTransactionDetected}
                    >
                      {stepThreeCompleted &&
                        btcTransactionDetected &&
                        transactionData && (
                          <TransactionCard
                            type="btc"
                            data={{
                              amount: transactionData.amount,
                              txid: transactionData.transaction?.hash || '',
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
                      description={getFundsDescription()}
                      status={bridgingCompleted ? 'completed' : 'pending'}
                      isLastStep={true}
                      completed={bridgingCompleted}
                    >
                      {bridgingCompleted && transactionData && (
                        <CompletionCard
                          amount={transactionData.amount}
                          recipientAddress={
                            transactionData.bitcoinAddress || ''
                          }
                          reservationTx={
                            transactionData.transaction?.hash || ''
                          }
                          type={type === 'position' ? 'eth' : 'btc'}
                        />
                      )}
                    </TransactionStep>
                  </>
                )}

                {type === 'reservation' && (
                  <>
                    <TransactionStep
                      title="Bridging complete"
                      description="Funds (BTC) are in your wallet now"
                      status={
                        transactionData?.transaction?.status ===
                        TransactionStatus.COMPLETED
                          ? 'completed'
                          : 'pending'
                      }
                      completed={
                        transactionData?.transaction?.status ===
                        TransactionStatus.COMPLETED
                      }
                      isLastStep={true}
                    >
                      {bridgingCompleted && transactionData && (
                        <CompletionCard
                          amount={transactionData.amount}
                          recipientAddress={
                            'positionId' in transactionData
                              ? transactionData.positionId
                              : ''
                          }
                          reservationTx={
                            transactionData.transaction?.hash || ''
                          }
                          type="btc"
                        />
                      )}
                    </TransactionStep>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
