import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MobileTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export function MobileTooltip({
  children,
  content,
  className,
}: MobileTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible((v) => !v);
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={handleClick}
        className="inline-flex cursor-pointer"
      >
        
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            'text-left absolute z-[9999] max-w-[calc(100vw-100px)] w-[calc(100vw-100px)] px-3 py-2 rounded-lg bg-[#484D59] top-full mt-2 left-0 transform -translate-x-2/3',
            className
          )}
        >
          <div className="absolute w-4 h-4 bg-[#484D59] rotate-45 left-3/4 transform -translate-x-1/2 top-[-8px]" />
          <div className="break-all overflow-x-auto">{content}</div>
        </div>
      )}
    </div>
  );
}
