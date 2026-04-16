"use client";

import type { ReactNode } from "react";

import Modal from "@/components/ui/modal";

type TestDriveDetailsPopupRegistration = {
  createdAt?: string | null;
  name?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  age?: number | null;
  gender?: string | null;
  product?: string | null;
  preferredSlot?: string | null;
};

type TestDriveDetailsPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  registration: TestDriveDetailsPopupRegistration | null;
};

function InfoBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 space-y-1">
      <label className="block text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
      </label>
      <div className="rounded-lg border border-white/10 bg-white/5 p-2 sm:p-3">
        {children}
      </div>
    </div>
  );
}

function TestDriveDetailsPopup({
  isOpen,
  onClose,
  registration,
}: TestDriveDetailsPopupProps) {
  if (!registration) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Test Drive Details"
      titleClassName="text-xl sm:text-2xl font-semibold text-white"
      contentClassName="bg-linear-to-br from-emerald-950 via-primary to-emerald-950 sm:max-w-2xl mx-auto overflow-hidden"
      closeButtonClassname="text-white"
      scrollAreaClassname="max-w-full"
    >
      <div className="max-w-full space-y-4 overflow-x-hidden p-3 sm:space-y-6 sm:p-4 md:p-6">
        <div className="flex items-start justify-end gap-3">
          <span className="px-1 text-xs text-white/50 sm:text-sm">
            {registration.createdAt}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <InfoBlock label="Name">
            <p className="break-words text-sm font-medium text-white sm:text-base">
              {registration.name ?? "N/A"}
            </p>
          </InfoBlock>

          <InfoBlock label="Age">
            <p className="text-sm text-white sm:text-base">
              {registration.age ?? "N/A"}
            </p>
          </InfoBlock>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <InfoBlock label="Email">
            <a
              href={`mailto:${registration.email ?? ""}`}
              className="block break-all text-sm text-secondary hover:underline sm:text-base"
            >
              {registration.email ?? "N/A"}
            </a>
          </InfoBlock>

          <InfoBlock label="Phone Number">
            <a
              href={`tel:${registration.phoneNumber ?? ""}`}
              className="block break-all text-sm text-secondary hover:underline sm:text-base"
            >
              {registration.phoneNumber ?? "N/A"}
            </a>
          </InfoBlock>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <InfoBlock label="Gender">
            <p className="text-sm text-white sm:text-base">
              {registration.gender ?? "N/A"}
            </p>
          </InfoBlock>

          <InfoBlock label="Product">
            <p className="text-sm text-white sm:text-base">
              {registration.product ?? "N/A"}
            </p>
          </InfoBlock>
        </div>

        <InfoBlock label="Preferred Slot">
          <p className="break-words text-sm text-white sm:text-base">
            {registration.preferredSlot ?? "N/A"}
          </p>
        </InfoBlock>

        <div className="flex justify-end pt-4 sm:pt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white sm:w-auto sm:rounded-2xl sm:px-8 sm:py-3 sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export { TestDriveDetailsPopup };
