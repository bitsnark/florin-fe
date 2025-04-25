import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Accordion } from '@/components/ui/accordion';
import { useWindowSize } from './utils';
// import { useTransactions } from '@/hooks/useTransactions';
import {
  MobileTransactionItem,
  MobileLoadingSkeleton,
  MobileEmptyState,
  MobileWalletNotConnectedState,
} from './mobile-components';
import {
  DesktopTransactionRow,
  SkeletonRow,
  EmptyState,
  WalletNotConnectedState,
} from './desktop-components';
import { usePositionsByOwner } from '@/hooks/queries/usePositionsByOwner';
import { useAccount } from 'wagmi';
import { useReservationsByOwner } from '@/hooks/queries/useReservationsByOwner';
import { Position, Reservation } from '@/types';
import { TransactionTrackerDialog } from '../transaction-tracker';
import { useState } from 'react';

/**
 * Transactions history table component
 *
 * This component displays transaction history in both desktop and mobile views.
 * It uses the useTransactions hook which transforms our backend data (Positions
 * and Reservations) into the Transaction format required by the UI design.
 */
export default function TransactionsTable() {
  const account = useAccount();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const { data: positions, isLoading: isLoadingPositions } =
    usePositionsByOwner(account.address);
  const { data: reservations, isLoading: isLoadingReservations } =
    useReservationsByOwner(account.address);
  const transactions: (Position | Reservation)[] = [
    ...(positions || []),
    ...(reservations || []),
  ];
  const [transactionToTrack, setTransactionToTrack] = useState<{
    id: string;
    type: 'reservation' | 'position';
  } | null>(null);
  const [openTrackerDialog, setOpenTrackerDialog] = useState(false);
  const isLoading = isLoadingPositions || isLoadingReservations;

  const isWalletConnected = account.isConnected;
  // Render mobile view
  if (isMobile) {
    return (
      <div className="bg-primary p-4 rounded-xl w-full max-w-[359px] mx-auto overflow-y-auto">
        {!isWalletConnected ? (
          <MobileWalletNotConnectedState />
        ) : isLoading ? (
          <div className="flex flex-col gap-3">
            <MobileLoadingSkeleton />
            <MobileLoadingSkeleton />
          </div>
        ) : transactions.length > 0 ? (
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {transactions.map((tx, index) => (
              <MobileTransactionItem
                key={tx?.hash}
                tx={tx}
                index={index}
                setTransactionToTrack={setTransactionToTrack}
                setOpenTrackerDialog={setOpenTrackerDialog}
              />
            ))}
          </Accordion>
        ) : (
          <MobileEmptyState />
        )}
        <TransactionTrackerDialog
          open={openTrackerDialog}
          onOpenChange={setOpenTrackerDialog}
          type={transactionToTrack?.type || 'reservation'}
          id={transactionToTrack?.id || ''}
        />
      </div>
    );
  }

  // Render desktop table view
  return (
    <div className="bg-primary p-6 rounded-xl overflow-hidden w-full">
      <Table
        style={{
          borderCollapse: 'separate',
          borderSpacing: '0 8px',
          width: '100%',
        }}
      >
        <TableHeader className="border-none">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="py-3 px-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
              <div className="flex flex-row gap-1">
                <span>From</span>
                <ArrowRightIcon />
                <span>To</span>
              </div>
            </TableHead>
            <TableHead className="py-3 px-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
              <div className="flex flex-col items-center">
                <span>Contract</span>
                <span>registration</span>
              </div>
            </TableHead>
            <TableHead className="py-3 px-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
              <div className="flex flex-col items-end">
                <span>Requested</span>
                <span>amount</span>
              </div>
            </TableHead>
            <TableHead className="py-3 px-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
              <div className="flex flex-col items-end">
                <span>Received</span>
                <span>amount</span>
              </div>
            </TableHead>
            <TableHead className="py-3 px-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
              <div className="flex flex-col items-start">
                <span>Origin</span>
                <span>network TXID</span>
              </div>
            </TableHead>
            <TableHead className="py-3 px-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
              <div className="flex flex-col items-start">
                <span>Destination</span>
                <span>network TXID</span>
              </div>
            </TableHead>
            <TableHead className="py-3 px-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
              <span>Timestamp</span>
            </TableHead>
            <TableHead className="py-3 px-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
              <span>Status</span>
            </TableHead>
            <TableHead className="py-3 px-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
              <span></span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isWalletConnected ? (
            <WalletNotConnectedState />
          ) : isLoading ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : transactions.length > 0 ? (
            transactions.map((tx) => (
              <DesktopTransactionRow
                key={tx?.hash}
                tx={tx}
                setTransactionToTrack={setTransactionToTrack}
                setOpenTrackerDialog={setOpenTrackerDialog}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </TableBody>
      </Table>
      <TransactionTrackerDialog
        open={openTrackerDialog}
        onOpenChange={setOpenTrackerDialog}
        type={transactionToTrack?.type || 'reservation'}
        id={transactionToTrack?.id || ''}
      />
    </div>
  );
}
