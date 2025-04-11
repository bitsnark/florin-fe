import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ConnectButtonProps {
  isWalletConnected: boolean;
  termsAccepted: boolean;
  toCurrency: 'btc' | 'eth' | 'xbtc';
  bitcoinAddress: string;
  isAnimating: boolean;
}

export function ConnectButton({
  isWalletConnected,
  termsAccepted,
  toCurrency,
  bitcoinAddress,
  isAnimating,
}: ConnectButtonProps) {
  return (
    <div
      className={cn(
        'flex justify-center items-center w-full mt-5 transition-all duration-300 ease-in-out',
        isAnimating ? 'opacity-0' : 'opacity-100'
      )}
    >
      <Button
        variant="orange"
        size="custom"
        disabled={
          !termsAccepted || (toCurrency === 'btc' && !bitcoinAddress.trim())
        }
      >
        {isWalletConnected ? 'Bridge funds' : 'Connect wallet'}
      </Button>
    </div>
  );
}
