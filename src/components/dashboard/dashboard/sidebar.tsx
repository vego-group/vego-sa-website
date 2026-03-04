"use client";
import { useState } from "react";
import { SidebarContent } from "./sidebar-content";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={isMobileMenuOpen ? "h-screen overflow-hidden" : ""}>
      <SidebarContent
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </div>
  );
}
