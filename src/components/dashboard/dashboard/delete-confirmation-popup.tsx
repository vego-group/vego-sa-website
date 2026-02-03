"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
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
  articleTitle 
}: DeleteConfirmationPopupProps) {

  useEffect(() => {
    // منع التمرير عند فتح الـ popup
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />

          {/* Popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md rounded-[32px] border border-red-500/20 bg-gradient-to-br from-primary via-primary to-red-950/30 p-8 shadow-2xl"
            >
              <div className="space-y-6">
                {/* Icon & Title */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  
                  <h2 className="text-xl font-semibold text-white">
                    Delete Article
                  </h2>
                  
                  <p className="text-sm text-white/70 mt-1">
                    This action cannot be undone
                  </p>
                </div>

                {/* Warning Message */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                  <p className="text-sm text-white/90 text-center">
                    Are you sure you want to delete
                    <span className="font-semibold text-white block mt-1">
                      "{articleTitle || 'this article'}"?
                    </span>
                  </p>
                  <p className="text-xs text-white/60 text-center mt-2">
                    All associated data will be permanently removed.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 rounded-2xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="px-6 py-3 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <svg 
                      className="w-4 h-4" 
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
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export { DeleteConfirmationPopup };