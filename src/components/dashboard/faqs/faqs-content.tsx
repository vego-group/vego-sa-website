"use client";

import { useState } from "react";
import { FaqsHeader } from "./faqs-header";
import { FaqsStats } from "./faqs-stats";
import { DashboardSearch } from "../dashboard/dashboard-search";
import { FaqsActions } from "./faqs-actions";
import { FaqsTabs } from "./faqs-tabs";
import { FaqsTable } from "./faqs-table";

type TabType = "all" | "published" | "drafts";

function FaqsContent() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const counts = {
    all: 3,
    published: 2,
    drafts: 1,
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8 pb-8">
      <FaqsHeader />
      <FaqsStats />
      
      {/* Search Section - Responsive padding */}
      <div className="px-4 sm:px-0 w-full">
        <DashboardSearch 
          placeholder="Search FAQs by question or answer in English or Arabic..."
          onSearch={setSearchQuery}
          value={searchQuery}
        />
      </div>
      
      <FaqsActions />
      
      {/* Table Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden">
        <FaqsTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          counts={counts}
        />
        <FaqsTable 
          activeTab={activeTab} 
          searchQuery={searchQuery} 
        />
      </div>
    </div>
  );
}

export { FaqsContent };