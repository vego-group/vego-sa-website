import { cn } from "@/lib";

interface ISkeletonCardProps {
  className?: string;
}
export function SkeletonCard({ className }: ISkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-stone-200 animate-pulse h-50 w-full",
        className,
      )}
    />
  );
}
