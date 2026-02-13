"use client";

import { useState } from "react";
import { BlogsHeader } from "./blogs-header";
import { BlogsStats } from "./blogs-stats";
import { DashboardSearch } from "../dashboard/dashboard-search";
import { BlogsTabs } from "./blogs-tabs";
import { BlogsActions } from "./blogs-actions";
import { DashboardTable } from "../dashboard/dashboard-table";

type TabType = "all" | "published" | "drafts";

function BlogsContent() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const counts = {
    all: 3,
    published: 2,
    drafts: 1,
  };

  return (
    <div className="w-full space-y-8">
      <BlogsHeader />
      <BlogsStats />
      <DashboardSearch />
      <BlogsTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        counts={counts}
      />
      <BlogsActions />
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <DashboardTable activeTab={activeTab} />
      </div>
    </div>
  );
}

export { BlogsContent };