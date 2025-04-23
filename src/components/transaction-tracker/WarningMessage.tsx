import { WarningIcon } from './WarningIcon';
import { InfoIcon } from './InfoIcon';

interface WarningMessageProps {
  message: string;
  iconToShow: 'warning' | 'info';
}

export function WarningMessage({ message, iconToShow }: WarningMessageProps) {
  return (
    <div className="flex mb-3 md:mb-4">
      <div className="text-orange w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-0.5 mr-2 md:mr-3">
        {iconToShow === 'warning' ? <WarningIcon /> : <InfoIcon />}
      </div>
      <p className="text-white font-medium pt-1 text-[11px] md:text-[13px] leading-[115%] align-middle">
        {message}
      </p>
    </div>
  );
}
