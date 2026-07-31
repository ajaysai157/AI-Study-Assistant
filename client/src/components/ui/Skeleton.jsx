function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800 ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
      <Skeleton className="h-12 w-12 rounded-2xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="pt-3">
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export default Skeleton;
export const CardSkeleton = SkeletonCard;
