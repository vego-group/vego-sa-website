"use client";

import Modal from "@/components/ui/modal";
import { useEffect } from "react";

type LeadDetailsPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
};

function LeadDetailsPopup({
  isOpen,
  onClose,
  lead,
}: LeadDetailsPopupProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!lead) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Lead Details"
      titleClassName="text-xl sm:text-2xl font-semibold text-white"
      contentClassName="bg-gradient-to-br from-primary via-primary to-emerald-950 w-[95vw] sm:max-w-2xl mx-auto"
      closeButtonClassname="text-white"
    >
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
        {/* Date */}
        <div className="flex justify-end items-start">
          <span className="text-xs sm:text-sm text-white/50 px-1">{lead.date}</span>
        </div>

        {/* Name & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">Name</label>
            <p className="text-sm sm:text-base text-white font-medium break-words bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
              {lead.name}
            </p>
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">Company</label>
            <p className="text-sm sm:text-base text-white font-medium break-words bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
              {lead.company || "—"}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">Email</label>
            <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
              <a 
                href={`mailto:${lead.email}`}
                className="text-sm sm:text-base text-secondary hover:underline break-all block"
              >
                {lead.email}
              </a>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">Phone</label>
            <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
              <a 
                href={`tel:${lead.phone}`}
                className="text-sm sm:text-base text-secondary hover:underline break-all block"
              >
                {lead.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">Category</label>
          <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
            <p className="text-sm sm:text-base text-white">
              {lead.category || "Not specified"}
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">Message</label>
          <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 p-3 sm:p-4 max-h-48 sm:max-h-64 overflow-y-auto custom-scrollbar">
            <p className="text-sm sm:text-base text-white/90 whitespace-pre-wrap break-words leading-relaxed">
              {lead.message}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-4 sm:pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm sm:text-base font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export { LeadDetailsPopup };