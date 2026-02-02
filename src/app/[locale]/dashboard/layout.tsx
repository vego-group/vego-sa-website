import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  return <main>{children}</main>;
}

export default DashboardLayout;
