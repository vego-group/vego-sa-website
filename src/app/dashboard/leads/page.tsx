// src/app/dashboard/leads/page.tsx
"use client";

import { DashboardShell } from "@/components/dashboard/dashboard/dashboard-shell";
import { LeadsContent } from "@/components/dashboard/leads/leads-content";

function LeadsPage() {
  return (
    <DashboardShell>
      <LeadsContent />
    </DashboardShell>
  );
}

export default LeadsPage;