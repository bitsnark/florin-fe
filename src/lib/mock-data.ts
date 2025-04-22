import {
  Finality,
  Position,
  PositionState,
  Reservation,
  ReservationState,
} from '../types';

// Mock data for positions
export const mockPositions: Position[] = [
  {
    positionId:
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    chainId: 1,
    state: PositionState.ACTIVE,
    ownerAddress: '0xabc123def456abc123def456abc123def456abc1',
    tokenAddress: '0xdef456abc123def456abc123def456abc123def4',
    originalAmount: '1000000000000000000', // 1 token with 18 decimals
    bitcoinAddress:
      'bc1q123xyz456abc789def0123456789abcdef0123456789abcdef0123456789',
    exchangeRate: '10000000000', // 10^10 (1:1)
    blockNumber: 12345678,
    blockHash:
      '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    finality: Finality.FINAL,
  },
  {
    positionId:
      '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef',
    chainId: 1,
    state: PositionState.ACTIVE,
    ownerAddress: '0xabc123def456abc123def456abc123def456abc1',
    tokenAddress: '0xdef456abc123def456abc123def456abc123def4',
    originalAmount: '2000000000000000000', // 2 tokens with 18 decimals
    bitcoinAddress:
      'bc1q234xyz567abc890def1234567890abcdef1234567890abcdef1234567890',
    exchangeRate: '10000000000', // 10^10 (1:1)
    blockNumber: 12345679,
    blockHash:
      '0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890a',
    finality: Finality.FINAL,
  },
  {
    positionId:
      '0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef',
    chainId: 1,
    state: PositionState.PAUSED,
    ownerAddress: '0xdef456abc123def456abc123def456abc123def4',
    tokenAddress: '0xdef456abc123def456abc123def456abc123def4',
    originalAmount: '5000000000000000000', // 5 tokens with 18 decimals
    bitcoinAddress:
      'bc1q345xyz678abc901def2345678901abcdef2345678901abcdef2345678901',
    exchangeRate: '10000000000', // 10^10 (1:1)
    blockNumber: 12345680,
    blockHash:
      '0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
    finality: Finality.FINAL,
  },
];

// Mock data for reservations
export const mockReservations: Reservation[] = [
  {
    reservationId:
      '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    positionId:
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    state: ReservationState.PENDING,
    ownerAddress: '0xabc123def456abc123def456abc123def456abc1',
    blockNumber: 12345700,
    blockHash:
      '0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0',
    amount: '500000000000000000', // 0.5 tokens with 18 decimals
    finality: Finality.FINAL,
  },
  {
    reservationId:
      '0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890a',
    positionId:
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    state: ReservationState.SETTLED,
    ownerAddress: '0xabc123def456abc123def456abc123def456abc1',
    blockNumber: 12345701,
    blockHash:
      '0x23456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01',
    amount: '300000000000000000', // 0.3 tokens with 18 decimals
    finality: Finality.FINAL,
  },
  {
    reservationId:
      '0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
    positionId:
      '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef',
    state: ReservationState.PENDING,
    ownerAddress: '0xdef456abc123def456abc123def456abc123def4',
    blockNumber: 12345702,
    blockHash:
      '0x3456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012',
    amount: '1000000000000000000', // 1 token with 18 decimals
    finality: Finality.FINAL,
  },
];
