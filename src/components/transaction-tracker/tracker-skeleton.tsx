import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted/10', className)}
      {...props}
    />
  );
}

export function TrackerSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      {/* Step 1 */}
      <div className="flex">
        <div className="flex items-center mr-4">
          <Skeleton className="h-6 w-6 rounded-full bg-orange-400/20" />
          <Skeleton className="h-16 w-0.5 bg-orange-400/20 ml-3 mt-1" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-5 w-36 mb-2" />
          <Skeleton className="h-3 w-48 mb-4" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex">
        <div className="flex items-center mr-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-16 w-0.5 ml-3 mt-1" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-5 w-36 mb-2" />
          <Skeleton className="h-3 w-48 mb-4" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex">
        <div className="flex items-center mr-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-16 w-0.5 ml-3 mt-1" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-5 w-36 mb-2" />
          <Skeleton className="h-3 w-48 mb-4" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>

      {/* Step 4 */}
      <div className="flex">
        <div className="flex items-center mr-4">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-5 w-36 mb-2" />
          <Skeleton className="h-3 w-48 mb-4" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
