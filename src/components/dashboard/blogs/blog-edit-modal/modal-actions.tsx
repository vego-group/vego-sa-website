import Loader from "@/components/ui/loader";

type ModalActionsProps = {
  onClose: () => void;
  loading: boolean;
  disabled: boolean;
  submitting?: boolean;
};

function ModalActions({
  onClose,
  loading,
  disabled,
  submitting = false,
}: ModalActionsProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 -mb-3 pb-3">
      <button
        type="button"
        onClick={onClose}
        className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm sm:text-base w-full sm:w-auto"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={loading || disabled || submitting}
        className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-secondary text-primary font-semibold hover:bg-secondary/90 transition-colors text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? <Loader borderColor="#0E2E25" /> : "Update Blog"}
      </button>
    </div>
  );
}

export { ModalActions };
