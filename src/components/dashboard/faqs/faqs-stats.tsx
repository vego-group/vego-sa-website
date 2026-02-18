import { StatsCard } from "../dashboard/stats-card";

function FaqsStats() {
  const stats = [
    { label: "Total FAQs", value: "3" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          label={stat.label}
          value={stat.value}
          variant="accent"
        />
      ))}
    </div>
  );
}

export { FaqsStats };