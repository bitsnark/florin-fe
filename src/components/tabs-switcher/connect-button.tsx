import { Button } from '@/components/ui/button';
import { useWalletDialog } from '@/hooks/useWalletDialog';

interface ConnectButtonProps {
  isWalletConnected: boolean;
  isAnimating: boolean;
}

export function ConnectButton({
  isWalletConnected,
  isAnimating,
}: ConnectButtonProps) {
  const { openDialog } = useWalletDialog();
  return isWalletConnected ? null : (
    <Button
      onClick={openDialog}
      isAnimating={isAnimating}
      variant="orange"
      size="custom"
    >
      {'Connect wallet'}
    </Button>
  );
}
