"use client";

function BlogsActions() {
  const handleNewArticle = () => {
    const event = new CustomEvent('openNewArticle');
    window.dispatchEvent(event);
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleNewArticle}
        className="flex items-center gap-2 rounded-2xl bg-secondary px-6 py-3 text-sm font-semibold text-primary hover:bg-secondary/90 transition-all hover:scale-105"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add New Blog
      </button>
    </div>
  );
}

export { BlogsActions };