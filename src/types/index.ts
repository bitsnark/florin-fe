import { Address, Chain, Hash } from 'viem';

export enum Finality {
  UNKNOWN = 'UNKNOWN',
  FINAL = 'FINAL',
  REVERTED = 'REVERTED',
}

export enum PositionStatus {
  NONE = 'NONE',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  CLOSED = 'CLOSED',
  COMPLETED = 'COMPLETED',
}

export enum ReservationStatus {
  NONE = 'NONE',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export enum TransactionStatus {
  NONE = 'NONE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type Position = {
  positionId: string;
  chainId: number;
  ownerAddress: string;
  tokenAddress: string;
  originalAmount: string;
  bitcoinAddress: string;
  exchangeRate: string;
  state: PositionStatus;
  finality: Finality;
  amount: string;
  transaction?: Transaction;
};

export type Reservation = {
  reservationId: string;
  ownerAddress: string;
  positionId: string;
  amount: string;
  state: ReservationStatus;
  finality: Finality;
  transaction?: Transaction;
};

export type Transaction = {
  blockNumber: number;
  blockHash: string;
  hash: string;
  date: string; // ISO 8601 string
  receivedAmount: string;
  status: TransactionStatus;
  contractRegistration: string;
  originTxId: string;
  destinationTxId?: string;
};


export interface ContractManagerConfig {
  chain: Chain;
  network: {
    rpcUrl: string;
  };
  privateKey?: Address;
}

export interface ContractConfig {
  // TODO: Fix this type once we have the correct type for the contract
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any[];
  bytecode: Address;
}

export interface TransactionResponse {
  hash: Hash;
  // TODO: Fix this type once we have the correct type for the transaction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wait: () => Promise<any>;
}
