// src/app/dashboard/faqs/page.tsx
"use client";

import { DashboardShell } from "@/components/dashboard/dashboard/dashboard-shell";
import { FaqsContent } from "@/components/dashboard/faqs/faqs-content";

function FaqsPage() {
  return (
    <DashboardShell>
      <FaqsContent />
    </DashboardShell>
  );
}

export default FaqsPage;