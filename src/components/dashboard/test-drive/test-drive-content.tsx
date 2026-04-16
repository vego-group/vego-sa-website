"use client";

import { useState } from "react";

import { DashboardSearch } from "../dashboard/dashboard-search";
import { TestDriveHeader } from "./test-drive-header";
import { TestDriveStats } from "./test-drive-stats";
import { TestDriveTable } from "./test-drive-table";

function TestDriveContent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full space-y-4 px-4 sm:space-y-6 sm:px-6 lg:space-y-8 lg:px-8">
      <TestDriveHeader />
      <TestDriveStats />
      <DashboardSearch
        placeholder="Search by name, email, phone, or product..."
        onSearch={setSearchQuery}
      />
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm sm:rounded-2xl">
        <TestDriveTable searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export { TestDriveContent };
