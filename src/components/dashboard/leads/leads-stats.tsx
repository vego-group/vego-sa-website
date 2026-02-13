import { StatsCard } from "../dashboard/stats-card";

function LeadsStats() {
  const stats = [
    { label: "Total Leads", value: "3" },
    { label: "New", value: "1", variant: "accent" },
    { label: "Read", value: "1", variant: "default" },
    { label: "Replied", value: "1", variant: "default" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

export { LeadsStats };