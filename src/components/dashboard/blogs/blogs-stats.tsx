import type { ComponentProps } from "react";
import { useDashboardBlogs } from "@/hooks/api";
import { SkeletonCard } from "@/components/skeleton/card";
import { StatsCard } from "../dashboard/stats-card";

function BlogsStats() {
  const { data, isLoading, isFetching } = useDashboardBlogs(1);
  const statistics = data?.statistics;
  type StatsCardVariant = ComponentProps<typeof StatsCard>["variant"];

  const stats: Array<{
    label: string;
    value: string;
    variant?: StatsCardVariant;
  }> = [
    { label: "Total Blogs", value: String(statistics?.total ?? 0) },
    {
      label: "Published",
      value: String(statistics?.published ?? 0),
      variant: "accent",
    },
    {
      label: "Drafts",
      value: String(statistics?.draft ?? 0),
      variant: "default",
    },
  ];

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} className="h-29.5 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          label={stat.label}
          value={stat.value}
          variant={stat.variant}
        />
      ))}
    </div>
  );
}

export { BlogsStats };
