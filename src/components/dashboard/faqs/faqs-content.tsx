"use client";

import { useState } from "react";
import { FaqsHeader } from "./faqs-header";
import { FaqsStats } from "./faqs-stats";
import { DashboardSearch } from "../dashboard/dashboard-search";
import { FaqsTabs } from "./faqs-tabs";
import { FaqsActions } from "./faqs-actions";
import { FaqsTable } from "./faqs-table";

type TabType = "all" | "general" | "implementation" | "security";

function FaqsContent() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const counts = {
    all: 3,
    general: 1,
    implementation: 1,
    security: 1,
  };

  return (
    <div className="w-full space-y-8">
      <FaqsHeader />
      <FaqsStats />
      <DashboardSearch />
      <FaqsTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        counts={counts}
      />
      <FaqsActions />
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <FaqsTable activeTab={activeTab} />
      </div>
    </div>
  );
}

export { FaqsContent };