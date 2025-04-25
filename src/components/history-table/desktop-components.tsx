import { formatHash, getChainLogo, formatDate } from './utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowRightIcon,
  CheckCircledIcon,
  SymbolIcon,
} from '@radix-ui/react-icons';
import { TableRow, TableCell } from '@/components/ui/table';
import { Position, PositionStatus, Reservation } from '@/types';

interface DesktopTransactionRowProps {
  tx: Reservation | Position;
  setTransactionToTrack: (tx: {
    id: string;
    type: 'reservation' | 'position';
  }) => void;
  setOpenTrackerDialog: (open: boolean) => void;
}

export const DesktopTransactionRow = ({
  tx,
  setTransactionToTrack,
  setOpenTrackerDialog,
}: DesktopTransactionRowProps) => {
  const isReservation = 'reservationId' in tx;
  const fromChain = isReservation ? 'bitcoin' : 'ethereum';
  const toChain = isReservation ? 'ethereum' : 'bitcoin';
  const requestedAmountAsset = isReservation ? 'btc' : 'xbtc';
  const receivedAmountAsset = isReservation ? 'xbtc' : 'btc';

  const handleOpenTrackerDialog = () => {
    setOpenTrackerDialog(true);
    setTransactionToTrack({
      id: 'reservationId' in tx ? tx.reservationId : tx.positionId,
      type: 'reservationId' in tx ? 'reservation' : 'position',
    });
  };

  return (
    <TableRow key={tx?.hash} className="hover:bg-transparent">
      <TableCell className="w-fit min-w-[200px] border-t border-b border-l border-[#333845] rounded-l-[10px] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        <div className="flex flex-row gap-1 items-center">
          <div className="flex items-center gap-1">
            <img
              src={getChainLogo(fromChain)}
              alt={fromChain}
              className="h-4 w-4"
            />
            <span>
              {fromChain.charAt(0).toUpperCase() + fromChain.slice(1)}
            </span>
            <span>
              {fromChain.charAt(0).toUpperCase() + fromChain.slice(1)}
            </span>
          </div>
          <ArrowRightIcon />
          <div className="flex items-center gap-1">
            <img
              src={getChainLogo(toChain)}
              alt={toChain}
              className="h-4 w-4"
            />
            <span>{toChain.charAt(0).toUpperCase() + toChain.slice(1)}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center text-orange-light text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        {formatHash(tx?.contractRegistrationTxHash || '')}
      </TableCell>
      <TableCell className="text-end pr-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        {tx.amount} {requestedAmountAsset}
      </TableCell>
      <TableCell className="text-end pr-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        {tx?.receivedAmount} {receivedAmountAsset}
      </TableCell>
      <TableCell className="text-orange-light pl-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        {formatHash(tx?.originTxHash || '')}
      </TableCell>
      <TableCell className="text-orange-light pl-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        {formatHash(tx?.destinationTxHash || '')}
      </TableCell>
      <TableCell className="text-white pl-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        {tx?.createdAt ? formatDate(tx.createdAt) : ''}
      </TableCell>
      <TableCell className="text-xs text-center border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        <div className="flex flex-row gap-1 items-center justify-start">
          {tx.state === PositionStatus.COMPLETED ? (
            <div className="bg-grey rounded-full p-[0.125rem]">
              <CheckCircledIcon className="text-green-600" />
            </div>
          ) : (
            <div className="bg-grey rounded-full p-[0.125rem]">
              <SymbolIcon />
            </div>
          )}
          {tx.state}
        </div>
      </TableCell>

      <TableCell
        onClick={handleOpenTrackerDialog}
        className="text-xs text-center text-orange-light cursor-pointer border-t border-b border-r border-[#333845] rounded-r-[10px] bg-[#1D1F25] py-3 px-2 whitespace-nowrap"
      >
        Track
      </TableCell>
    </TableRow>
  );
};

export const SkeletonRow = () => (
  <TableRow className="hover:bg-transparent">
    <TableCell className="border-t border-b border-l border-[#333845] rounded-l-[10px] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <div className="flex gap-2 items-center">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-16" />
        <ArrowRightIcon />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
    </TableCell>
    <TableCell className="text-center text-orange-light text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <Skeleton className="h-4 w-24 mx-auto" />
    </TableCell>
    <TableCell className="text-end pr-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <Skeleton className="h-4 w-16 ml-auto" />
    </TableCell>
    <TableCell className="text-end pr-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <Skeleton className="h-4 w-16 ml-auto" />
    </TableCell>
    <TableCell className="text-orange-light pl-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <Skeleton className="h-4 w-24" />
    </TableCell>
    <TableCell className="text-orange-light pl-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <Skeleton className="h-4 w-24" />
    </TableCell>
    <TableCell className="text-xs text-center border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <div className="flex flex-row gap-1 items-center justify-start">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
    </TableCell>
    <TableCell className="text-xs text-center text-orange-light cursor-pointer border-t border-b border-r border-[#333845] rounded-r-[10px] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <Skeleton className="h-4 w-12 mx-auto" />
    </TableCell>
  </TableRow>
);

export const EmptyState = () => (
  <TableRow className="hover:bg-transparent">
    <TableCell
      colSpan={8}
      className="border border-[#333845] rounded-[10px] py-8 px-4 text-center"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-gray-500 text-xs">
          You haven't made any transfers yet
        </p>
      </div>
    </TableCell>
  </TableRow>
);

export const WalletNotConnectedState = () => (
  <TableRow className="hover:bg-transparent">
    <TableCell
      colSpan={8}
      className="border border-[#333845] rounded-[10px] py-8 px-4 text-center"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-gray-500 text-xs">
          Connect your wallet to see the transfer history
        </p>
      </div>
    </TableCell>
  </TableRow>
);
