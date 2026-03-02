import { cn } from "@/lib";

interface ISkeletonCardProps {
  className?: string;
}
export function SkeletonCard({ className }: ISkeletonCardProps) {
  return (
    <div
      className={cn(
        "relative h-50 w-full overflow-hidden rounded-md bg-slate-200/80",
        "before:absolute before:inset-0 before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.7),transparent)] before:animate-pulse",
        className,
      )}
      aria-hidden="true"
    />
  );
}
