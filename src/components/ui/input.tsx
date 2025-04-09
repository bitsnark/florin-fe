import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

function Input({ className, type, icon, ...props }: InputProps) {
  return (
    <div className="relative w-full max-w-[408px]">
      <input
        type={type}
        data-slot="input"
        className={cn(
          'w-full h-[48px] rounded-[10px] border border-input-border bg-input-bg px-4 py-[10px] gap-[10px]',
          'font-inter font-normal text-[14px] leading-[100%]',
          'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
          'transition-[color,box-shadow] outline-none file:border-0 file:bg-transparent',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          icon && 'pr-10',
          className
        )}
        {...props}
      />
      {icon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}
    </div>
  );
}

export { Input };
