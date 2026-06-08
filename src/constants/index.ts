import { env } from "@/config/env";
import { PositionStatus, ReservationStatus } from "@/types";

export const DEFAULT_POSITION_ID = env.VITE_DEFAULT_POSITION_ID;
export const ZKLTC_DECIMALS = 18;
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
