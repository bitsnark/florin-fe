import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button-variants';
import { RefreshCw } from 'lucide-react';

function Button({
  className,
  variant,
  size,
  asChild = false,
  isAnimating = false,
  loading = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isAnimating?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      disabled={loading}
      className={cn(
        buttonVariants({ variant, size, className }),
        isAnimating ? 'opacity-0' : 'opacity-100',
        loading ? 'cursor-wait' : 'cursor-pointer',
        'inline-flex items-center justify-center'
      )}
      {...props}
    >
      {loading ? (
        <RefreshCw className="text-[#F5F5F5] w-[22px] h-[22px] animate-[spin_2s_linear_infinite]" />
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button };
