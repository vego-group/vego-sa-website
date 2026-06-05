"use client";

import { DashboardShell } from "@/components/dashboard/dashboard/dashboard-shell";
import { PreOrdersContent } from "@/components/dashboard/pre-orders";

function PreOrdersPage() {
  return (
    <DashboardShell>
      <PreOrdersContent />
    </DashboardShell>
  );
}

export default PreOrdersPage;
