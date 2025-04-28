import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@/config/wagmi';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { WalletDialogProvider } from '@/context/walletDialogContext';

const evmQueryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={evmQueryClient}>
          <WalletDialogProvider>{children}</WalletDialogProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};
