import type { ReactNode } from "react";

import CommitmentToExcellence from "@/components/CommitmentToExcellence";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar.tsx";

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <CommitmentToExcellence />
      <Footer />
    </>
  );
}

export default MainLayout;
