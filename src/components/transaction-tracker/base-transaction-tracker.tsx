import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ReactNode } from 'react';
import { TrackerSkeleton } from './tracker-skeleton';

interface BaseTransactionTrackerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  isLoading: boolean;
  error: unknown;
  children: ReactNode;
  maxHeight?: string;
}

export function BaseTransactionTracker({
  open,
  onOpenChange,
  title = 'Tracker',
  isLoading,
  error,
  children,
  maxHeight = 'max-h-[90vh]',
}: BaseTransactionTrackerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`bg-[#1E1C21] border-none rounded-xl overflow-y-auto scrollbar-hide w-full md:w-[585px] ${maxHeight} pt-4 md:pt-6 px-4 md:pr-6 md:pl-6 pb-6 md:pb-9`}
      >
        <h3 className="font-semibold text-base">{title}</h3>
        {isLoading ? (
          <TrackerSkeleton />
        ) : error ? (
          <div className="text-red-500 text-center py-4">
            {error instanceof Error ? error.message : 'An error occurred'}
          </div>
        ) : (
          <div className="relative">{children}</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
