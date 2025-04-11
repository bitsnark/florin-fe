import { Transaction } from './types';

export const mockTransactions: Transaction[] = [
  {
    hash: '0x4f3c2b1a9dce1234abcd5678ef910abc',
    date: '2025-04-08T14:32:00Z',
    action: 'Deposit',
    asset: 'ETH',
    fromChain: 'Ethereum',
    toChain: 'Bitcoin',
    amount: '0.75',
    receivedAmount: '0.0075',
    status: 'Completed',
    originTxId: '0x4f3c2b1a9dce1234abcd5678ef910abc',
    destinationTxId: '0x4f3c2b1a9dce1234abcd5678ef910abc',
    contractRegistration: '0x4f3c2b1a9dce1234abcd5678ef910abc',
  },
  {
    hash: '0xb7a8e4c2d9ab9876abcd4321ef0987cd',
    date: '2025-04-09T09:15:00Z',
    action: 'Withdraw',
    asset: 'BTC',
    fromChain: 'Bitcoin',
    toChain: 'Ethereum',
    amount: '1.26',
    receivedAmount: '0.0075',
    status: 'Pending',
    originTxId: '0x4f3c2b1a9dce1234abcd5678ef910abc',
    destinationTxId: '0x4f3c2b1a9dce1234abcd5678ef910abc',
    contractRegistration: '0x4f3c2b1a9dce1234abcd5678ef910abc',
  },
];
