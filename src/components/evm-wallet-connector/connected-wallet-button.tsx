import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { Dialog, DialogContent } from '../ui/dialog';
import { truncateAddress } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Card } from '../ui/card';
import EthLogo from '@/assets/eth-logo.png';
export const EvmWalletConnected = () => {
  const { disconnect } = useDisconnect();
  const { address, connector } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  /* const onCopyAddress = useCallback(() => {
    navigator.clipboard.writeText(address || '');
  }, [address]); */

  const truncatedAddr = truncateAddress(address || '');
  console.log(connector);
  return (
    <>
      <Card
        onClick={() => setIsOpen(true)}
        className="text-white text-[14px] font-bold | bg-grey h-[88px] rounded-xl py-2 px-4 border-none cursor-pointer hover:opacity-90 transition-opacity"
      >
        <div className=" h-full flex flex-row items-center justify-between gap-9">
          <div className="flex flex-row items-center gap-2">
            <img src={EthLogo} alt="Ethereum Logo" className="w-4 h-4" />
            {truncatedAddr}
          </div>

          <ChevronDown className="text-white" size={16} />
        </div>
      </Card>
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent className="p-6">
          <div onClick={() => disconnect()} className="cursor-pointer">
            Disconnect
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
