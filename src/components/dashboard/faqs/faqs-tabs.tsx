"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type TabType = "all" | "published" | "drafts";

type FaqsTabsProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

function FaqsTabs({ activeTab, onTabChange }: FaqsTabsProps) {
  const tabs = [
    { id: "all", label: "All", fullLabel: "All" },
    { id: "published", label: "Published", fullLabel: "Published" },
    { id: "drafts", label: "Drafts", fullLabel: "Drafts" },
  ];

  return (
    <div className="border-b border-white/10 px-4 sm:px-0 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-1 sm:gap-2 min-w-max sm:min-w-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as TabType)}
            className={`relative px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
              ${
                activeTab === tab.id
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
              <span className="hidden sm:inline">
                {tab.fullLabel || tab.label}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { FaqsTabs };
