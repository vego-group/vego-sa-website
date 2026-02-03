import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";

type DashboardShellProps = {
  children: ReactNode;
};

function DashboardShell({ children }: DashboardShellProps) {
  return (
    <section className="relative min-h-svh bg-primary text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-950 via-primary to-emerald-950" />
      </div>

      <div className="relative flex min-h-svh">
        <Sidebar />
        <div className="flex-1 ml-56 px-10 py-10">
          {children}
        </div>
      </div>
    </section>
  );
}

export { DashboardShell };
