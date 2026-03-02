import { SkeletonCard } from "@/components/skeleton/card";

type BlogsLoadingGridProps = {
  count?: number;
};

function BlogsLoadingGrid({ count = 6 }: BlogsLoadingGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} className="h-[420px] rounded-2xl" />
      ))}
    </div>
  );
}

export { BlogsLoadingGrid };

