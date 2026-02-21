import { Sidebar } from "@/components/dashboard/dashboard/sidebar";
import type { ReactNode } from "react";

type PanelLayoutProps = {
  children: ReactNode;
};

function PanelLayout({ children }: PanelLayoutProps) {
  return (
    <div className="relative min-h-svh bg-primary">
      {/* Background Gradient */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-950 via-primary to-emerald-950" />
      </div>

      <div className="relative flex min-h-svh">
        <Sidebar />
        <div className="flex-1 ml-64">{children}</div>
      </div>
    </div>
  );
}

export default PanelLayout;
