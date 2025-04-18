import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

interface InputWithButtonProps {
  placeholder: string;
  buttonText: string;
  onButtonClick: (value?: string) => void;
}

export function InputWithButton({
  placeholder,
  buttonText,
  onButtonClick,
}: InputWithButtonProps) {
  const [value, setValue] = useState('');

  const handleButtonClick = () => {
    onButtonClick(value);
  };

  return (
    <div className="relative w-full max-w-[408px]">
      <Input
        type="email"
        placeholder={placeholder}
        className="h-[70px] rounded-lg bg-[#1A1A1F] border-none focus-visible:ring-0 pr-[150px] text-white"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="absolute right-[6px] top-1/2 -translate-y-1/2">
        <Button
          variant="orange"
          onClick={handleButtonClick}
          className="rounded-lg px-6 py-3 h-[58px]"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
