import type { ReactNode } from "react";

type DashboardShellProps = {
  children: ReactNode;
};

function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8">
      {children}
    </div>
  );
}

export { DashboardShell };