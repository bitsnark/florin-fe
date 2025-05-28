import { PositionStatus, ReservationStatus } from "@/types";

export const DEFAULT_POSITION_ID = '0xf0e94d3b55389b66f693bf6a4ae0eec46a1e61342c9efeaa96ba6ada1d555ca2';
export const ETHERSCAN_URL = 'https://sepolia.etherscan.io';
export const BITCOIN_TESTNET_URL = 'https://mempool.space/testnet4';

export const STATUS_LABEL = {
  [PositionStatus.None.toLowerCase()]: 'Pending',
  [PositionStatus.Active.toLowerCase()]: 'Pending',
  [PositionStatus.Paused.toLowerCase()]: 'Paused',
  [PositionStatus.Closed.toLowerCase()]: 'Completed',
  [ReservationStatus.Pending.toLowerCase()]: 'Pending',
  [ReservationStatus.Expired.toLowerCase()]: 'Expired',
  [ReservationStatus.Canceled.toLowerCase()]: 'Canceled',
  [ReservationStatus.Settled.toLowerCase()]: 'Completed',
}