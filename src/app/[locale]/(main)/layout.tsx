import type { ReactNode } from "react";

import CommitmentToExcellence from "@/components/site/CommitmentToExcellence";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/navbar.tsx";

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
