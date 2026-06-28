"use client";

import { DashboardDeleteConfirmationPopup } from "@/components/dashboard/shared/delete-confirmation-popup";
import { deleteInvestmentInterestAPI } from "@/services/mutations/investment-interest";
import { useQueryClient } from "@tanstack/react-query";

type DeleteInvestmentInterestConfirmationPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: number | string;
  itemLabel?: string | null;
};

function DeleteInvestmentInterestConfirmationPopup({
  isOpen,
  onClose,
  id,
  itemLabel,
}: DeleteInvestmentInterestConfirmationPopupProps) {
  const queryClient = useQueryClient();

  return (
    <DashboardDeleteConfirmationPopup
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Investment Request"
      description="Are you sure you want to delete this investment request? This action is permanent."
      itemLabel={itemLabel ?? undefined}
      disabled={!id}
      errorMessage="Could not delete investment request."
      successMessage="Investment request deleted successfully"
      onConfirm={async () => {
        if (!id) return { ok: false, message: "Missing investment request id." };
        const result = await deleteInvestmentInterestAPI(id);

        if (result.status === 404) {
          return {
            ok: true,
            message: "Investment request was already deleted. Refreshing the list.",
          };
        }

        return result;
      }}
      onDeleted={() =>
        queryClient.invalidateQueries({ queryKey: ["investment-interests"] })
      }
    />
  );
}

export { DeleteInvestmentInterestConfirmationPopup };
