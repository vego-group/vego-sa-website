"use client";

import Modal from "@/components/ui/modal";
import type { InvestmentInterest } from "@/interfaces";
import { formatInvestmentTicketType } from "./investment-ticket-type";

type InvestmentInterestDetailsPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  item: InvestmentInterest | null;
};

function InvestmentInterestDetailsPopup({
  isOpen,
  onClose,
  item,
}: InvestmentInterestDetailsPopupProps) {
  if (!item) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Investment Request Details"
      titleClassName="text-xl sm:text-2xl font-semibold text-white"
      contentClassName="bg-linear-to-br from-emerald-950 via-primary to-emerald-950 sm:max-w-2xl mx-auto overflow-hidden"
      closeButtonClassname="text-white"
      scrollAreaClassname="max-w-full"
    >
      <div className="space-y-4 p-3 sm:space-y-6 sm:p-6">
        <Detail label="Full Name" value={item.full_name} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Detail label="Phone" value={item.phone_number} href={`tel:${item.phone_number}`} />
          <Detail label="Email" value={item.email ?? "N/A"} href={item.email ? `mailto:${item.email}` : undefined} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Detail label="Ticket Type" value={formatInvestmentTicketType(item.ticket_type)} />
          <Detail label="Submitted At" value={formatDate(item.created_at)} />
        </div>
        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Detail({
  label,
  value,
  href,
}: {
  label: string;
  value?: string | number | null;
  href?: string;
}) {
  const content = (
    <span className="block break-all text-sm text-white sm:text-base">
      {value ?? "N/A"}
    </span>
  );

  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
      </label>
      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        {href ? (
          <a href={href} className="text-secondary hover:underline">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

function formatDate(value?: string | null) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export { InvestmentInterestDetailsPopup };
