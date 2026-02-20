"use client";

import { useState } from "react";
import { BlogsHeader } from "./blogs-header";
import { BlogsStats } from "./blogs-stats";
import { DashboardSearch } from "../dashboard/dashboard-search";
import { BlogsTabs } from "./blogs-tabs";
import { BlogsActions } from "./blogs-actions";
import { BlogsTable } from "./blogs-table";

type TabType = "all" | "published" | "drafts";

function BlogsContent() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const counts = {
    all: 3,
    published: 2,
    drafts: 1,
  };

  return (
    <div className="w-full space-y-4 sm:space-y-5 lg:space-y-6 px-3 sm:px-4 lg:px-0 pb-6 sm:pb-8">
      <BlogsHeader />
      <BlogsStats />
      
      {/* Search Section */}
      <div className="px-3 sm:px-0">
        <DashboardSearch 
          placeholder={
            activeTab === "all" ? "Search all blogs by title or content..." : 
            activeTab === "published" ? "Search published blogs..." : 
            "Search drafts..."
          }
          onSearch={setSearchQuery}
          value={searchQuery}
        />
      </div>
      
      {/* Tabs and Actions - Reordered for mobile */}
      <div className="space-y-3 sm:space-y-4">
        <BlogsTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          counts={counts}
        />
        <BlogsActions />
      </div>
      
      {/* Table Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden">
        <BlogsTable activeTab={activeTab} searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export { BlogsContent };