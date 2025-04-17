import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm md:text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-white hover:text-black transition-all duration-500 ease-florin rounded-lg',
        orange:
          'bg-gradient-to-br from-orange-light to-orange text-white rounded-lg transition-all duration-500 ease-florin hover:bg-white hover:text-black hover:border-transparent hover:from-white hover:to-white',
        grey: 'bg-grey border border-grey text-white rounded-lg hover:bg-grey-hover hover:border-grey-border transition-all duration-500 ease-florin',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3 md:h-10 md:px-5 md:py-2.5',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4 md:h-11 md:px-7',
        icon: 'size-9 md:size-10',
        box: 'w-[75px] h-[75px]',
        custom:
          'w-[180px] h-[60px] md:w-[228px] md:h-[72px] rounded-lg gap-[10px] pt-[20px] pr-[24px] pb-[20px] pl-[24px] md:pt-[27px] md:pr-[32px] md:pb-[26px] md:pl-[32px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  isAnimating = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isAnimating?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        isAnimating ? 'opacity-0' : 'opacity-100'
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
