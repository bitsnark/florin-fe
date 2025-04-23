import { Dialog, DialogContent } from '@/components/ui/dialog';
import { TransactionStep } from './TransactionStep';
import { TransactionCard } from './TransactionCard';
import { BtcSendStep } from './BtcSendStep';
import { CompletionCard } from './CompletionCard';
import { useTimer } from './TimerLogic';

interface TransactionData {
  amount: string;
  recipientAddress: string;
  reservationTx: string;
  currentStep: number;
  type: 'btc' | 'eth';
}

interface TransactionTrackerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionData: TransactionData;
  type: 'btc' | 'eth';
}

export function TransactionTrackerDialog({
  open,
  onOpenChange,
  transactionData,
}: TransactionTrackerDialogProps) {
  const { timeLeft, progress } = useTimer(open);
  const sendBtcStepCompleted = true;
  const stepThreeCompleted = true;
  const btcTransactionDetected = true;
  const bridgingCompleted = true;

  const getFirstStepTitle = () =>
    transactionData.type === 'btc'
      ? 'Request transfer'
      : 'Initiating transaction';

  const getFirstStepDescription = () =>
    transactionData.type === 'btc'
      ? 'Sending your request to the smartcontract.'
      : 'Sending your request to the smart contract. It might take up to 5 min (tbd).';

  const getFundsDescription = () =>
    `Funds (${transactionData.type === 'btc' ? 'xBTC' : 'BTC'}) are in your wallet now.`;

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent
        className={`bg-[#1E1C21] border-none rounded-xl overflow-y-auto w-full md:w-[585px] ${
          transactionData.type === 'eth'
            ? 'max-h-[90vh]'
            : !sendBtcStepCompleted
              ? 'max-h-[90vh] md:h-[813px]'
              : ''
        } pt-4 md:pt-6 px-4 md:pr-6 md:pl-6 pb-6 md:pb-9`}
      >
        <h3 className="font-semibold text-base">Tracker</h3>
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
              <TransactionCard
                type={transactionData.type}
                data={{
                  amount: transactionData.amount,
                  recipientAddress: transactionData.recipientAddress,
                  reservationTx: transactionData.reservationTx,
                  confirmations: 157,
                  fiatAmount: '919',
                }}
              />
            </TransactionStep>

            {transactionData.type === 'btc' && (
              <>
                {/* Step 2 - Send BTC */}
                <BtcSendStep
                  amount={transactionData.amount}
                  recipientAddress={transactionData.recipientAddress}
                  timeLeft={timeLeft}
                  progress={progress}
                  type={transactionData.type}
                  isSent={sendBtcStepCompleted}
                />

                {/* Step 3 - BTC Transaction Detected */}
                <TransactionStep
                  title="BTC transaction detected"
                  description="Your bitcoin transfer was mined."
                  status={btcTransactionDetected ? 'completed' : 'pending'}
                  completed={btcTransactionDetected}
                >
                  {stepThreeCompleted && btcTransactionDetected && (
                    <TransactionCard
                      type="btc"
                      data={{
                        amount: transactionData.amount,
                        txid: transactionData.reservationTx,
                        confirmations: 6,
                        fiatAmount: '10',
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
                  {bridgingCompleted && (
                    <CompletionCard
                      amount={transactionData.amount}
                      recipientAddress={transactionData.recipientAddress}
                      reservationTx={transactionData.reservationTx}
                      type={transactionData.type}
                    />
                  )}
                </TransactionStep>
              </>
            )}

            {transactionData.type === 'eth' && (
              <>
                <TransactionStep
                  title="Bridging complete"
                  description="Funds (BTC) are in your wallet now"
                  status="completed"
                  completed={true}
                  isLastStep={true}
                >
                  {bridgingCompleted && (
                    <CompletionCard
                      amount={transactionData.amount}
                      recipientAddress={transactionData.recipientAddress}
                      reservationTx={transactionData.reservationTx}
                      type={transactionData.type}
                    />
                  )}
                </TransactionStep>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
