"use client";

import { motion } from "framer-motion";

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
  const tabs = [
    { id: "all", label: "All FAQs", count: counts.all },
    { id: "published", label: "Published", count: counts.published },
    { id: "drafts", label: "Drafts", count: counts.drafts },
  ];

  return (
    <div className="border-b border-white/10">
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as TabType)}
            className={`relative px-5 py-3 text-sm font-medium transition-colors
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
            <span className="flex items-center gap-2">
              {tab.label}
              <span className={`text-xs px-2 py-0.5 rounded-full 
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