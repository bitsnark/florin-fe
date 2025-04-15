import { useCallback } from 'react';
import { Connector, useConnect } from 'wagmi';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Card } from '../ui/card';
import { walletIcons } from '@/lib/utils';
import { DialogTitle } from '@radix-ui/react-dialog';

export const ConnectorsListDialog = ({ isOpen, setIsOpen } : { isOpen: boolean, setIsOpen: (isOpen: boolean) => void} ) => {
  const { connectors, connect } = useConnect();
  
  const handleConnectorClick = useCallback(
    (connector: Connector) => {
      connect({ connector });
    },
    [connect]
  );

  // Ensure OKX Wallet is first in the list
  const sortedConnectors = [...connectors]
    .sort((a, b) =>
      a.id === 'com.okex.wallet' ? -1 : b.id === 'com.okex.wallet' ? 1 : 0
    )
    .filter((connector) => connector.id !== 'injected');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger
        title="Connect EVM wallet"
        className="rounded-t-[0.625rem]"
      />

      <DialogContent className="p-6 border-none">
        <DialogTitle>Connect EVM wallet</DialogTitle>
        <div className="flex gap-2 flex-col">
          {sortedConnectors.map((connector) => (
            <Card
              key={connector.name}
              onClick={() => handleConnectorClick(connector)}
              className="px-2.5 py-4 text-base font-[500] justify-start text-sov-white rounded-lg bg-input-bg border-none cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="flex gap-2 items-center">
                <div className="bg-white/16 w-8 h-8 flex items-center justify-center p-[5px] rounded">
                   <img
                    src={walletIcons[connector?.id as keyof typeof walletIcons]}
                    alt={connector.name}
                    className="w-6 h-6 min-w-6 min-h-6 rounded"
                  /> 
                </div>
                <span>{connector.name}</span>
              </div>
            </Card>
          ))}
        </div>
        <div className='w-full flex justify-end gap-2 | text-[12px]'>
          <span>Don't have a wallet?</span><a href='' className='text-[#F5A549]! underline! underline-offset-4 font-[500]'>Get one here</a> 
        </div>
      </DialogContent>
    </Dialog>
  );
};
