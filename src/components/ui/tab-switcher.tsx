import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { tabSwitcherVariants, tabItemVariants } from './tab-switcher-variants';

interface TabSwitcherProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabSwitcherVariants> {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export function TabSwitcher({
  className,
  variant,
  size,
  tabs,
  activeTab,
  onTabChange,
  ...props
}: TabSwitcherProps) {
  return (
    <div
      className={cn(tabSwitcherVariants({ variant, size, className }))}
      {...props}
    >
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(index)}
          className={cn(
            tabItemVariants({ variant }),
            'outline-none focus:none focus:none h-full px-1 md:px-3'
          )}
          data-state={index === activeTab ? 'active' : 'inactive'}
          type="button"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
