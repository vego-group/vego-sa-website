function DashboardContent() {
  const stats = [
    { label: "Total Blogs", value: 3, change: "+12%", icon: "📄" },
    { label: "Total FAQs", value: 3, change: "+8%", icon: "❓" },
    { label: "Contact Leads", value: 3, change: "+23%", icon: "✉️" },
    { label: "Total Views", value: "12.5K", change: "+18%", icon: "👁️" }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "Published new blog",
      title: "Digital Transformation in 2025",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "New contact lead",
      title: "John Smith from ABC Corp",
      time: "5 hours ago"
    },
    {
      id: 3,
      type: "Updated FAQ",
      title: "What is ERP?",
      time: "1 day ago"
    },
    {
      id: 4,
      type: "Draft created",
      title: "Cloud Migration Best Practices",
      time: "2 days ago"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-secondary to-secondary/80 px-8 py-6 text-white">
        <h2 className="text-2xl font-semibold">Welcome back, Admin!</h2>
        <p className="text-white/90 mt-1">
          Here's what's happening with your content today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-secondary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl text-white/90">{stat.icon}</span>
              <span className="text-sm text-emerald-400 font-medium">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-white">
              {stat.value}
            </h3>
            <p className="text-white/70 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            Recent Activity
          </h3>
        </div>

        <div className="divide-y divide-white/10">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="px-6 py-4 flex justify-between items-start hover:bg-white/5 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-white">
                  {activity.type}
                </p>
                <p className="text-sm text-white/70">{activity.title}</p>
              </div>
              <span className="text-xs text-white/50">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-secondary/30 transition-colors">
          <h3 className="font-semibold text-white mb-1">
            Create New Blog
          </h3>
          <p className="text-sm text-white/70">
            Start writing a new blog post
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-secondary/30 transition-colors">
          <h3 className="font-semibold text-white mb-1">
            Add New FAQ
          </h3>
          <p className="text-sm text-white/70">
            Help your customers with new answers
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-secondary/30 transition-colors">
          <h3 className="font-semibold text-white mb-1">
            View Contact Leads
          </h3>
          <p className="text-sm text-white/70">
            Check new inquiries from customers
          </p>
        </div>
      </div>
    </div>
  );
}

export { DashboardContent };