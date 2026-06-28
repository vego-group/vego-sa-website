"use client";

import { DashboardShell } from "@/components/dashboard/dashboard/dashboard-shell";
import { InvestmentInterestsContent } from "@/components/dashboard/investment-interests";

function InvestmentInterestsPage() {
  return (
    <DashboardShell>
      <InvestmentInterestsContent />
    </DashboardShell>
  );
}

export default InvestmentInterestsPage;
