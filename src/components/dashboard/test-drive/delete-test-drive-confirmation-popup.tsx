"use client";

import { DashboardDeleteConfirmationPopup } from "@/components/dashboard/shared/delete-confirmation-popup";
import { deleteTestDriveRegistrationAPI } from "@/services/mutations/test-drive";
import { useQueryClient } from "@tanstack/react-query";

type DeleteTestDriveConfirmationPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: number | string;
  registrationName?: string | null;
};

function DeleteTestDriveConfirmationPopup({
  isOpen,
  onClose,
  id,
  registrationName,
}: DeleteTestDriveConfirmationPopupProps) {
  const queryClient = useQueryClient();

  return (
    <DashboardDeleteConfirmationPopup
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Test Drive"
      description="Are you sure you want to delete this test drive registration? This action is permanent."
      itemLabel={registrationName ?? undefined}
      disabled={!id}
      errorMessage="Could not delete test drive registration."
      successMessage="Test drive registration deleted successfully"
      onConfirm={async () => {
        if (!id) return { ok: false, message: "Missing registration id." };

        const result = await deleteTestDriveRegistrationAPI(id);

        if (result.status === 404) {
          return {
            ok: true,
            message:
              "Test drive registration was already deleted. Refreshing the list.",
          };
        }

        return result;
      }}
      onDeleted={() =>
        queryClient.invalidateQueries({
          queryKey: ["test-drive-registrations"],
        })
      }
    />
  );
}

export { DeleteTestDriveConfirmationPopup };
