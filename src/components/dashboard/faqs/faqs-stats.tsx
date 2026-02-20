import { StatsCard } from "../dashboard/stats-card";

function FaqsStats() {
  const stats = [
    { label: "Total FAQs", value: "3" },
    { label: "Published", value: "2" },
    { label: "Drafts", value: "1" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-4 sm:px-0">
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