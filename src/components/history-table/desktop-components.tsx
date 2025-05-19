import {
  formatHash,
  getChainLogo,
  formatDate,
  formatReceivedAmount,
} from './utils';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { TableRow, TableCell } from '@/components/ui/table';
import { useMaxMinBtc } from '@/hooks/queries/useMaxMinBtc';
import { TransactionNormalized } from './transaction-history-adapter';
import { StatusIcon } from '@/components/ui/status-icon';

interface DesktopTransactionRowProps {
  tx: TransactionNormalized;
  setTransactionToTrack: (tx: {
    id: string;
    type: 'reservation' | 'position';
    txHash: string;
  }) => void;
  setOpenTrackerDialog: (open: boolean) => void;
}

export const DesktopTransactionRow = ({
  tx,
  setTransactionToTrack,
  setOpenTrackerDialog,
}: DesktopTransactionRowProps) => {
  const { data } = useMaxMinBtc();

  const handleOpenTrackerDialog = () => {
    setOpenTrackerDialog(true);
    setTransactionToTrack({
      id: tx.type === 'reservation' ? tx.reservationId || '' : tx.positionId || '',
      type: tx.type,
      txHash: tx.contractRegistrationTxHash,
    });
  };

  return (
    <TableRow key={tx.contractRegistrationTxHash} className="hover:bg-transparent">
      <TableCell className="w-fit min-w-[200px] border-t border-b border-l border-[#333845] rounded-l-[10px] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        <div className="flex flex-row gap-1 items-center">
          <div className="flex items-center gap-1">
            <img
              src={getChainLogo(tx.fromChain.toLowerCase())}
              alt={tx.fromChain}
              className="h-4 w-4"
            />
            <span>{tx.fromChain}</span>
          </div>
          <ArrowRightIcon />
          <div className="flex items-center gap-1">
            <img
              src={getChainLogo(tx.toChain.toLowerCase())}
              alt={tx.toChain}
              className="h-4 w-4"
            />
            <span>{tx.toChain}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center text-[#FFAA2E] text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap cursor-pointer">
        {formatHash(tx.contractRegistrationTxHash)}
      </TableCell>
      <TableCell className="text-end pr-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        {tx.amount} {tx.type === 'position' ? 'ETH' : 'BTC'}
      </TableCell>
      <TableCell className="text-end pr-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        {formatReceivedAmount(tx.receivedAmount, data?.minAmount)}{' '}
        {tx.type === 'position' ? 'ETH' : 'BTC'}
      </TableCell>
      <TableCell className="text-[#FFAA2E] pl-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap cursor-pointer">
        {formatHash(tx.originTxHash)}
      </TableCell>
      <TableCell className="text-[#FFAA2E] pl-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap cursor-pointer">
        {formatHash(tx.targetTxhash)}
      </TableCell>
      <TableCell className="text-white pl-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        {formatDate(tx.createdAt)}
      </TableCell>
      <TableCell className="text-xs text-center border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
        <div className="flex flex-row gap-1 items-center justify-start">
          <StatusIcon status={tx.state} />
          {tx.state.charAt(0).toUpperCase() + tx.state.slice(1)}
        </div>
      </TableCell>

      <TableCell
        onClick={handleOpenTrackerDialog}
        className="text-xs text-center text-[#FFAA2E] cursor-pointer border-t border-b border-r border-[#333845] rounded-r-[10px] bg-[#1D1F25] py-3 px-2 whitespace-nowrap"
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
    <TableCell className="text-center text-[#FFAA2E] text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <Skeleton className="h-4 w-24 mx-auto" />
    </TableCell>
    <TableCell className="text-end pr-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <Skeleton className="h-4 w-16 ml-auto" />
    </TableCell>
    <TableCell className="text-end pr-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <Skeleton className="h-4 w-16 ml-auto" />
    </TableCell>
    <TableCell className="text-[#FFAA2E] pl-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <Skeleton className="h-4 w-24" />
    </TableCell>
    <TableCell className="text-[#FFAA2E] pl-2 text-xs border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <Skeleton className="h-4 w-24" />
    </TableCell>
    <TableCell className="text-xs text-center border-t border-b border-[#333845] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
      <div className="flex flex-row gap-1 items-center justify-start">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
    </TableCell>
    <TableCell className="text-xs text-center text-[#FFAA2E] cursor-pointer border-t border-b border-r border-[#333845] rounded-r-[10px] bg-[#1D1F25] py-3 px-2 whitespace-nowrap">
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
