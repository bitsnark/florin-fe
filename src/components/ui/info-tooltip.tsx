import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Tooltip } from './tooltip';

interface InfoTooltipProps {
  message: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  align?: 'start' | 'center' | 'end';
}

export function InfoTooltip({
  message,
  position = 'top',
  className,
  align = 'center',
}: InfoTooltipProps) {
  return (
    <Tooltip
      content={<div className="text-sm text-white font-medium">{message}</div>}
      position={position}
      className={className}
      align={align}
    >
      <InfoCircledIcon className="h-4 w-4 text-text-secondary cursor-pointer" />
    </Tooltip>
  );
}
