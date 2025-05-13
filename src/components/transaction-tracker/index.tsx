import { ReservationTracker } from './reservation-tracker';
import { PositionTracker } from './position-tracker';

interface TransactionTrackerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'reservation' | 'position';
  id: string;
}

export function TransactionTrackerDialog({
  open,
  onOpenChange,
  type,
  id,
}: TransactionTrackerDialogProps) {
  // Render the appropriate tracker based on the type

  if (type === 'reservation') {
    return (
      <ReservationTracker open={open} onOpenChange={onOpenChange} id={id} />
    );
  }

  return <PositionTracker open={open} onOpenChange={onOpenChange} id={id} />;
}
