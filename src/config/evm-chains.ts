import { ChainId } from '@/types/chains';
import { defineChain } from 'viem';

const createChain = (
  id: ChainId,
  name: string,
  nativeSymbol: string,
  rpcUrl: string,
  explorerUrl: string,
  explorerApiUrl: string
) =>
  defineChain({
    id,
    name,
    nativeCurrency: {
      name: nativeSymbol,
      symbol: nativeSymbol,
      decimals: 18,
    },
    rpcUrls: {
      default: { http: [rpcUrl] },
    },
    blockExplorers: {
      default: {
        name: `${name} Explorer`,
        url: explorerUrl,
        apiUrl: explorerApiUrl,
      },
    },
  });

export const sepolia = createChain(
  ChainId.Sepolia,
  'Sepolia',
  'tETH',
  'https://sepolia.gateway.tenderly.co',
  'https://sepolia.etherscan.io',
  'https://api-sepolia.etherscan.io/api'
);

export const baseSepolia = createChain(
  ChainId.BaseSepolia,
  'Base Sepolia',
  'ETH',
  'https://sepolia.base.org',
  'https://sepolia.basescan.org',
  'https://sepolia.basescan.org/api'
);

export const localhost = defineChain({
  id: 31337,
  name: 'Hardhat',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
  },
});

export const supportedChains = [sepolia, baseSepolia, localhost] as const;

export const AIRDROP_API_MAP: Record<number, string> = {
  [ChainId.Sepolia]: 'https://sepolia.airdroper.bitcoinos.build',
  [ChainId.BaseSepolia]: 'https://basesepolia.airdroper.bitcoinos.build',
};
