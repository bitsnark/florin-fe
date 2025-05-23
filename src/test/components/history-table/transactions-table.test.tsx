import { render, screen, act } from '@testing-library/react';
import TransactionsTable from '@/components/history-table/transactions-table';
import { useAccount } from 'wagmi';
import { useTransactions } from '@/hooks/useTransactions';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Mock } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWindowSize } from '@/components/history-table/utils';

// Mock ContractManager
vi.mock('@/services/ContractManager', () => ({
  ContractManager: {
    getInstance: vi.fn(() => ({
      getPosition: vi.fn(),
      getReservation: vi.fn(),
    })),
  },
}));

// Mock the hooks
vi.mock('wagmi', () => ({
  useAccount: vi.fn(),
  useChainId: vi.fn(() => 1),
  useConnectorClient: vi.fn(() => ({
    data: {
      getAddress: () => '0x123',
    },
  })),
}));

vi.mock('@/hooks/useTransactions', () => ({
  useTransactions: vi.fn(),
}));

// Mock window size hook and utils
vi.mock('@/components/history-table/utils', () => ({
  useWindowSize: vi.fn(),
  getChainLogo: (chain: string) => `/images/${chain.toLowerCase()}.png`,
  formatHash: (hash: string) => `${hash.slice(0, 6)}...${hash.slice(-4)}`,
  formatDate: (date: string) => new Date(date).toLocaleDateString(),
  formatReceivedAmount: () => '0.95',
}));

describe('TransactionsTable', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const mockTransactions = [
    {
      contractRegistrationTxHash: '0x123',
      fromChain: 'Ethereum',
      toChain: 'Bitcoin',
      amount: '1.0',
      receivedAmount: '0.95',
      originTxHash: '0x456',
      targetTxhash: '0x789',
      createdAt: '2024-03-20T10:00:00Z',
      state: 'completed',
      type: 'position',
      positionId: 'pos-123',
    },
  ];

  type UseAccountReturn = { address: string | undefined };
  type UseTransactionsReturn = { data: typeof mockTransactions; isLoading: boolean };

  beforeEach(() => {
    vi.clearAllMocks();
    (useWindowSize as Mock).mockReturnValue({ width: 1024 }); // Default to desktop
  });

  it('shows wallet not connected state when no wallet is connected', async () => {
    (useAccount as Mock).mockReturnValue({ address: undefined } as UseAccountReturn);
    (useTransactions as Mock).mockReturnValue({ data: [], isLoading: false } as UseTransactionsReturn);

    await act(async () => {
      render(<TransactionsTable />, { wrapper });
    });
    expect(screen.getByTestId('wallet-not-connected-state')).toBeInTheDocument();
  });

  it('shows loading state when transactions are being fetched', async () => {
    (useAccount as Mock).mockReturnValue({ address: '0x123' } as UseAccountReturn);
    (useTransactions as Mock).mockReturnValue({ data: [], isLoading: true } as UseTransactionsReturn);

    await act(async () => {
      render(<TransactionsTable />, { wrapper });
    });
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('shows empty state when no transactions are available', async () => {
    (useAccount as Mock).mockReturnValue({ address: '0x123' } as UseAccountReturn);
    (useTransactions as Mock).mockReturnValue({ data: [], isLoading: false } as UseTransactionsReturn);

    await act(async () => {
      render(<TransactionsTable />, { wrapper });
    });
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('renders transactions correctly in desktop view', async () => {
    (useAccount as Mock).mockReturnValue({ address: '0x123' } as UseAccountReturn);
    (useTransactions as Mock).mockReturnValue({ 
      data: mockTransactions, 
      isLoading: false 
    } as UseTransactionsReturn);

    await act(async () => {
      render(<TransactionsTable />, { wrapper });
    });
    
    // Check for chain names
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    
    // Check for amount and currency in the table cell
    const requestedAmountCell = screen.getByTestId('requested-amount');
    expect(requestedAmountCell).toHaveTextContent('1.0 xBTC');
    
    // Check for received amount
    const receivedAmountCell = screen.getByTestId('received-amount');
    expect(receivedAmountCell).toHaveTextContent('0.95 xBTC');
    
    // Check for status
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('renders transactions correctly in mobile view', async () => {
    // Mock mobile view
    (useWindowSize as Mock).mockReturnValue({ width: 375 });
    
    (useAccount as Mock).mockReturnValue({ address: '0x123' } as UseAccountReturn);
    (useTransactions as Mock).mockReturnValue({ 
      data: mockTransactions, 
      isLoading: false 
    } as UseTransactionsReturn);

    await act(async () => {
      render(<TransactionsTable />, { wrapper });
    });
    
    // Check for chain names
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    
    // Check for amount and currency in the mobile view
    const mobileView = screen.getByTestId('mobile-transaction-item');
    expect(mobileView).toBeInTheDocument();
    expect(mobileView).toHaveTextContent('1.0');
    expect(mobileView).toHaveTextContent('BTC');
  });

  it('opens transaction tracker dialog when clicking track button', async () => {
    (useAccount as Mock).mockReturnValue({ address: '0x123' } as UseAccountReturn);
    (useTransactions as Mock).mockReturnValue({ 
      data: mockTransactions, 
      isLoading: false 
    } as UseTransactionsReturn);

    await act(async () => {
      render(<TransactionsTable />, { wrapper });
    });
    
    const trackButton = screen.getByText('Track');
    await act(async () => {
      await trackButton.click();
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders transactions with correct status icons', async () => {
    const transactionsWithDifferentStatuses = [
      {
        ...mockTransactions[0],
        state: 'completed',
      },
      {
        ...mockTransactions[0],
        contractRegistrationTxHash: '0x456',
        state: 'pending',
      },
      {
        ...mockTransactions[0],
        contractRegistrationTxHash: '0x789',
        state: 'failed',
      },
    ];

    (useAccount as Mock).mockReturnValue({ address: '0x123' } as UseAccountReturn);
    (useTransactions as Mock).mockReturnValue({ 
      data: transactionsWithDifferentStatuses, 
      isLoading: false 
    } as UseTransactionsReturn);

    await act(async () => {
      render(<TransactionsTable />, { wrapper });
    });
    
    // Check for status icons
    expect(screen.getByTestId('status-icon-completed')).toBeInTheDocument();
    expect(screen.getByTestId('status-icon-pending')).toBeInTheDocument();
    expect(screen.getByTestId('status-icon-failed')).toBeInTheDocument();
  });
}); 