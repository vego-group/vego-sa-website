"use client";

import { motion } from "framer-motion";

type TabType = "all" | "new" | "read" | "replied";

type LeadsTabsProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  counts: {
    all: number;
    new: number;
    read: number;
    replied: number;
  };
};

function LeadsTabs({ activeTab, onTabChange, counts }: LeadsTabsProps) {
  const tabs = [
    { id: "all", label: "All Leads", count: counts.all },
    { id: "new", label: "New", count: counts.new },
    { id: "read", label: "Read", count: counts.read },
    { id: "replied", label: "Replied", count: counts.replied },
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
                layoutId="activeLeadTab"
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

export { LeadsTabs };