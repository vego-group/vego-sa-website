"use client";

import Loader from "@/components/ui/loader";
import Modal from "@/components/ui/modal";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type DeleteResult = {
  ok: boolean;
  message?: string;
};

type DashboardDeleteConfirmationPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  itemLabel?: string;
  disabled?: boolean;
  errorMessage: string;
  successMessage: string;
  onConfirm: () => Promise<DeleteResult>;
  onDeleted?: () => Promise<void> | void;
};

function DashboardDeleteConfirmationPopup({
  isOpen,
  onClose,
  title,
  description,
  itemLabel,
  disabled = false,
  errorMessage,
  successMessage,
  onConfirm,
  onDeleted,
}: DashboardDeleteConfirmationPopupProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (disabled || isDeleting) return;

    setIsDeleting(true);
    const result = await onConfirm();
    setIsDeleting(false);

    if (!result.ok) {
      toast.error(result.message ?? errorMessage);
      return;
    }

    toast.success(result.message ?? successMessage);
    onClose();
    await onDeleted?.();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={title}
      titleClassName="text-lg sm:text-xl md:text-2xl font-semibold text-white"
      contentClassName="bg-linear-to-br from-emerald-950 via-primary to-emerald-950 sm:max-w-md sm:w-[90vw]"
      closeButtonClassname="text-white"
    >
      <div className="space-y-4 p-2 sm:space-y-6 sm:p-4">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center sm:rounded-2xl sm:p-6">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 sm:mb-4 sm:h-16 sm:w-16">
            <svg
              className="h-6 w-6 text-red-400 sm:h-8 sm:w-8"
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

          <p className="mb-2 text-xs text-white/70 sm:text-sm">
            {description}
          </p>
          {itemLabel ? (
            <p className="line-clamp-2 max-w-full break-all text-sm font-medium text-white">
              {itemLabel}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col-reverse justify-end gap-2 border-t border-white/10 pt-3 sm:flex-row sm:gap-3 sm:pt-4">
          <button
            type="button"
            onClick={onClose}
            className="order-2 rounded-lg border border-white/20 px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white sm:order-1 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-sm md:text-base"
          >
            Cancel
          </button>
          <button
            disabled={disabled || isDeleting}
            type="button"
            onClick={handleDelete}
            className="order-1 flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:order-2 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-sm md:text-base"
          >
            {isDeleting ? (
              <Loader />
            ) : (
              <>
                <Trash2 className="size-5" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export { DashboardDeleteConfirmationPopup };
