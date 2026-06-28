"use client";

import { useState } from "react";

import { DashboardSearch } from "../dashboard/dashboard-search";
import { InvestmentInterestsHeader } from "./investment-interests-header";
import { InvestmentInterestsStats } from "./investment-interests-stats";
import { InvestmentInterestsTable } from "./investment-interests-table";

function InvestmentInterestsContent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full space-y-4 px-4 sm:space-y-6 sm:px-6 lg:space-y-8 lg:px-8">
      <InvestmentInterestsHeader />
      <InvestmentInterestsStats />
      <DashboardSearch
        placeholder="Search by name, email, phone, or ticket type..."
        onSearch={setSearchQuery}
      />
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm sm:rounded-2xl">
        <InvestmentInterestsTable searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export { InvestmentInterestsContent };
