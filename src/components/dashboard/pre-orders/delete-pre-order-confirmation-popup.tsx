"use client";

import { DashboardDeleteConfirmationPopup } from "@/components/dashboard/shared/delete-confirmation-popup";
import { deletePreorderAPI } from "@/services/mutations/pre-orders";
import { useQueryClient } from "@tanstack/react-query";

type DeletePreOrderConfirmationPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: number | string;
  customerName?: string | null;
  paymentStatus?: string | null;
};

function DeletePreOrderConfirmationPopup({
  isOpen,
  onClose,
  id,
  customerName,
  paymentStatus,
}: DeletePreOrderConfirmationPopupProps) {
  const queryClient = useQueryClient();
  const isPaid = paymentStatus?.toLowerCase() === "paid";

  return (
    <DashboardDeleteConfirmationPopup
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Pre-order"
      description={
        isPaid
          ? "This paid pre-order and its payment transaction records will be permanently deleted. Continue?"
          : "Are you sure you want to delete this pre-order? This action is permanent."
      }
      itemLabel={customerName ?? undefined}
      disabled={!id}
      errorMessage="Could not delete pre-order."
      successMessage="Pre-order deleted successfully"
      onConfirm={async () => {
        if (!id) return { ok: false, message: "Missing pre-order id." };

        const result = await deletePreorderAPI(id);

        if (result.status === 404) {
          return {
            ok: true,
            message: "Pre-order was already deleted. Refreshing the list.",
          };
        }

        return result;
      }}
      onDeleted={() =>
        queryClient.invalidateQueries({ queryKey: ["pre-orders"] })
      }
    />
  );
}

export { DeletePreOrderConfirmationPopup };
