import { Position, Reservation } from "@/types";
import { usePosition } from "./queries/usePosition";
import { useReservation } from "./queries/useReservation";

type TrackerType = 'btc' | 'eth';

export type Result =
  | { type: 'eth'; data: Position | undefined; isLoading: boolean; error: unknown }
  | { type: 'btc'; data: Reservation | undefined; isLoading: boolean; error: unknown };

export function useTrackerData(type: TrackerType, id: string): Result {
  const position = usePosition(type === 'eth' ? id : undefined, { refetchInterval: 50000 });
  const reservation = useReservation(type === 'btc' ? id : undefined, { refetchInterval: 50000 });

  if (type === 'eth') {
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
