import { TransactionStep } from './transaction-step';
import { EthTransactionCard } from './eth-transaction-card';
import { BtcCompletionCard } from './btc-completion-card';
import { BaseTransactionTracker } from './base-transaction-tracker';
import { usePosition } from '@/hooks/queries/usePosition';
import { useTxConfirmations } from '@/hooks/useTxConfirmations';
import { useEVMPositionPolling } from '@/hooks/useEVMPositionPolling';
import { useChainId } from 'wagmi';
import { formatEther } from 'viem';
import { useMemo } from 'react';
import { useBitcoinPrice } from '@/hooks/useBitcoinPrice';

interface PositionTrackerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  txHash: string;
}

export function PositionTracker({
  open,
  onOpenChange,
  id,
  txHash,
}: PositionTrackerProps) {
  const { data: position } = usePosition(id, {});
  const chainId = useChainId();
  const { evmPosition, isLoading, error } = useEVMPositionPolling({
    positionId: id || '',
    chainId: chainId || 0,
    isActive: open,
  });
  const { data: bitcoinPrice } = useBitcoinPrice();

  const fiatAmount = useMemo(() => {
    if (!evmPosition?.originalAmount || !bitcoinPrice?.bitcoin?.usd) return '0';
    const btcAmount = formatEther(evmPosition.originalAmount);
    const usdValue = Number(btcAmount) * bitcoinPrice.bitcoin.usd;
    return usdValue.toFixed(2);
  }, [evmPosition?.originalAmount, bitcoinPrice?.bitcoin?.usd]);

  const maxConfirmations = Number(fiatAmount) > 1000 ? 20 : 6;
  const confirmations = useTxConfirmations({
    isActive: open,
    maxConfirmations: maxConfirmations,
    transactionHash: txHash,
  });
  const isPositionCompleted = evmPosition?.status === 3;
  const displayConfirmations = isPositionCompleted
    ? maxConfirmations
    : confirmations;

  return (
    <BaseTransactionTracker
      open={open}
      onOpenChange={onOpenChange}
      isLoading={isLoading}
      error={error}
    >
      {evmPosition && (
        <>
          {/* Step 1 - Initiating transaction */}
          <TransactionStep
            title="Initiating transaction"
            description="Sending your request to the smart contract. It might take up to 5 min."
            status="completed"
            completed={isPositionCompleted}
            isStepOne={true}
          >
            <EthTransactionCard
              data={{
                amount: formatEther(evmPosition.originalAmount),
                recipientAddress: evmPosition.positionId,
                reservationTx: '',
                confirmations: displayConfirmations,
                fiatAmount: fiatAmount,
              }}
            />
          </TransactionStep>

          {/* Step 2 - Bridging complete */}
          <TransactionStep
            title="Bridging complete"
            description="Funds (BTC) are in your wallet now"
            status={isPositionCompleted ? 'completed' : 'pending'}
            completed={isPositionCompleted}
            isLastStep={true}
          >
            {isPositionCompleted && (
              <BtcCompletionCard
                amount={formatEther(evmPosition?.originalAmount || 0n)}
                recipientAddress={evmPosition?.positionId || ''}
                reservationTx={''}
                type="position"
              />
            )}
          </TransactionStep>
        </>
      )}
    </BaseTransactionTracker>
  );
}
