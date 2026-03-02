type BlogsShowMoreButtonProps = {
  hasNextPage: boolean;
  isLoading: boolean;
  onClick: () => void;
  label: string;
  loadingLabel: string;
};

function BlogsShowMoreButton({
  hasNextPage,
  isLoading,
  onClick,
  label,
  loadingLabel,
}: BlogsShowMoreButtonProps) {
  if (!hasNextPage) {
    return null;
  }

  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        disabled={isLoading}
        className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? loadingLabel : label}
      </button>
    </div>
  );
}

export { BlogsShowMoreButton };

