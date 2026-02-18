"use client";

import Modal from "@/components/ui/modal";
import { AlertTriangle } from "lucide-react";

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
  articleTitle 
}: DeleteConfirmationPopupProps) {

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Delete Article"
      titleClassName="text-xl sm:text-2xl font-semibold text-white"
      contentClassName="bg-gradient-to-br from-primary via-primary to-red-950/30 w-[95vw] sm:max-w-md"
      closeButtonClassname="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-white/20"
    >
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Icon & Warning */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-3 sm:mb-4">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-red-400" />
          </div>
          
          <p className="text-xs sm:text-sm text-white/70">
            This action cannot be undone
          </p>
        </div>

        {/* Warning Message */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-white/90 text-center">
            Are you sure you want to delete
            <span className="font-semibold text-white block mt-1 text-sm sm:text-base">
              "{articleTitle || 'this article'}"?
            </span>
          </p>
          <p className="text-xs text-white/60 text-center mt-2">
            All associated data will be permanently removed.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
          >
            <svg 
              className="w-3.5 h-3.5 sm:w-4 sm:h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
            Delete Article
          </button>
        </div>
      </div>
    </Modal>
  );
}

export { DeleteConfirmationPopup };