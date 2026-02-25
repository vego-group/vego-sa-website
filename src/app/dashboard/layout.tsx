import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  return <div className="min-h-svh">{children}</div>;
}

export default DashboardLayout;
