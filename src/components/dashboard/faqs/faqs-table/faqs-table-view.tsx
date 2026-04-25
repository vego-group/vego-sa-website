"use client";

import { BlogStatusBadge } from "../../blogs/blog-status-badge";
import type { FaqApiItem } from "./types";
import { getFaqOrder, isFaqPublished } from "./utils";

type FaqsTableViewProps = {
  faqs: FaqApiItem[];
  isFetching: boolean;
  onEdit: (id: number | string) => void;
  onDelete: (id: number | string) => void;
};

function ActionButtons({
  faqId,
  onEdit,
  onDelete,
}: {
  faqId: number | string;
  onEdit: (id: number | string) => void;
  onDelete: (id: number | string) => void;
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        onClick={() => onEdit(faqId)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
        title="Edit"
        type="button"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
      <button
        onClick={() => onDelete(faqId)}
        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/60 hover:text-red-400"
        title="Delete"
        type="button"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}

function FaqsTableView({
  faqs,
  isFetching,
  onEdit,
  onDelete,
}: FaqsTableViewProps) {
  return (
    <div
      className={
        isFetching
          ? "opacity-60 animate-pulse pointer-events-none transition-opacity"
          : undefined
      }
    >
      <div className="block lg:hidden divide-y divide-white/10">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="p-4 space-y-3 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-white/40">
                #{getFaqOrder(faq)}
              </span>
              <BlogStatusBadge
                status={isFaqPublished(faq) ? "published" : "draft"}
              />
            </div>

            <h3 className="text-sm font-medium text-white line-clamp-2 break-words">
              {faq.question_en || "Untitled FAQ"}
            </h3>

            <p className="text-xs text-white/50 line-clamp-2 break-words">
              {faq.answer_en || "No answer"}
            </p>

            <div className="pt-2">
              <ActionButtons
                faqId={faq.id}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block text-white/70 overflow-x-auto">
        <div className="min-w-200">
          <div className="grid grid-cols-13 gap-4 px-6 py-4 border-b border-white/10 text-xs font-medium text-white/50 uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Question</div>
            <div className="col-span-4">Answer</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          <div className="divide-y divide-white/10">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="grid grid-cols-13 gap-4 px-6 py-5 hover:bg-white/5 transition-colors"
              >
                <div className="col-span-1 flex items-start">
                  <span className="text-sm font-medium text-white/60">
                    #{getFaqOrder(faq)}
                  </span>
                </div>

                <div className="col-span-5 min-w-0">
                  <h3 className="text-sm font-medium text-white mb-1 line-clamp-1 break-words">
                    {faq.question_en || "Untitled FAQ"}
                  </h3>
                </div>

                <div className="col-span-4 min-w-0">
                  <p className="text-xs text-white/50 line-clamp-2 break-words">
                    {faq.answer_en || "No answer"}
                  </p>
                </div>

                <div className="col-span-2 flex items-start">
                  <BlogStatusBadge
                    status={isFaqPublished(faq) ? "published" : "draft"}
                  />
                </div>

                <div className="col-span-1 flex items-start justify-end">
                  <ActionButtons
                    faqId={faq.id}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { FaqsTableView };
