"use client";

import { useRouter } from "next/navigation";

function DashboardContent() {
  const router = useRouter();
  
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

  const handleCreateNewBlog = () => {
    router.push('/dashboard/blogs');
    setTimeout(() => {
      const event = new CustomEvent('openNewArticle');
      window.dispatchEvent(event);
    }, 100);
  };

  const handleAddNewFaq = () => {
    router.push('/dashboard/faqs');
    setTimeout(() => {
      const event = new CustomEvent('openNewFaq');
      window.dispatchEvent(event);
    }, 100);
  };

  const handleViewLeads = () => {
    router.push('/dashboard/leads');
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-secondary to-secondary/80 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-white">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">Welcome back, Admin!</h2>
        <p className="text-white/90 text-xs sm:text-sm mt-1">
          Here's what's happening with your content today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 p-3 sm:p-4 lg:p-6 hover:border-secondary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <span className="text-lg sm:text-xl lg:text-2xl text-white/90">{stat.icon}</span>
              <span className="text-xs sm:text-sm text-emerald-400 font-medium">
                {stat.change}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
              {stat.value}
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mt-0.5 sm:mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Recent Activity
          </h3>
        </div>

        <div className="divide-y divide-white/10">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 hover:bg-white/5 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  {activity.type}
                </p>
                <p className="text-xs sm:text-sm text-white/70 truncate">
                  {activity.title}
                </p>
              </div>
              <span className="text-xs text-white/50 sm:ml-4">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <button
          onClick={handleCreateNewBlog}
          className="text-left bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-5 lg:p-6 hover:border-secondary/30 transition-colors hover:bg-white/20 cursor-pointer w-full"
        >
          <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">
            Create New Blog
          </h3>
          <p className="text-xs sm:text-sm text-white/70">
            Start writing a new blog post
          </p>
        </button>

        <button
          onClick={handleAddNewFaq}
          className="text-left bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-5 lg:p-6 hover:border-secondary/30 transition-colors hover:bg-white/20 cursor-pointer w-full"
        >
          <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">
            Add New FAQ
          </h3>
          <p className="text-xs sm:text-sm text-white/70">
            Help your customers with new answers
          </p>
        </button>

        <button
          onClick={handleViewLeads}
          className="text-left bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-5 lg:p-6 hover:border-secondary/30 transition-colors hover:bg-white/20 cursor-pointer w-full sm:col-span-2 lg:col-span-1"
        >
          <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">
            View Contact Leads
          </h3>
          <p className="text-xs sm:text-sm text-white/70">
            Check new inquiries from customers
          </p>
        </button>
      </div>
    </div>
  );
}

export { DashboardContent };