import { TransactionStep } from './transaction-step';
import { EthTransactionCard } from './eth-transaction-card';
import { BtcCompletionCard } from './btc-completion-card';
import { BaseTransactionTracker } from './base-transaction-tracker';
import { usePosition } from '@/hooks/queries/usePosition';
import { useTxConfirmations } from '@/hooks/useTxConfirmations';
import { useEVMPositionPolling } from '@/hooks/useEVMPositionPolling';
import { useChainId } from 'wagmi';
import { formatUnits } from 'viem';
import { useMemo } from 'react';
import { useBitcoinPrice } from '@/hooks/useBitcoinPrice';
import { PositionStatus } from '@/types';
import { POSITION_STATUS_MAP } from '../history-table/transaction-history-adapter';

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

  const amount = formatUnits(evmPosition?.originalAmount || 0n, 8);
  const fiatAmount = useMemo(() => {
    if (!evmPosition?.originalAmount || !bitcoinPrice?.bitcoin?.usd) return '0';
    const usdValue = Number(amount) * bitcoinPrice.bitcoin.usd;
    return usdValue.toFixed(2);
  }, [evmPosition?.originalAmount, bitcoinPrice?.bitcoin?.usd]);

  const maxConfirmations = Number(fiatAmount) > 1000 ? 20 : 6;
  const confirmations = useTxConfirmations({
    isActive: open,
    maxConfirmations: maxConfirmations,
    transactionHash: txHash,
  });
  const status = POSITION_STATUS_MAP[evmPosition?.status || 1];
  const isPositionCompleted = status === PositionStatus.Closed;
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
                amount: amount,
                recipientAddress: evmPosition.ownerAddress,
                reservationTx: position?.registrationTxhash || '',
                confirmations: displayConfirmations,
                fiatAmount: fiatAmount,
                maxConfirmations: maxConfirmations,
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
                amount={amount}
                recipientAddress={evmPosition?.positionId || ''}
                reservationTx={position?.targetTxhash || position?.targetBlockHash || ''}
                type="position"
              />
            )}
          </TransactionStep>
        </>
      )}
    </BaseTransactionTracker>
  );
}
