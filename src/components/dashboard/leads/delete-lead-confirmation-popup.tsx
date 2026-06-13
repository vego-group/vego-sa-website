"use client";

import { DashboardDeleteConfirmationPopup } from "@/components/dashboard/shared/delete-confirmation-popup";
import { deleteContactAPI } from "@/services/mutations/contact";
import { useQueryClient } from "@tanstack/react-query";

type DeleteLeadConfirmationPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: number | string;
  leadName?: string | null;
};

function DeleteLeadConfirmationPopup({
  isOpen,
  onClose,
  id,
  leadName,
}: DeleteLeadConfirmationPopupProps) {
  const queryClient = useQueryClient();

  return (
    <DashboardDeleteConfirmationPopup
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Lead"
      description="Are you sure you want to delete this contact message? This action is permanent."
      itemLabel={leadName ?? undefined}
      disabled={!id}
      errorMessage="Could not delete contact message."
      successMessage="Contact deleted successfully"
      onConfirm={async () => {
        if (!id) return { ok: false, message: "Missing contact id." };

        const result = await deleteContactAPI(id);

        if (result.status === 404) {
          return {
            ok: true,
            message: "Contact was already deleted. Refreshing the list.",
          };
        }

        return result;
      }}
      onDeleted={() => queryClient.invalidateQueries({ queryKey: ["contacts"] })}
    />
  );
}

export { DeleteLeadConfirmationPopup };
