import { StatsCard } from "../dashboard/stats-card";

function LeadsStats() {
  const stats = [
    { label: "Total Leads", value: "3" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          label={stat.label}
          value={stat.value}
          variant="default"
        />
      ))}
    </div>
  );
}

export { LeadsStats };