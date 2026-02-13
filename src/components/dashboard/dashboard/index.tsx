"use client";

import { DashboardShell } from "./dashboard-shell";
import { DashboardHeader } from "./dashboard-header";
import { DashboardContent } from "./dashboard-content";

function Dashboard() {
  return (
    <DashboardShell>
      <div className="w-full space-y-6">
        <DashboardHeader />
        <DashboardContent />
      </div>
    </DashboardShell>
  );
}

export default Dashboard;