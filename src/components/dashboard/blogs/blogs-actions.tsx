"use client";

import { useState } from "react";
import { AddBlogPopup } from "./add-blog-popup";

function BlogsActions() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end px-4 sm:px-0">
        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl bg-secondary px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary hover:bg-secondary/90 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add Blog</span>
        </button>
      </div>

      <AddBlogPopup isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </>
  );
}

export { BlogsActions };
