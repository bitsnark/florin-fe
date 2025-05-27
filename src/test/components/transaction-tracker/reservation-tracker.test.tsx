import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReservationTracker } from '@/components/transaction-tracker/reservation-tracker';
import { useReservation } from '@/hooks/queries/useReservation';
import { useTxConfirmations } from '@/hooks/useTxConfirmations';
import { useEVMReservationPolling } from '@/hooks/useEVMReservationPolling';
import { useChainId } from 'wagmi';
import { useBitcoinPrice } from '@/hooks/useBitcoinPrice';
import { useBtcBlockConfirmations } from '@/hooks/useBtcBlockConfirmations';
import { ReservationStatus, Finality } from '@/types';

// Mock all the hooks
vi.mock('@/hooks/queries/useReservation');
vi.mock('@/hooks/useTxConfirmations');
vi.mock('@/hooks/useEVMReservationPolling');
vi.mock('wagmi');
vi.mock('@/hooks/useBitcoinPrice');
vi.mock('@/hooks/useBtcBlockConfirmations');
vi.mock('@/components/history-table/transaction-history-adapter', () => ({
  RESERVATION_STATUS_MAP: {
    0: 'Pending',
    1: 'Pending',
    2: 'Settled',
    3: 'Expired'
  }
}));

describe('ReservationTracker', () => {
  const mockProps = {
    open: true,
    onOpenChange: vi.fn(),
    id: 'test-reservation-id',
    txHash: '0x123...',
  };

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Setup default mock implementations
    vi.mocked(useReservation).mockReturnValue({
      data: {
        data: {
          reservationId: 'test-reservation-id',
          ownerAddress: '0xowner...',
          tokenAddress: '0xtoken...',
          amount: '1000000000000000000',
          state: ReservationStatus.Pending,
          finality: Finality.UNKNOWN,
          chainId: 1,
          hash: '0x123...',
          createdAt: new Date().toISOString(),
          contractRegistrationTxHash: '0x456...',
          targetBlockHash: '0xblock...',
          targetBlockNumber: 123,
          targetTxhash: '0x789...',
          targetChain: 1
        },
        blockCount: 0
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
        data: {
          reservationId: 'test-reservation-id',
          ownerAddress: '0xowner...',
          tokenAddress: '0xtoken...',
          amount: '1000000000000000000',
          state: ReservationStatus.Pending,
          finality: Finality.UNKNOWN,
          chainId: 1,
          hash: '0x123...',
          createdAt: new Date().toISOString(),
          contractRegistrationTxHash: '0x456...',
          targetBlockHash: '0xblock...',
          targetBlockEight: 123,
          targetTxhash: '0x789...',
          targetChain: 1
        },
        blockCount: 0
      })
    });

    vi.mocked(useTxConfirmations).mockReturnValue(3);

    vi.mocked(useEVMReservationPolling).mockReturnValue({
      evmReservation: {
        tokenAmount: 100000000n, // 1 BTC in satoshis
        reservationId: '0xabc...',
        status: 1,
        ownerAddress: '0xowner...',
        bitcoinAddress: 'bc1...',
        depositAmount: 100000000n,
        createdAtBlock: 123n,
        positionId: '0xpos...'
      },
      isLoading: false,
      error: null,
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

    vi.mocked(useBtcBlockConfirmations).mockReturnValue(3);
  });

  it('renders error state correctly', () => {
    vi.mocked(useEVMReservationPolling).mockReturnValue({
      evmReservation: undefined,
      isLoading: false,
      error: new Error('Test error'),
    });

    render(<ReservationTracker {...mockProps} />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('renders transaction steps when reservation data is available', () => {
    render(<ReservationTracker {...mockProps} />);
    
    // Check for step titles
    expect(screen.getByText('Request transfer')).toBeInTheDocument();
    expect(screen.getByText('Send BTC')).toBeInTheDocument();
    expect(screen.getByText('BTC transaction detected')).toBeInTheDocument();
    expect(screen.getByText('Bridging complete')).toBeInTheDocument();
    
    // Check for transaction details
    const amountElements = screen.getAllByTestId('btc-amount');
    expect(amountElements[0]).toHaveTextContent('~1 BTC');
    
    // Find the reservation ID in the Reservation TX field
    expect(screen.getByText('Reservation TX')).toBeInTheDocument();
    const reservationTx = screen.getByText(/0x123/);
    expect(reservationTx).toBeInTheDocument();
  });

  it('shows completion card when reservation is settled', () => {
    vi.mocked(useEVMReservationPolling).mockReturnValue({
      evmReservation: {
        tokenAmount: 1000000000000000000n,
        reservationId: '0xabc...',
        status: 2, // Settled status
        ownerAddress: '0xowner...',
        bitcoinAddress: 'bc1...',
        depositAmount: 1000000000000000000n,
        createdAtBlock: 123n,
        positionId: '0xpos...'
      },
      isLoading: false,
      error: null,
    });

    render(<ReservationTracker {...mockProps} />);
    expect(screen.getByText(/Funds \(xBTC\) are in your wallet now/i)).toBeInTheDocument();
  });

  it('shows BTC transaction card when Bitcoin transaction is detected', () => {
    // Mock the reservation data to include targetBlockHash and targetBlockEight
    vi.mocked(useReservation).mockReturnValue({
      data: {
        data: {
          reservationId: 'test-reservation-id',
          ownerAddress: '0xowner...',
          tokenAddress: '0xtoken...',
          amount: '1000000000000000000',
          state: ReservationStatus.Pending,
          finality: Finality.UNKNOWN,
          chainId: 1,
          hash: '0x123...',
          createdAt: new Date().toISOString(),
          contractRegistrationTxHash: '0x456...',
          targetBlockHash: '0xblock...',
          targetBlockNumber: 123,
          targetTxhash: '0x789...',
          targetChain: 1
        },
        blockCount: 0
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
        data: {
          reservationId: 'test-reservation-id',
          ownerAddress: '0xowner...',
          tokenAddress: '0xtoken...',
          amount: '1000000000000000000',
          state: ReservationStatus.Pending,
          finality: Finality.UNKNOWN,
          chainId: 1,
          hash: '0x123...',
          createdAt: new Date().toISOString(),
          contractRegistrationTxHash: '0x456...',
          targetBlockHash: '0xblock...',
          targetBlockEight: 123,
          targetTxhash: '0x789...',
          targetChain: 1
        },
        blockCount: 0
      })
    });

    render(<ReservationTracker {...mockProps} />);
    
    // Verify that the BTC transaction card is shown
    const btcCards = screen.getAllByTestId('btc-amount');
    expect(btcCards).toHaveLength(2); // Should show both the initial card and the BTC transaction card
    
    // Verify the BTC transaction details
    expect(screen.getByText('TXID')).toBeInTheDocument();
    const txid = screen.getByText(/0x789/);
    expect(txid).toBeInTheDocument();
  });

  it('shows expiration message when reservation expires', () => {
    // Mock the reservation data with Expired state
    vi.mocked(useReservation).mockReturnValue({
      data: {
        data: {
          reservationId: 'test-reservation-id',
          ownerAddress: '0xowner...',
          tokenAddress: '0xtoken...',
          amount: '1000000000000000000',
          state: ReservationStatus.Expired,
          finality: Finality.UNKNOWN,
          chainId: 1,
          hash: '0x123...',
          createdAt: new Date().toISOString(),
          contractRegistrationTxHash: '0x456...',
          targetBlockHash: '0xblock...',
          targetBlockNumber: 123,
          targetTxhash: '0x789...',
          targetChain: 1
        },
        blockCount: 0
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
        data: {
          reservationId: 'test-reservation-id',
          ownerAddress: '0xowner...',
          tokenAddress: '0xtoken...',
          amount: '1000000000000000000',
          state: ReservationStatus.Expired,
          finality: Finality.UNKNOWN,
          chainId: 1,
          hash: '0x123...',
          createdAt: new Date().toISOString(),
          contractRegistrationTxHash: '0x456...',
          targetBlockHash: '0xblock...',
          targetBlockNumber: 123,
          targetTxhash: '0x789...',
          targetChain: 1
        },
        blockCount: 0
      })
    });

    vi.mocked(useEVMReservationPolling).mockReturnValue({
      evmReservation: {
        tokenAmount: 1000000000000000000n,
        reservationId: '0xabc...',
        status: 3, // Expired status
        ownerAddress: '0xowner...',
        bitcoinAddress: 'bc1...',
        depositAmount: 1000000000000000000n,
        createdAtBlock: 123n,
        positionId: '0xpos...'
      },
      isLoading: false,
      error: null,
    });

    render(<ReservationTracker {...mockProps} />);
    
    // Verify that the expiration message is shown
    const expiredMessage = screen.getByTestId('reservation-expired-message');
    expect(expiredMessage).toBeInTheDocument();
    expect(expiredMessage).toHaveTextContent('Your reservation is not valid anymore');
    
    // Verify that the BTC transaction card is not shown
    const btcCards = screen.getAllByTestId('btc-amount');
    expect(btcCards).toHaveLength(1); // Should only show the initial card
  });
}); 