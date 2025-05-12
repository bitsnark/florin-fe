import { Address, Chain, Hash } from 'viem';

export enum Finality {
  UNKNOWN = 'UNKNOWN',
  FINAL = 'FINAL',
  REVERTED = 'REVERTED',
}

export enum PositionStatus {
  None = 'None',
  Active = 'Active',
  Paused = 'Paused',
  Closed = 'Closed'
}

export enum ReservationStatus {
  None = 'None',
  Pending = 'Pending',
  Expired = 'Expired',
  Canceled = 'Canceled',
  Settled = 'Settled'
}


export enum TransactionStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
}

export type Position = {
  positionId: string;
  chainId: number;
  ownerAddress: string;
  tokenAddress: Address;
  bitcoinAddress: string;
  exchangeRate: string;
  state: PositionStatus;
  finality: Finality;
  amount: string;
  deadline?: number;
  blockNumber?: number;
  blockHash?: string;
  hash: string;
  createdAt: string; // ISO 8601 string
  receivedAmount?: string;
  status: TransactionStatus;
  contractRegistrationTxHash: string;
  originTxHash?: string;
  destinationTxHash?: string;
  originTxConfirmations?: number;
  destinationsTxConfirmations?: number;
};

export type Reservation = {
  reservationId: string;
  ownerAddress: string;
  positionId?: string;
  tokenAddress: Address,
  amount: string;
  state: ReservationStatus;
  finality: Finality;
  chainId: number;
  bitcoinAddress?: string;
  blockNumber?: number;
  blockHash?: string;
  hash: string;
  createdAt: string; // ISO 8601 string
  receivedAmount?: string;
  status: TransactionStatus;
  contractRegistrationTxHash: string;
  originTxHash?: string;
  destinationTxHash?: string;
  originTxConfirmations?: number;
  destinationsTxConfirmations?: number;
};

export type EVMPosition = {
  positionId: string;
  ownerAddress: Address;
  bitcoinAddress: string[];
  originalAmount: bigint;
  availableAmount: bigint;
  settledAmount: bigint;
  withdrawnAmount: bigint;
  exchangeRate: bigint;
  partialSettlement: boolean;
  status: number;
};

export type EVMReservation = {
  reservationId: string;
  positionId: string;
  ownerAddress: Address;
  tokenAmount: bigint;
  depositAmount: bigint;
  createdAtBlock: bigint;
  status: number;
  bitcoinAddress: string;
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



export type TransactionHistoryItem = {
  positionId: string;
  reservationId?: string;
  amount: string;
  tokenAddress: string;
  ownerAddress: string;
  bitcoinAddress: string;
  registrationChain: number;
  registrationTxhash: string;
  registrationBlockHash: string;
  registrationBlockNumber: number;
  registrationFinality: Finality;
  originChain: number;
  originTxhash: string;
  originBlockNumber: number;
  originBlockHash: string;
  originFinality: Finality;
  state: PositionStatus | ReservationStatus;
  destinationTxHash?: string;
  destinationBlockNumber?: number;
  destinationBlockHash?: string;
  destinationTxConfirmations?: number;
};

export type TransactionHistory = TransactionHistoryItem[]; 

export interface Transaction {
  hash: string;
  date: string;
  action: string;
  asset: string;
  fromChain: string;
  toChain: string;
  amount: string;
  receivedAmount: string;
  status: TransactionStatus;
  contractRegistration: string;
  originTxId: string;
  destinationTxId: string;
}
