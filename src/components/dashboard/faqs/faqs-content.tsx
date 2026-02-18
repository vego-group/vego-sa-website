"use client";

import { useState } from "react";
import { FaqsHeader } from "./faqs-header";
import { FaqsStats } from "./faqs-stats";
import { DashboardSearch } from "../dashboard/dashboard-search";
import { FaqsActions } from "./faqs-actions";
import { FaqsTable } from "./faqs-table";

function FaqsContent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full space-y-8">
      <FaqsHeader />
      <FaqsStats />
      <DashboardSearch 
        placeholder="Search FAQs by question or answer in English or Arabic..."
        onSearch={setSearchQuery}
      />
      <FaqsActions />
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <FaqsTable searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export { FaqsContent };