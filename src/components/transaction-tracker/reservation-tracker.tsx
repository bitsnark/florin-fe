import { Finality, ReservationStatus } from '@/types';
import { TransactionStep } from './transaction-step';
import { BtcTransactionCard } from './btc-transaction-card';
import { BtcSendStep } from './btc-send-step';
import { EthCompletionCard } from './eth-completion-card';
import { BaseTransactionTracker } from './base-transaction-tracker';
import { useBitcoinPrice } from '@/hooks/useBitcoinPrice';
import { useMemo } from 'react';
import { useTxConfirmations } from '@/hooks/useTxConfirmations';
import { useEVMReservationPolling } from '@/hooks/useEVMReservationPolling';
import { useChainId } from 'wagmi';
import { Address, formatUnits } from 'viem';
import { useReservation } from '@/hooks/queries/useReservation';
import { RESERVATION_STATUS_MAP } from '../history-table/transaction-history-adapter';
import { useBtcBlockConfirmations } from '@/hooks/useBtcBlockConfirmations';

interface ReservationTrackerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  txHash: string;
}

export function ReservationTracker({
  open,
  onOpenChange,
  id,
  txHash,
}: ReservationTrackerProps) {
  const { data } = useReservation(id, {
    refetchInterval: 5000,
  });
  const { data: bitcoinPrice } = useBitcoinPrice();
  const chainId = useChainId();
  const reservation = data?.data;

  const {
    evmReservation,
   // isLoading: isEVMReservationLoading,
    error: isEVMReservationError,
  } = useEVMReservationPolling({
    reservationId: id || '',
    chainId: chainId || 0,
    isActive: open,
  });

  const amount = formatUnits(evmReservation?.tokenAmount || 0n, 8);

  const fiatAmount = useMemo(() => {
    if (!evmReservation?.tokenAmount || !bitcoinPrice?.bitcoin?.usd) return '0';
    const usdValue = Number(amount) * bitcoinPrice.bitcoin.usd;
    return usdValue.toFixed(2);
  }, [evmReservation?.tokenAmount, bitcoinPrice?.bitcoin?.usd]);

  
  const maxConfirmations = Number(fiatAmount) > 1000 ? 20 : 6;
  const confirmations = useTxConfirmations({
    isActive: open,
    maxConfirmations: maxConfirmations,
    transactionHash: txHash,
  });

  const btcConfirmations = useBtcBlockConfirmations({
    isActive: open,
    targetBlockHeight: reservation?.targetBlockNumber,
  });

  const status = RESERVATION_STATUS_MAP[evmReservation?.status || 0];
  const bridgingCompleted = status === ReservationStatus.Settled;
  const maxHeightClass = !bridgingCompleted
    ? 'max-h-[90vh] md:h-[813px]'
    : 'max-h-[90vh]';

  const btcTransactionDetected =
    status !== ReservationStatus.Expired &&
    !!reservation?.targetBlockHash &&
    reservation.targetBlockNumber &&
    reservation.targetBlockNumber > 0;

  return (
    <BaseTransactionTracker
      open={open}
      onOpenChange={onOpenChange}
      isLoading={false}
      error={isEVMReservationError}
      maxHeight={maxHeightClass}
    >
      {evmReservation && (
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
                amount: amount,
                recipientAddress: evmReservation.ownerAddress,
                reservationTx: txHash,
                confirmations: confirmations,
                fiatAmount: fiatAmount,
                maxConfirmations: maxConfirmations,
              }}
            />
          </TransactionStep>

          {/* Step 2 - Send BTC */}
          <BtcSendStep
            amount={amount}
            isSent={bridgingCompleted}
            confirmations={confirmations}
            maxConfirmations={maxConfirmations}
            recipientAddress={evmReservation.bitcoinAddress}
            state={status}
            reservation={{
              ...reservation,
              amount: amount,
              state: status,
              bitcoinAddress: evmReservation.bitcoinAddress,
              hash: txHash,
              targetTxhash: reservation?.targetTxhash,
              reservationId: evmReservation.reservationId,
              ownerAddress: evmReservation.ownerAddress,
              tokenAddress: 'token adrress' as Address,
              finality: Finality.UNKNOWN,
              createdAt: reservation?.createdAt || '',
              chainId: chainId || 0,
              contractRegistrationTxHash:
                reservation?.contractRegistrationTxHash || '',
              targetChain: reservation?.targetChain,
              targetBlockNumber: reservation?.targetBlockNumber,
              targetBlockHash: reservation?.targetBlockHash,
            }}
            fiatAmount={fiatAmount}
          />

          {/* Step 3 - BTC Transaction Detected */}
          <TransactionStep
            title="BTC transaction detected"
            description="Your bitcoin transfer was mined."
            status={btcTransactionDetected ? 'completed' : 'pending'}
            completed={!!btcTransactionDetected}
          >
            {btcTransactionDetected && (
              <BtcTransactionCard
                data={{
                  amount: amount,
                  txid: reservation?.targetTxhash,
                  confirmations: btcConfirmations,
                  fiatAmount: fiatAmount,
                  maxConfirmations: maxConfirmations,
                }}
                isStepThree={true}
              />
            )}
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
                amount={amount}
                recipientAddress={evmReservation.bitcoinAddress || ''}
                reservationTx={
                  reservation?.targetTxhash ||
                  reservation?.targetBlockHash ||
                  ''
                }
                type="reservation"
              />
            )}
          </TransactionStep>
        </>
      )}
    </BaseTransactionTracker>
  );
}
