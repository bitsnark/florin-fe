import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  align?: 'start' | 'center' | 'end';
}

export function Tooltip({
  children,
  content,
  position = 'top',
  className,
  align = 'center',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const positionClasses = {
    top: 'bottom-full mb-3',
    bottom: 'top-full mt-3',
    left: 'right-full mr-3',
    right: 'left-full ml-3',
  };

  const alignmentClasses = {
    start: 'origin-bottom-left left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'origin-bottom-right right-0',
  };

  const arrowAlignmentClasses = {
    start: 'left-4',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-4',
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex cursor-pointer"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            'absolute z-50 w-[216px] px-[12px] py-[8px] rounded-lg bg-[#393945]',
            positionClasses[position],
            position === 'left' || position === 'right'
              ? 'top-0'
              : alignmentClasses[align],
            className
          )}
        >
          {content}
          <div
            className={cn(
              'absolute w-4 h-4 bg-[#393945] rotate-45',
              position === 'top' &&
                `bottom-[-8px] ${arrowAlignmentClasses[align]}`,
              position === 'bottom' &&
                `top-[-8px] ${arrowAlignmentClasses[align]}`,
              position === 'left' && 'right-[-8px] top-4',
              position === 'right' && 'left-[-8px] top-4'
            )}
          />
        </div>
      )}
    </div>
  );
}
