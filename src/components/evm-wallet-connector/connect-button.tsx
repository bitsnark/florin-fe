import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export const ConnectWalletButton = ({ handleConnectClick }: { handleConnectClick: () => void }) => {
  return (
    <>
      <Card className="hidden md:flex flex-row items-center justify-center bg-grey w-[265px] h-[88px] rounded-xl pt-2 pr-2 pb-2 pl-8 border-none">
        <span className="text-white font-bold">Connect Wallet</span>
        <Button variant="orange" size="box" onClick={handleConnectClick}>
          <ArrowRight size={24} />
        </Button>
      </Card>
      <Button
        className="block md:hidden px-8 w-fit"
        variant="orange"
        size="box"
        onClick={handleConnectClick}
      >
        Connect
      </Button>
    </>
  );
};
