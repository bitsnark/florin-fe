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
import { Transaction } from './types';

/**
 * Transactions history table component
 *
 * This component displays transaction history in both desktop and mobile views.
 * It uses the useTransactions hook which transforms our backend data (Positions
 * and Reservations) into the Transaction format required by the UI design.
 */
export default function TransactionsTable() {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isLoading = false;
  const transactions: Transaction[] = [
    {
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      date: '2023-09-15T10:30:45Z',
      action: 'Bridge',
      asset: 'USDC',
      fromChain: 'Ethereum',
      toChain: 'Bitcoin',
      amount: '1000.00',
      receivedAmount: '995.50',
      status: 'Completed',
      contractRegistration: '0xabcdef1234567890abcdef1234567890abcdef1234',
      originTxId:
        '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedc',
      destinationTxId:
        '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543',
    },
    {
      hash: '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef',
      date: '2023-09-14T14:22:10Z',
      action: 'Bridge',
      asset: 'ETH',
      fromChain: 'Ethereum',
      toChain: 'Bitcoin',
      amount: '2.5',
      receivedAmount: '2.49',
      status: 'Completed',
      contractRegistration: '0xbcdef1234567890abcdef1234567890abcdef12345',
      originTxId:
        '0xa876543210fedcba9876543210fedcba9876543210fedcba9876543210fedc',
      destinationTxId:
        '0xbedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543',
    },
    {
      hash: '0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef',
      date: '2023-09-13T09:15:30Z',
      action: 'Bridge',
      asset: 'BTC',
      fromChain: 'Bitcoin',
      toChain: 'Ethereum',
      amount: '0.5',
      receivedAmount: '0.495',
      status: 'Pending',
      contractRegistration: '0xcdef1234567890abcdef1234567890abcdef123456',
      originTxId:
        '0xb876543210fedcba9876543210fedcba9876543210fedcba9876543210fedc',
      destinationTxId: '',
    },
    {
      hash: '0x456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef3',
      date: '2023-09-12T18:45:20Z',
      action: 'Bridge',
      asset: 'USDT',
      fromChain: 'Bitcoin',
      toChain: 'Ethereum',
      amount: '500.00',
      receivedAmount: '0.00',
      status: 'Failed',
      contractRegistration: '0xdef1234567890abcdef1234567890abcdef1234567',
      originTxId:
        '0xc876543210fedcba9876543210fedcba9876543210fedcba9876543210fedc',
      destinationTxId: '',
    },
  ];
  // TODO: Replace with actual wallet connection state from your context or hook
  const isWalletConnected = true;

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
          {!isWalletConnected ? (
            <WalletNotConnectedState />
          ) : isLoading ? (
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
