"use client";

function BlogsActions() {
  const handleNewArticle = () => {
    const event = new CustomEvent('openNewArticle');
    window.dispatchEvent(event);
  };

  return (
    <div className="flex justify-end px-4 sm:px-0">
      <button
        onClick={handleNewArticle}
        className="flex items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl bg-secondary px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary hover:bg-secondary/90 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="sm:hidden">Add Blog</span>
        <span className="hidden sm:inline">Add New Blog</span>
      </button>
    </div>
  );
}

export { BlogsActions };