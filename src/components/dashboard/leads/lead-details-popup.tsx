"use client";

import Modal from "@/components/ui/modal";

type LeadDetailsPopupLead = {
  date?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  category?: string | null;
  message?: string | null;
};

type LeadDetailsPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadDetailsPopupLead | null;
};

function LeadDetailsPopup({ isOpen, onClose, lead }: LeadDetailsPopupProps) {
  if (!lead) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Lead Details"
      titleClassName="text-xl sm:text-2xl font-semibold text-white"
      contentClassName="bg-linear-to-br from-emerald-950 via-primary to-emerald-950 sm:max-w-2xl mx-auto overflow-hidden"
      closeButtonClassname="text-white"
      scrollAreaClassname="max-w-full"
    >
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 max-w-full overflow-x-hidden">
        <div className="flex justify-end items-start">
          <span className="text-xs sm:text-sm text-white/50 px-1">
            {lead.date}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <div className="space-y-1 min-w-0">
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">
              Name
            </label>
            <p className="text-sm sm:text-base text-white font-medium wrap-break-word bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
              {lead.name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1 min-w-0">
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">
              Email
            </label>
            <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
              <a
                href={`mailto:${lead.email}`}
                className="text-sm sm:text-base text-secondary hover:underline break-all block"
              >
                {lead.email}
              </a>
            </div>
          </div>

          <div className="space-y-1 min-w-0">
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">
              Phone
            </label>
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

        <div className="space-y-1 min-w-0">
          <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">
            Category
          </label>
          <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
            <p className="text-sm sm:text-base text-white wrap-break-word">
              {lead.category || "Not specified"}
            </p>
          </div>
        </div>

        <div className="space-y-2 min-w-0">
          <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">
            Message
          </label>
          <div className="w-full max-w-full bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 p-2 sm:p-3 overflow-hidden">
            <textarea
              readOnly
              value={lead.message ?? ""}
              rows={3}
              className="w-full min-h-20 sm:min-h-24 max-h-64 resize-none bg-transparent px-2 py-1 text-sm sm:text-base text-white/90 leading-relaxed outline-none border-0 whitespace-pre-wrap break-all wrap-anywhere custom-scrollbar"
              style={{ wordBreak: "break-word" }}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 sm:pt-6">
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
