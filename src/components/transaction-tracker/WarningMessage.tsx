import { WarningIcon } from './WarningIcon';

interface WarningMessageProps {
  message: string;
}

export function WarningMessage({ message }: WarningMessageProps) {
  return (
    <div className="flex mb-3 md:mb-4">
      <div className="text-orange w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-0.5 mr-2 md:mr-3">
        <WarningIcon />
      </div>
      <p className="text-white font-medium text-[11px] md:text-[13px] leading-[115%] align-middle">
        {message}
      </p>
    </div>
  );
}
