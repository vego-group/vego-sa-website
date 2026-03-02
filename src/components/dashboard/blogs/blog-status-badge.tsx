type BlogStatusBadgeProps = {
  status: string;
};

function BlogStatusBadge({ status }: BlogStatusBadgeProps) {
  if (status === "published") {
    return (
      <span className="inline-flex px-2 sm:px-3 py-1 sm:py-1.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
        Published
      </span>
    );
  }

  return (
    <span className="inline-flex px-2 sm:px-3 py-1 sm:py-1.5 text-xs rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
      Draft
    </span>
  );
}

export { BlogStatusBadge };
