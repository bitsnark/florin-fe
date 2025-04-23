import { Position, Reservation } from '@/types';
import { usePosition } from './queries/usePosition';
import { useReservation } from './queries/useReservation';

type TrackerType = 'position' | 'reservation';

export type Result =
  | {
      type: 'position';
      data: Position | undefined;
      isLoading: boolean;
      error: unknown;
    }
  | {
      type: 'reservation';
      data: Reservation | undefined;
      isLoading: boolean;
      error: unknown;
    };

export function useTrackerData(type: TrackerType, id: string): Result {
  const position = usePosition(type === 'reservation' ? id : undefined, {
    refetchInterval: 50000,
  });
  const reservation = useReservation(type === 'position' ? id : undefined, {
    refetchInterval: 50000,
  });

  if (type === 'position') {
    return {
      type,
      data: position.data,
      isLoading: position.isLoading,
      error: position.error,
    };
  }

  return {
    type,
    data: reservation.data,
    isLoading: reservation.isLoading,
    error: reservation.error,
  };
}
