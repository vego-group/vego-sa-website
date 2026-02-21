import { Sidebar } from "@/components/dashboard/dashboard/sidebar";
import type { ReactNode } from "react";

type PanelLayoutProps = {
  children: ReactNode;
};

function PanelLayout({ children }: PanelLayoutProps) {
  return (
    <div className="relative flex min-h-svh">
      <Sidebar />
      <div className="flex-1 ml-64">{children}</div>
    </div>
  );
}

export default PanelLayout;
