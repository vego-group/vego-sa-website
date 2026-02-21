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
        {/* Main content - responsive margins */}
        <main className="flex-1 w-full min-w-0 pt-14.25 md:pt-0 md:ml-16 lg:ml-64">
          <div className="max-w-full overflow-x-hidden">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default PanelLayout;
