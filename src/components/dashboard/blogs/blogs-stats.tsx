import { StatsCard } from "../dashboard/stats-card";

function BlogsStats() {
  const stats = [
    { label: "Total Blogs", value: "3" },
    { label: "Published", value: "2", variant: "accent" },
    { label: "Drafts", value: "1", variant: "default" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          label={stat.label}
          value={stat.value}
          variant={stat.variant as any}
        />
      ))}
    </div>
  );
}

export { BlogsStats };