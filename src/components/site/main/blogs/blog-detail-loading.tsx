import { SkeletonCard } from "@/components/skeleton/card";

function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      <SkeletonCard className="h-[65vh] w-full rounded-none bg-slate-200" />

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <SkeletonCard className="mb-8 h-6 w-44 bg-slate-200" />
        <SkeletonCard className="mb-6 h-5 w-56 bg-slate-200" />
        <SkeletonCard className="mb-4 h-6 w-full bg-slate-200" />
        <SkeletonCard className="mb-4 h-6 w-full bg-slate-200" />
        <SkeletonCard className="mb-4 h-6 w-10/12 bg-slate-200" />
        <SkeletonCard className="h-60 w-full bg-slate-200" />
      </div>
    </div>
  );
}

export { BlogDetailLoading };
