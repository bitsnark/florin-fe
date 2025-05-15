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

/**
 * Validates a Bitcoin address
 * Supports P2PKH, P2SH, Bech32 (SegWit) addresses
 * @param address Bitcoin address to validate
 * @returns true if the address is valid, false otherwise
 */
export function isValidBitcoinAddress(address: string | undefined): boolean {
  if (!address) return false;

  // P2PKH addresses (Legacy) - start with 1
  const p2pkhRegex = /^1[a-km-zA-HJ-NP-Z1-9]{25,34}$/;

  // P2SH addresses - start with 3
  const p2shRegex = /^3[a-km-zA-HJ-NP-Z1-9]{25,34}$/;

  // Bech32 (SegWit) addresses - start with bc1
  const bech32Regex = /^bc1[a-z0-9]{39,59}$/;

  // Testnet addresses
  const testnetRegex = /^(m|n|tb1)[a-zA-HJ-NP-Z1-9]{25,59}$/;

  // Check if address matches any valid Bitcoin address format
  return (
    p2pkhRegex.test(address) ||
    p2shRegex.test(address) ||
    bech32Regex.test(address) ||
    testnetRegex.test(address)
  );
}

/**
 * Converts a Bitcoin address to a bytes32 value
 * @param address Bitcoin address to convert
 * @returns bytes32 value as a hex string
 */
export function bech32ToBytes32(address: string): `0x${string}` {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(address);
  return `0x${Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 64)
    .padEnd(64, '0')}` as `0x${string}`;
}

/**
 * Converts a bytes32 value back to a Bitcoin address
 * @param bytes32 The bytes32 value to convert
 * @returns The original Bitcoin address
 */
export function bytes32ToBech32(bytes32: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(bytes32);
  return `0x${Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 64)
    .padEnd(64, '0')}` as `0x${string}`;
}