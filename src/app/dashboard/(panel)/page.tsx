"use client";

import { DashboardShell } from "../../../components/dashboard/dashboard/dashboard-shell";
import { DashboardContent } from "../../../components/dashboard/dashboard/dashboard-content";

function DashboardPage() {
  return (
    <DashboardShell>
      <div className="w-full space-y-6">
        <DashboardContent />
      </div>
    </DashboardShell>
  );
}

export default DashboardPage;
