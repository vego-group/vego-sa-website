import type { ReactNode } from "react";

import Navbar from "@/components/landing/navbar";

type SuccessLayoutProps = {
  children: ReactNode;
};

function SuccessLayout({ children }: SuccessLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default SuccessLayout;
