import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PositionTracker } from '@/components/transaction-tracker/position-tracker';
import { usePosition } from '@/hooks/queries/usePosition';
import { useTxConfirmations } from '@/hooks/useTxConfirmations';
import { useEVMPositionPolling } from '@/hooks/useEVMPositionPolling';
import { useChainId } from 'wagmi';
import { useBitcoinPrice } from '@/hooks/useBitcoinPrice';
import type { EVMPosition } from '@/types';
import { TransactionStatus, PositionStatus, Finality } from '@/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBtcBlockConfirmations } from '@/hooks/useBtcBlockConfirmations';

// Mock all the hooks
vi.mock('@/hooks/queries/usePosition');
vi.mock('@/hooks/useTxConfirmations');
vi.mock('@/hooks/useEVMPositionPolling');
vi.mock('wagmi');
vi.mock('@/hooks/useBitcoinPrice');
vi.mock('@/hooks/useBtcBlockConfirmations');

describe('PositionTracker', () => {
  const mockProps = {
    open: true,
    onOpenChange: vi.fn(),
    id: 'test-position-id',
    txHash: '0x123...',
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Setup default mock implementations
    vi.mocked(usePosition).mockReturnValue({
      data: {
        positionId: 'test-position-id',
        chainId: 1,
        ownerAddress: '0xowner...',
        tokenAddress: '0xtoken...',
        registrationTxhash: '0x456...',
        targetTxhash: '0x789...',
        targetBlockHash: '0xblock...',
        createdAt: new Date().toISOString(),
        status: TransactionStatus.Pending,
        amount: '1000000000000000000',
        bitcoinAddress: 'bc1...',
        exchangeRate: '1',
        state: PositionStatus.Active,
        finality: Finality.UNKNOWN,
        hash: '0x123...',
        contractRegistrationTxHash: '0x456...'
      },
      isError: false,
      error: null,
      isPending: false,
      isLoading: false,
      isSuccess: true,
      isFetching: false,
      isRefetching: false,
      isRefetchError: false,
      isStale: false,
      isPlaceholderData: false,
      isInitialLoading: false,
      status: 'success',
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      failureCount: 0,
      errorUpdateCount: 0,
      refetch: vi.fn(),
      isLoadingError: false,
      failureReason: null,
      isFetched: true,
      isFetchedAfterMount: true,
      isPaused: false,
      fetchStatus: 'idle',
      promise: Promise.resolve({
        positionId: 'test-position-id',
        chainId: 1,
        ownerAddress: '0xowner...',
        tokenAddress: '0xtoken...',
        registrationTxhash: '0x456...',
        targetTxhash: '0x789...',
        targetBlockHash: '0xblock...',
        createdAt: new Date().toISOString(),
        status: TransactionStatus.Pending,
        amount: '1000000000000000000',
        bitcoinAddress: 'bc1...',
        exchangeRate: '1',
        state: PositionStatus.Active,
        finality: Finality.UNKNOWN,
        hash: '0x123...',
        contractRegistrationTxHash: '0x456...'
      })
    });

    vi.mocked(useTxConfirmations).mockReturnValue(3);

    vi.mocked(useEVMPositionPolling).mockReturnValue({
      evmPosition: {
        originalAmount: 1000000000000000000n, // 1 zkLTC with 18 decimals
        positionId: '0xabc...',
        status: 1,
        ownerAddress: '0xowner...',
        bitcoinAddress: ['bc1...'],
        availableAmount: 1000000000000000000n,
        settledAmount: 0n,
        withdrawnAmount: 0n,
        exchangeRate: 1n,
        partialSettlement: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        targetBlockHash: '0xblock...'
      } as EVMPosition,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    vi.mocked(useChainId).mockReturnValue(1);

    vi.mocked(useBitcoinPrice).mockReturnValue({
      data: {
        bitcoin: {
          usd: 50000,
          usd_24h_change: 0
        },
      },
      isError: false,
      error: null,
      isPending: false,
      isLoading: false,
      isSuccess: true,
      status: 'success',
      isFetching: false,
      isRefetching: false,
      isRefetchError: false,
      refetch: vi.fn(),
      isLoadingError: false,
      isPlaceholderData: false,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      isStale: false,
      isInitialLoading: false,
      fetchStatus: 'idle',
      errorUpdateCount: 0,
      isFetched: true,
      isFetchedAfterMount: true,
      promise: Promise.resolve({
        bitcoin: {
          usd: 50000,
          usd_24h_change: 0
        }
      })
    });

    vi.mocked(useBtcBlockConfirmations).mockReturnValue(6);
  });

  it('renders loading state correctly', () => {
    vi.mocked(useEVMPositionPolling).mockReturnValue({
      evmPosition: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(<PositionTracker {...mockProps} />, { wrapper });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    vi.mocked(useEVMPositionPolling).mockReturnValue({
      evmPosition: undefined,
      isLoading: false,
      error: new Error('Test error'),
      refetch: vi.fn(),
    });

    render(<PositionTracker {...mockProps} />, { wrapper });
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('renders transaction steps when position data is available', () => {
    render(<PositionTracker {...mockProps} />, { wrapper });
    
    // Check for step titles
    expect(screen.getByText('Initiating transaction')).toBeInTheDocument();
    expect(screen.getByText('Bridging complete')).toBeInTheDocument();
    
    // Check for transaction details
    const amountLabel = screen.getByText('Amount');
    expect(amountLabel).toBeInTheDocument();
    const amountValue = amountLabel.nextSibling;
    expect(amountValue).toHaveTextContent('~1 XBTC');
    expect(screen.getByText(/0xowne\.\.\.r\.\.\./)).toBeInTheDocument(); // Owner address
  });

  it('shows completion card when position is closed', () => {
    vi.mocked(useEVMPositionPolling).mockReturnValue({
      evmPosition: {
        originalAmount: 1000000000000000000n,
        positionId: '0xabc...',
        status: 2,
        ownerAddress: '0xowner...',
        bitcoinAddress: ['bc1...'],
        availableAmount: 1000000000000000000n,
        settledAmount: 0n,
        withdrawnAmount: 0n,
        exchangeRate: 1n,
        partialSettlement: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        targetBlockHash: '0xblock...'
      } as EVMPosition,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<PositionTracker {...mockProps} />, { wrapper });
    expect(screen.getByText(/Funds \(BTC\) are in your wallet now/i)).toBeInTheDocument();
  });
});
