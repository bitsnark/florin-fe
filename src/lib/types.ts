export enum Finality {
  UNKNOWN = 'UNKNOWN',
  FINAL = 'FINAL',
  REVERTED = 'REVERTED'
}

export enum PositionState {
  NONE = 'NONE',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  CLOSED = 'CLOSED',
}

export enum ReservationState {
  NONE = 'NONE',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  CANCELED = 'CANCELED',
  SETTLED = 'SETTLED',
}

export interface Position {
  positionId: string;
  chainId: number;
  state: PositionState;
  ownerAddress: string;
  tokenAddress: string;
  originalAmount: string; // Using string instead of bigint for JSON compatibility
  bitcoinAddress: string;
  exchangeRate: string; // Using string instead of bigint for JSON compatibility
  blockNumber: number;
  blockHash: string;
  finality: Finality;
}

export interface Reservation {
  reservationId: string;
  positionId: string;
  state: ReservationState;
  ownerAddress: string;
  blockNumber: number;
  blockHash: string;
  amount: string; // Using string instead of bigint for JSON compatibility
  finality: Finality;
} 