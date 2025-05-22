import { Button } from '@/components/ui/button';
import { useWalletDialog } from '@/hooks/useWalletDialog';

interface ConnectButtonProps {
  isWalletConnected: boolean;
  isAnimating: boolean;
  isSupported: boolean;
}

export function ConnectButton({
  isWalletConnected,
  isAnimating,
  isSupported,
}: ConnectButtonProps) {
  const { openDialog } = useWalletDialog();
  const label = isSupported ? 'Connect wallet' : 'Unsupported network';
  return isWalletConnected && isSupported ? null : (
    <Button
      onClick={openDialog}
      isAnimating={isAnimating}
      variant="orange"
      size="custom"
      disabled={!isSupported}
    >
      {label}
    </Button>
  );
}
