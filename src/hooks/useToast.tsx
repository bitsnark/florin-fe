import { toast } from 'sonner';
import { CrossCircledIcon } from '@radix-ui/react-icons';

const MAX_ERROR_LENGTH = 100;

const truncateError = (error: string): string => {
  if (error.length <= MAX_ERROR_LENGTH) return error;
  return `${error.slice(0, MAX_ERROR_LENGTH)}...`;
};

export const useToast = () => {
  const showError = (message: string) => {
    const truncatedMessage = truncateError(message);
    toast.error(truncatedMessage, {
      icon: <CrossCircledIcon className="h-4 w-4" />,
      description: message.length > MAX_ERROR_LENGTH ? message : undefined,
    });
  };

  return { showError };
}; 