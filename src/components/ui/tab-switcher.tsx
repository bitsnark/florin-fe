import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tabSwitcherVariants = cva(
  'flex items-center justify-center w-full p-2 rounded-lg transition-all duration-300 ease-florin',
  {
    variants: {
      variant: {
        default:
          'bg-input-bg border border-input-border w-full sm:w-[90%] md:w-[440px] h-[50px] md:h-[62px]',
        pill: 'bg-grey w-full sm:w-[90%] md:w-[440px] h-[50px] md:h-[62px]',
      },
      size: {
        default: '',
        sm: 'h-8 md:h-10',
        lg: 'h-12 md:h-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const tabItemVariants = cva(
  'flex items-center justify-center rounded-md text-xs sm:text-sm font-medium transition-all duration-300 ease-florin cursor-pointer select-none flex-1 h-full',
  {
    variants: {
      variant: {
        default:
          'data-[state=active]:border-none data-[state=active]:bg-grey data-[state=active]:text-orange-light data-[state=inactive]:text-text-secondary data-[state=inactive]:bg-background data-[state=inactive]:hover:text-text-primary',
        pill: 'data-[state=active]:bg-white data-[state=active]:text-white data-[state=inactive]:text-text-secondary data-[state=inactive]:hover:text-text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

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

export { tabSwitcherVariants, tabItemVariants };
