import {
  CheckCircledIcon,
  SymbolIcon,
  CrossCircledIcon,
  ClockIcon,
} from '@radix-ui/react-icons';
import { PositionStatus, ReservationStatus } from '@/types';
import expiredIcon from '@/assets/expired.svg';
import React from 'react';

interface StatusIconProps {
  status: PositionStatus | ReservationStatus;
  className?: string;
}

export function StatusIcon({ status, className = '' }: StatusIconProps) {
  let Icon: React.ComponentType<{ className?: string }> = SymbolIcon;
  let colorClass = 'text-gray-400';

  // Handle position statuses
  if (Object.values(PositionStatus).includes(status as PositionStatus)) {
    switch (status) {
      case PositionStatus.None:
        Icon = SymbolIcon;
        colorClass = 'text-gray-400';
        break;
      case PositionStatus.Active:
        Icon = ClockIcon;
        colorClass = 'text-white';
        break;
      case PositionStatus.Paused:
        Icon = CrossCircledIcon;
        colorClass = 'text-orange-500';
        break;
      case PositionStatus.Closed:
        Icon = CheckCircledIcon;
        colorClass = 'text-green-600';
        break;
    }
  } 
  // Handle reservation statuses
  else if (Object.values(ReservationStatus).includes(status as ReservationStatus)) {
    switch (status) {
      case ReservationStatus.None:
        Icon = SymbolIcon;
        colorClass = 'text-gray-400';
        break;
      case ReservationStatus.Pending:
        Icon = SymbolIcon;
        colorClass = 'text-white';
        break;
      case ReservationStatus.Expired:
        return (
          <div className={`bg-[#FF5353] rounded-full p-[0.125rem] ${className}`}>
            <img src={expiredIcon} alt="Expired" className="w-3.5 h-3.5" />
          </div>
        );
      case ReservationStatus.Canceled:
        Icon = CrossCircledIcon;
        colorClass = 'text-orange-500';
        break;
      case ReservationStatus.Settled:
        Icon = CheckCircledIcon;
        colorClass = 'text-green-600';
        break;
    }
  }

  return (
    <div className={`bg-grey rounded-full p-[0.125rem] ${className}`}>
      <Icon className={colorClass} data-testid={`status-icon-${status.toLowerCase()}`} />
    </div>
  );
} 