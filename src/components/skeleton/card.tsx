import { cn } from "@/lib";

interface ISingleSkeletonCardProps {
  className?: string;
}
export function SingleSkeletonCard({ className }: ISingleSkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-stone-200 animate-pulse h-50 sm:h-100 w-full",
        className,
      )}
    />
  );
}
