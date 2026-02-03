import type { ReactNode } from "react";

type DashboardCardProps = {
  children: ReactNode;
};

function DashboardCard({ children }: DashboardCardProps) {
  return (
    <div className="w-full rounded-[32px] border border-white/10 bg-white/10 px-8 py-8 shadow-[0_35px_80px_-45px_rgba(5,15,30,0.85)] backdrop-blur-2xl">
      {children}
    </div>
  );
}

export { DashboardCard };
