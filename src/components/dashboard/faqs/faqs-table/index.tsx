"use client";

import { useState } from "react";
import { SkeletonCard } from "@/components/skeleton/card";
import { useDashboardFaqs } from "@/hooks/api/faqs";
import { BlogsPagination } from "../../blogs/blogs-pagination";
import { DeleteFaqConfirmationPopup } from "../delete-faq-confirmation-popup";
import { FaqEditorPopup } from "../faq-editor-popup";
import { FaqsTableView } from "./faqs-table-view";
import type { FaqApiItem, FaqsTableProps } from "./types";
import { getDashboardFaqItems, getDashboardFaqMeta, isFaqPublished } from "./utils";

function FaqsTableContent({ activeTab, searchQuery }: Required<FaqsTableProps>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingFaq, setEditingFaq] = useState<FaqApiItem | null>(null);
  const [deletingFaq, setDeletingFaq] = useState<FaqApiItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const { data, isLoading, isFetching } = useDashboardFaqs(currentPage);
  const rawFaqs = getDashboardFaqItems(data);

  const filteredFaqs = rawFaqs.filter((faq) => {
    const published = isFaqPublished(faq);

    if (activeTab === "published" && !published) return false;
    if (activeTab === "drafts" && published) return false;

    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return [faq.question_en, faq.answer_en].some((text) =>
      (text ?? "").toLowerCase().includes(query),
    );
  });

  const meta = getDashboardFaqMeta(data) as
    | { last_page?: number | string; current_page?: number | string }
    | undefined;
  const totalPages = Math.max(Number(meta?.last_page ?? 1), 1);
  const activePage = Math.max(Number(meta?.current_page ?? currentPage), 1);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleEdit = (id: number | string) => {
    const faq = rawFaqs.find((item) => item.id === id);
    if (!faq) return;
    setEditingFaq(faq);
    setIsEditorOpen(true);
  };

  const handleDeleteClick = (id: number | string) => {
    const faq = rawFaqs.find((item) => item.id === id);
    if (!faq) return;
    setDeletingFaq(faq);
    setIsDeletePopupOpen(true);
  };

  if (isLoading) {
    return <SkeletonCard className="sm:h-100" />;
  }

  return (
    <>
      {filteredFaqs.length === 0 ? (
        <div className="text-center py-12 sm:py-16 px-4">
          <p className="text-white/40 text-base sm:text-lg">No FAQs found</p>
          <p className="text-white/20 text-xs sm:text-sm mt-2">
            Try changing the filter or create a new FAQ
          </p>
        </div>
      ) : (
        <FaqsTableView
          faqs={filteredFaqs}
          isFetching={isFetching}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <BlogsPagination
        pageNumbers={pageNumbers}
        activePage={activePage}
        totalPages={totalPages}
        isFetching={isFetching}
        onPageChange={setCurrentPage}
        onPrev={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
      />

      {editingFaq ? (
        <FaqEditorPopup
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingFaq(null);
          }}
          id={editingFaq.id}
        />
      ) : null}

      <DeleteFaqConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={() => {
          setIsDeletePopupOpen(false);
          setDeletingFaq(null);
        }}
        id={deletingFaq?.id}
        faqQuestion={deletingFaq?.question_en}
      />
    </>
  );
}

function FaqsTable({ activeTab = "all", searchQuery = "" }: FaqsTableProps) {
  return (
    <FaqsTableContent
      key={`${activeTab}:${searchQuery}`}
      activeTab={activeTab}
      searchQuery={searchQuery}
    />
  );
}

export { FaqsTable };
export type { FaqApiItem, FaqsTableProps } from "./types";
