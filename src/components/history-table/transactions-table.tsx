import { useEffect, useState } from 'react';
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
import { Transaction } from './types';
import { mockTransactions } from './mock-data';
import {
  MobileTransactionItem,
  MobileLoadingSkeleton,
  MobileEmptyState,
} from './mobile-components';
import {
  DesktopTransactionRow,
  SkeletonRow,
  EmptyState,
} from './desktop-components';

export default function TransactionsTable() {
  const [loading, setLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { width } = useWindowSize();
  const isMobile = width < 768; // Define mobile breakpoint at 768px

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Render mobile view
  if (isMobile) {
    return (
      <div className="bg-primary p-4 rounded-xl w-full max-w-[359px] mx-auto overflow-y-auto">
        {loading ? (
          <div className="flex flex-col gap-3">
            <MobileLoadingSkeleton />
            <MobileLoadingSkeleton />
          </div>
        ) : transactions.length > 0 ? (
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {transactions.map((tx, index) => (
              <MobileTransactionItem key={tx.hash} tx={tx} index={index} />
            ))}
          </Accordion>
        ) : (
          <MobileEmptyState />
        )}
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
              <span>Status</span>
            </TableHead>
            <TableHead className="py-3 px-2 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
              <span></span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : transactions.length > 0 ? (
            transactions.map((tx) => (
              <DesktopTransactionRow key={tx.hash} tx={tx} />
            ))
          ) : (
            <EmptyState />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
