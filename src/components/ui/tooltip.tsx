import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

export function Tooltip({
  children,
  content,
  className,
  position = 'top',
  align = 'center',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex cursor-pointer"
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'absolute z-50 min-w-[216px] px-[12px] py-[8px] rounded-lg bg-[#484D59]',
            position === 'top' && 'bottom-full mb-3 left-1/2 transform -translate-x-1/2',
            position === 'bottom' && 'top-full mt-3 left-1/2 transform -translate-x-1/2',
            position === 'left' && 'right-full mr-3 top-1/2 transform -translate-y-1/2',
            position === 'right' && 'left-full ml-3 top-1/2 transform -translate-y-1/2',
            align === 'start' && 'origin-bottom-left left-0',
            align === 'center' && 'left-1/2 transform -translate-x-1/2',
            align === 'end' && 'origin-bottom-right right-0',
            className
          )}
        >
          {content}
          <div
            className="absolute w-4 h-4 bg-[#484D59] rotate-45 left-1/2 transform -translate-x-1/2 bottom-[-8px]"
          />
        </div>
      )}
    </div>
  );
}
