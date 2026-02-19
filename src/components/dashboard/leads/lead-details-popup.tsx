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

  if (!lead) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Lead Details"
      titleClassName="text-2xl font-semibold text-white"
      contentClassName="bg-gradient-to-br from-primary via-primary to-emerald-950 sm:max-w-2xl"
      closeButtonClassname="text-white"
    >
      <div className="space-y-6">
        {/* Date only - removed status badge */}
        <div className="flex justify-end items-start">
          <span className="text-sm text-white/50">{lead.date}</span>
        </div>

        {/* Name & Company */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/50 mb-1">Name</label>
            <p className="text-white font-medium">{lead.name}</p>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Company</label>
            <p className="text-white font-medium">{lead.company}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/50 mb-1">Email</label>
            <a 
              href={`mailto:${lead.email}`}
              className="text-secondary hover:underline"
            >
              {lead.email}
            </a>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Phone</label>
            <a 
              href={`tel:${lead.phone}`}
              className="text-secondary hover:underline"
            >
              {lead.phone}
            </a>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs text-white/50 mb-2">Message</label>
          <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
            <p className="text-white/90 whitespace-pre-wrap">
              {lead.message}
            </p>
          </div>
        </div>

        {/* Actions - Only close button now */}
        <div className="flex justify-end pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export { LeadDetailsPopup };