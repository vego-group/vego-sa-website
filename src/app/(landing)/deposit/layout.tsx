import type { ReactNode } from "react";

import Navbar from "@/components/landing/navbar";

type DepositLayoutProps = {
  children: ReactNode;
};

function DepositLayout({ children }: DepositLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default DepositLayout;
