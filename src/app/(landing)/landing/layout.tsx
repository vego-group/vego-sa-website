import type { ReactNode } from "react";

import Navbar from "@/components/landing/home/navbar";

type LandingHomeLayoutProps = {
  children: ReactNode;
};

function LandingHomeLayout({ children }: LandingHomeLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default LandingHomeLayout;
