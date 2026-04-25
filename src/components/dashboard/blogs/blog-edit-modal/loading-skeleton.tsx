import { SkeletonCard } from "@/components/skeleton/card";

function BlogEditLoadingSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <SkeletonCard className="h-4 w-36" />
        <SkeletonCard className="h-11 w-full" />
      </div>
      <div className="space-y-2">
        <SkeletonCard className="h-4 w-24" />
        <SkeletonCard className="h-24 w-full" />
      </div>
      <div className="space-y-2">
        <SkeletonCard className="h-4 w-24" />
        <SkeletonCard className="h-36 w-full" />
      </div>
      <div className="space-y-2">
        <SkeletonCard className="h-4 w-28" />
        <SkeletonCard className="h-32 w-full" />
      </div>
    </div>
  );
}

export { BlogEditLoadingSkeleton };
