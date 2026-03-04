import { ComponentProps } from "react";
import { StatsCard } from "../dashboard/stats-card";
import { useContacts } from "@/hooks/api/contact";
import { SkeletonCard } from "@/components/skeleton/card";

function LeadsStats() {
  type StatsCardVariant = ComponentProps<typeof StatsCard>["variant"];
  const { data, isLoading, isFetching } = useContacts(1);
  const statistics = data?.statistics;
  const stats: Array<{
    label: string;
    value: string;
    variant?: StatsCardVariant;
  }> = [
    { label: "Total Leads", value: String(statistics?.total ?? 0) },
    { label: "New", value: String(statistics?.new ?? 0), variant: "accent" },
    { label: "Read", value: String(statistics?.read ?? 0) },
    { label: "Replied", value: String(statistics?.replied ?? 0) },
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

export { LeadsStats };
