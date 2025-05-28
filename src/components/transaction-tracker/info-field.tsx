import { ReactNode } from 'react';

interface InfoFieldProps {
  label: string;
  value: ReactNode;
}

export function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <span className="text-[#888888] text-[13px]">{label}</span>
      {value}
    </div>
  );
}
