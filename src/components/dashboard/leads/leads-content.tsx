"use client";

import { useState } from "react";
import { LeadsHeader } from "./leads-header";
import { LeadsStats } from "./leads-stats";
import { DashboardSearch } from "../dashboard/dashboard-search";
import { LeadsTable } from "./leads-table";

function LeadsContent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8">
      <LeadsHeader />
      <LeadsStats />
      <DashboardSearch 
        placeholder="Search by name, email, or company..."
        onSearch={setSearchQuery}
      />
      <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden">
        <LeadsTable searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export { LeadsContent };