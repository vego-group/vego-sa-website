"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type TabType = "all" | "published" | "drafts";

type FaqsTabsProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  counts: {
    all: number;
    published: number;
    drafts: number;
  };
};

function FaqsTabs({ activeTab, onTabChange, counts }: FaqsTabsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { id: "all", label: "All", fullLabel: "All FAQs", count: counts.all },
    { id: "published", label: "Published", fullLabel: "Published", count: counts.published },
    { id: "drafts", label: "Drafts", fullLabel: "Drafts", count: counts.drafts },
  ];

  return (
    <div className="border-b border-white/10 px-4 sm:px-0 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-1 sm:gap-2 min-w-max sm:min-w-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as TabType)}
            className={`relative px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
              ${activeTab === tab.id 
                ? "text-white" 
                : "text-white/60 hover:text-white/80"
              }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeFaqTab"
                className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="sm:hidden">{tab.label}</span>
              <span className="hidden sm:inline">{tab.fullLabel || tab.label}</span>
              <span className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full 
                ${activeTab === tab.id 
                  ? "bg-secondary/20 text-secondary" 
                  : "bg-white/10 text-white/60"
                }`}
              >
                {tab.count}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { FaqsTabs };