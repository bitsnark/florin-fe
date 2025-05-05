import {
  formatHash,
  getChainLogo,
  formatDate,
  formatReceivedAmount,
} from './utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowRightIcon,
  CheckCircledIcon,
  SymbolIcon,
} from '@radix-ui/react-icons';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Position, Reservation, ReservationStatus } from '@/types';
import { useMaxMinBtc } from '@/hooks/queries/useMaxMinBtc';

// Mobile Transaction Item using Accordion
export const MobileTransactionItem = ({
  tx,
  index,
  setTransactionToTrack,
  setOpenTrackerDialog,
}: {
  tx: Reservation | Position;
  index: number;
  setTransactionToTrack?: (tx: {
    id: string;
    type: 'reservation' | 'position';
  }) => void;
  setOpenTrackerDialog?: (open: boolean) => void;
}) => {
  const isReservation = 'reservationId' in tx;
  const fromChain = isReservation ? 'bitcoin' : 'ethereum';
  const toChain = isReservation ? 'ethereum' : 'bitcoin';
  const asset = isReservation ? 'xbtc' : 'btc';
  const requestedAmountAsset = isReservation ? 'btc' : 'xbtc';
  const receivedAmountAsset = isReservation ? 'xbtc' : 'btc';
  const { data } = useMaxMinBtc();

  const handleOpenTrackerDialog = () => {
    if (setOpenTrackerDialog && setTransactionToTrack) {
      setOpenTrackerDialog(true);
      setTransactionToTrack({
        id: 'reservationId' in tx ? tx.reservationId : tx.positionId,
        type: 'reservationId' in tx ? 'reservation' : 'position',
      });
    }
  };

  return (
    <AccordionItem
      value={`tx-${index}`}
      className="bg-[#1D1F25] rounded-xl border-none overflow-hidden"
    >
      <AccordionTrigger className="flex items-center justify-between p-3 w-[327px] h-[52px] text-white hover:no-underline">
        <div className="flex items-center gap-1">
          <img
            src={getChainLogo(fromChain)}
            alt={fromChain}
            className="h-5 w-5"
          />
          <span className="text-sm font-medium">{fromChain}</span>
          <ArrowRightIcon className="text-white w-3 h-3" />
          <img src={getChainLogo(toChain)} alt={toChain} className="h-5 w-5" />
          <span className="text-sm font-medium">{toChain}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm font-medium text-right">
            <span className="text-white">{tx.amount}</span> {asset}
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-4 pb-4 pt-0">
        <div className="space-y-4 text-[#9A9A9A]">
          <div className="grid grid-cols-2 items-center">
            <span className="text-sm">Contract registration</span>
            <span className="text-sm text-right text-[#F0A719]">
              {formatHash(tx?.contractRegistrationTxHash)}
            </span>
          </div>

          <div className="grid grid-cols-2 items-center">
            <span className="text-sm">Requested amount</span>
            <span className="text-sm text-right">
              {tx?.receivedAmount} {requestedAmountAsset}
            </span>
          </div>

          <div className="grid grid-cols-2 items-center">
            <span className="text-sm">Received amount</span>
            <span className="text-sm text-right">
              {formatReceivedAmount(tx?.receivedAmount, data?.minAmount)}{' '}
              {receivedAmountAsset}
            </span>
          </div>

          <div className="grid grid-cols-2 items-center">
            <span className="text-sm">Origin network TXID</span>
            <span className="text-sm text-right text-[#FFAA2E] underline">
              {formatHash(tx?.originTxHash || '')}
            </span>
          </div>

          <div className="grid grid-cols-2 items-center">
            <span className="text-sm">Destination network TXID</span>
            <span className="text-sm text-right text-[#FFAA2E] underline">
              {formatHash(tx?.destinationTxHash || '')}
            </span>
          </div>

          <div className="grid grid-cols-2 items-center">
            <span className="text-sm">Timestamp</span>
            <span className="text-sm text-right text-white">
              {tx?.createdAt ? formatDate(tx.createdAt) : ''}
            </span>
          </div>

          <div className="grid grid-cols-2 items-center">
            <span className="text-sm">Status</span>
            <div className="flex items-center justify-end gap-2">
              {tx.state === ReservationStatus.COMPLETED ? (
                <>
                  <div className="bg-[#292929] rounded-full p-1 flex items-center justify-center">
                    <CheckCircledIcon className="text-green-600" />
                  </div>
                  <span className="text-sm">Completed</span>
                </>
              ) : (
                <>
                  <div className="bg-[#292929] rounded-full p-1 flex items-center justify-center">
                    <SymbolIcon className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Pending</span>
                </>
              )}
            </div>
          </div>

          <Button
            variant="grey"
            className="w-full h-[56px]"
            onClick={handleOpenTrackerDialog}
          >
            Track
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

// Mobile Loading Skeleton
export const MobileLoadingSkeleton = () => (
  <div className="bg-[#1D1F25] rounded-xl border-none overflow-hidden mb-3">
    <div className="flex items-center justify-between p-3 w-[327px] h-[52px]">
      <div className="flex items-center gap-1">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-3 w-3 mx-1" />
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="flex items-center">
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  </div>
);

// Mobile Empty State
export const MobileEmptyState = () => (
  <div className="bg-[#1D1F25] rounded-[24px] border border-[#333845] p-6 text-center">
    <div className="flex flex-col items-center justify-center gap-2">
      <SymbolIcon className="h-10 w-10 text-[#666]" />
      <p className="text-white text-base">No transactions found</p>
      <p className="text-[#9A9A9A] text-sm">
        Your transactions will appear here once you start interacting with the
        platform.
      </p>
    </div>
  </div>
);

// Mobile Wallet Not Connected State
export const MobileWalletNotConnectedState = () => (
  <div className="bg-[#1D1F25] rounded-[24px] border border-[#333845] p-6 text-center">
    <div className="flex flex-col items-center justify-center gap-2">
      <SymbolIcon className="h-10 w-10 text-[#666]" />
      <p className="text-white text-base">Wallet not connected</p>
      <p className="text-[#9A9A9A] text-sm">
        Connect your wallet to see your transaction history.
      </p>
    </div>
  </div>
);
