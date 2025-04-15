import { useCallback, useState } from 'react';
import { useAccount } from 'wagmi';
import { EvmWalletConnected } from './connected-wallet-button';
import { ConnectorsListDialog } from './connectors-list-dialog';
import { ConnectWalletButton } from './connect-button';

export const EvmWalletConnect = () => {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const handleConnectClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  return address ? (
    <EvmWalletConnected />
  ) : (
    <>
      <ConnectWalletButton handleConnectClick={handleConnectClick} />
      <ConnectorsListDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
