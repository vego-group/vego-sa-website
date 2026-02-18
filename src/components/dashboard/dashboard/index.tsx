"use client";

import { DashboardShell } from "./dashboard-shell";
import { DashboardHeader } from "./dashboard-header";
import { DashboardContent } from "./dashboard-content";
import { Sidebar } from "./sidebar";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-primary">
      <Sidebar />
      {/*
        Offset للـ main content:
        - mobile (md-):   pt-[57px]  → علشان الـ top bar
        - tablet (md):    ml-16      → علشان الـ icon sidebar
        - desktop (lg+):  ml-64      → علشان الـ full sidebar
      */}
      <main className="flex-1 min-w-0 pt-[57px] md:pt-0 md:ml-16 lg:ml-64">
        <DashboardShell>
          <div className="w-full space-y-4 sm:space-y-6">
            <DashboardHeader />
            <DashboardContent />
          </div>
        </DashboardShell>
      </main>
    </div>
  );
}

export default Dashboard;