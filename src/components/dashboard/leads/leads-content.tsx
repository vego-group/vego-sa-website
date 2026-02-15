"use client";

import { useState } from "react";
import { LeadsHeader } from "./leads-header";
import { LeadsStats } from "./leads-stats";
import { DashboardSearch } from "../dashboard/dashboard-search";
import { LeadsTabs } from "./leads-tabs";
import { LeadsTable } from "./leads-table";

type TabType = "all" | "new" | "read" | "replied";

function LeadsContent() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const counts = {
    all: 3,
    new: 1,
    read: 1,
    replied: 1,
  };

  return (
    <div className="w-full space-y-8">
      <LeadsHeader />
      <LeadsStats />
      <DashboardSearch 
        placeholder="Search by name, email, or company..."
        onSearch={setSearchQuery}
      />
      <LeadsTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        counts={counts}
      />
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <LeadsTable activeTab={activeTab} searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export { LeadsContent };