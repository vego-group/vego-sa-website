"use client";

import { motion } from "framer-motion";

type BlogsTabItemProps = {
  isActive: boolean;
  label: string;
  onClick: () => void;
};

function BlogsTabItem({ isActive, label, onClick }: BlogsTabItemProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 py-3 text-sm font-medium transition-colors ${
        isActive ? "text-white" : "text-white/60 hover:text-white/80"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeBlogTab"
          className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="flex items-center gap-2 whitespace-nowrap">{label}</span>
    </button>
  );
}

export { BlogsTabItem };
