"use client";

import Modal from "@/components/ui/modal";
import { useEffect } from "react";

type DeleteConfirmationPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  articleTitle?: string;
};

function DeleteConfirmationPopup({
  isOpen,
  onClose,
  onConfirm,
  articleTitle,
}: DeleteConfirmationPopupProps) {
  useEffect(() => {
    // Prevent scrolling when popup is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Delete Article"
      titleClassName="text-lg sm:text-xl md:text-2xl font-semibold text-white"
      contentClassName="bg-linear-to-br from-emerald-950 via-primary to-emerald-950 sm:max-w-md sm:w-[90vw]"
      closeButtonClassname="text-white"
    >
      <div className="space-y-4 sm:space-y-6 p-2 sm:p-4">
        {/* Warning Message */}
        <div className="bg-white/5 rounded-lg sm:rounded-2xl border border-white/10 p-4 sm:p-6 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <p className="text-white/70 mb-2 text-xs sm:text-sm">
            Are you sure you want to delete this article?
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-2xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-xs sm:text-sm md:text-base order-2 sm:order-1 font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base order-1 sm:order-2"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
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
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export { DeleteConfirmationPopup };
