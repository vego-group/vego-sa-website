import { SkeletonCard } from "@/components/skeleton/card";

function NewsLoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <SkeletonCard
          key={index}
          className="h-105 rounded-2xl shadow-lg shadow-slate-200/50"
        />
      ))}
    </div>
  );
}

export default NewsLoadingGrid;
