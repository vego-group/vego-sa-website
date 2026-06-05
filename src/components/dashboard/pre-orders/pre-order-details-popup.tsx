"use client";

import Modal from "@/components/ui/modal";
import type { PreOrder } from "@/types/dashboard/pre-orders";

type PreOrderDetailsPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  preOrder: PreOrder | null;
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function DetailField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1 min-w-0">
      <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">
        {label}
      </label>
      <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
        {children}
      </div>
    </div>
  );
}

function PreOrderDetailsPopup({
  isOpen,
  onClose,
  preOrder,
}: PreOrderDetailsPopupProps) {
  if (!preOrder) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Pre Order Details"
      titleClassName="text-xl sm:text-2xl font-semibold text-white"
      contentClassName="bg-linear-to-br from-emerald-950 via-primary to-emerald-950 sm:max-w-2xl mx-auto overflow-hidden"
      closeButtonClassname="text-white"
      scrollAreaClassname="max-w-full"
    >
      <div className="space-y-4 sm:space-y-5 p-3 sm:p-4 md:p-6 max-w-full overflow-x-hidden">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <OrderStatusBadge
              value={preOrder.status.value}
              label={preOrder.status.label}
            />
            <PaymentStatusBadge
              value={preOrder.payment_status.value}
              label={preOrder.payment_status.label}
            />
          </div>
          <span className="text-xs text-white/50">
            {formatDate(preOrder.created_at)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailField label="Customer Name">
            <p className="text-sm text-white font-medium">
              {preOrder.customer_name}
            </p>
          </DetailField>
          <DetailField label="City">
            <p className="text-sm text-white">{preOrder.city}</p>
          </DetailField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailField label="Email">
            <a
              href={`mailto:${preOrder.email}`}
              className="text-sm text-secondary hover:underline break-all block"
            >
              {preOrder.email}
            </a>
          </DetailField>
          <DetailField label="Phone">
            <a
              href={`tel:+${preOrder.phone}`}
              className="text-sm text-secondary hover:underline block"
            >
              +{preOrder.phone}
            </a>
          </DetailField>
        </div>

        <DetailField label="Product">
          <p className="text-sm text-white">{preOrder.product_name}</p>
        </DetailField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailField label="Deposit Amount">
            <p className="text-sm text-white font-semibold">
              {preOrder.deposit_amount} SAR
            </p>
          </DetailField>
          <DetailField label="Payment Reference">
            <p className="text-sm text-white/80">
              {preOrder.payment_reference ?? "—"}
            </p>
          </DetailField>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

function OrderStatusBadge({ value, label }: { value: string; label: string }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    confirmed:
      "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    cancelled: "bg-red-500/20 text-red-400 border border-red-500/30",
  };
  const cls =
    colors[value] ?? "bg-white/10 text-white/60 border border-white/10";
  return (
    <span
      className={`inline-flex px-3 py-1 text-xs rounded-full font-medium ${cls}`}
    >
      {label}
    </span>
  );
}

function PaymentStatusBadge({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const colors: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    paid: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    failed: "bg-red-500/20 text-red-400 border border-red-500/30",
    refunded: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
  };
  const cls =
    colors[value] ?? "bg-white/10 text-white/60 border border-white/10";
  return (
    <span
      className={`inline-flex px-3 py-1 text-xs rounded-full font-medium ${cls}`}
    >
      {label}
    </span>
  );
}

export { PreOrderDetailsPopup };
