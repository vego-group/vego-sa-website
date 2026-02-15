import type { ReactNode } from "react";

type DashboardShellProps = {
  children: ReactNode;
};

function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen py-8 px-8">
      {children}
    </div>
  );
}

export { DashboardShell };