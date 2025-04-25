import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import XversIcon from '@/assets/wallet-icons/Xvers.svg';
import MetaMaskIcon from '@/assets/wallet-icons/MetaMask.svg';
import WalletConnectIcon from '@/assets/wallet-icons/walletConnect.svg';
import InjectedIcon from '@/assets/wallet-icons/Injected.svg';
import UnisatIcon from '@/assets/wallet-icons/UniSat.svg';
import OkxIcon from '@/assets/wallet-icons/Okx.svg';

export const gasFee = 0.0013;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const walletIcons = {
  xverse: XversIcon,
  metamask: MetaMaskIcon,
  walletConnect: WalletConnectIcon,
  metaMaskSDK: MetaMaskIcon,
  injected: InjectedIcon,
  unisat: UnisatIcon,
  'com.okex.wallet': OkxIcon,
};

export function truncateAddress(address: string) {
  if (!address) return '';
  const first = address.substring(0, 6);
  const last = address.substring(address.length - 4);
  return `${first}...${last}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function stringifyWithBigInt(obj: any): string {
  return JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
}
