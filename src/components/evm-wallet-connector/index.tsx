import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { EvmWalletConnected } from './connected-wallet-button';
import { ConnectWalletButton } from './connect-button';
import { useWalletDialog } from '@/hooks/useWalletDialog';

export const EvmWalletConnect = () => {
  const { address } = useAccount();
  const { openDialog } = useWalletDialog();
  const handleConnectClick = useCallback(() => {
    openDialog();
  }, [openDialog]);

  return address ? (
    <EvmWalletConnected />
  ) : (
    <ConnectWalletButton handleConnectClick={handleConnectClick} />
  );
};
