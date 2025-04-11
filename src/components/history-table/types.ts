export interface Transaction {
  hash: string;
  date: string;
  action: string;
  asset: string;
  fromChain: string;
  toChain: string;
  amount: string;
  receivedAmount: string;
  status: 'Completed' | 'Pending' | 'Failed';
  contractRegistration: string;
  originTxId: string;
  destinationTxId: string;
}
