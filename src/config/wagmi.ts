import { createConfig, http, injected } from '@wagmi/core';
import { metaMask, walletConnect } from '@wagmi/connectors';
import { supportedChains } from './evm-chains';
import { ChainId } from '@/types/chains';
import { env } from './env';

const walletConnector = walletConnect({
  projectId: env.VITE_WALLETCONNECT_PROJECT_ID,
  qrModalOptions: {
    themeMode: 'dark',
  },
});

export const wagmiConfig = createConfig({
  chains: supportedChains,
  connectors: [injected(), walletConnector, metaMask()],
  transports: Object.fromEntries(
    supportedChains.map(chain => [chain.id, http()]),
  ) as Record<ChainId, ReturnType<typeof http>>,
});
