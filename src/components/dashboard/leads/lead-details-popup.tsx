"use client";

import Modal from "@/components/ui/modal";
import { useEffect } from "react";

type LeadDetailsPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
  onMarkAsReplied?: (id: string) => void;
};

function LeadDetailsPopup({
  isOpen,
  onClose,
  lead,
  onMarkAsReplied,
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

  const getStatusColor = (status: string) => {
    switch(status) {
      case "New":
        return "bg-blue-500/20 text-blue-400";
      case "Read":
        return "bg-amber-500/20 text-amber-400";
      case "Replied":
        return "bg-emerald-500/20 text-emerald-400";
      default:
        return "bg-white/10 text-white/60";
    }
  };

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
        {/* Status Badge */}
        <div className="flex justify-between items-start">
          <span className={`inline-flex px-3 py-1.5 text-xs rounded-full font-medium ${getStatusColor(lead.status)}`}>
            {lead.status}
          </span>
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

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
          >
            Close
          </button>
          {lead.status !== "Replied" && onMarkAsReplied && (
            <button
              type="button"
              onClick={() => {
                onMarkAsReplied(lead.id);
                onClose();
              }}
              className="px-6 py-3 rounded-2xl bg-secondary text-primary font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" 
                />
              </svg>
              Mark as Replied
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export { LeadDetailsPopup };