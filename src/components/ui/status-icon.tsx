import {
  CheckCircledIcon,
  SymbolIcon,
  CrossCircledIcon,
  ClockIcon,
} from '@radix-ui/react-icons';
import { PositionStatus, ReservationStatus } from '@/types';
import expiredIcon from '@/assets/expired.svg';

interface StatusIconProps {
  status: PositionStatus | ReservationStatus;
  className?: string;
}

const POSITION_ICON_MAP = {
  [PositionStatus.None]: SymbolIcon,
  [PositionStatus.Active]: ClockIcon,
  [PositionStatus.Paused]: CrossCircledIcon,
  [PositionStatus.Closed]: CheckCircledIcon,
} as const;

const RESERVATION_ICON_MAP = {
  [ReservationStatus.None]: SymbolIcon,
  [ReservationStatus.Pending]: ClockIcon,
  [ReservationStatus.Expired]: () => (
    <img src={expiredIcon} alt="Expired" className="w-3.5 h-3.5" />
  ),
  [ReservationStatus.Canceled]: CrossCircledIcon,
  [ReservationStatus.Settled]: CheckCircledIcon,
} as const;

const POSITION_COLOR_MAP = {
  [PositionStatus.None]: 'text-gray-400',
  [PositionStatus.Active]: 'text-blue-500',
  [PositionStatus.Paused]: 'text-orange-500',
  [PositionStatus.Closed]: 'text-green-600',
} as const;

const RESERVATION_COLOR_MAP = {
  [ReservationStatus.None]: 'text-gray-400',
  [ReservationStatus.Pending]: 'text-blue-500',
  [ReservationStatus.Expired]: 'text-red-500',
  [ReservationStatus.Canceled]: 'text-orange-500',
  [ReservationStatus.Settled]: 'text-green-600',
} as const;

export function StatusIcon({ status, className = '' }: StatusIconProps) {
  const Icon = Object.values(PositionStatus).includes(status as PositionStatus)
    ? POSITION_ICON_MAP[status as PositionStatus]
    : RESERVATION_ICON_MAP[status as ReservationStatus];

  const colorClass = Object.values(PositionStatus).includes(status as PositionStatus)
    ? POSITION_COLOR_MAP[status as PositionStatus]
    : RESERVATION_COLOR_MAP[status as ReservationStatus];

  return (
    <div className={`bg-grey rounded-full p-[0.125rem] ${className}`}>
      {typeof Icon === 'function' && Icon !== SymbolIcon ? (
        <Icon className={colorClass} data-testid={`status-icon-${status.toLowerCase()}`} />
      ) : (
        <SymbolIcon className={colorClass} data-testid={`status-icon-${status.toLowerCase()}`} />
      )}
    </div>
  );
} 