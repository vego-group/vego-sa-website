import type { ReactNode } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "../globals.css";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  return <div className="min-h-svh">{children}</div>;
}

export default DashboardLayout;
