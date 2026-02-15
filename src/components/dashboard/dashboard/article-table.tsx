type Article = {
  id: string;
  title: string;
  category: string;
  date: string;
  status?: string;
};

type ArticleTableProps = {
  articles: Article[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

function ArticleTable({ articles, onEdit, onDelete }: ArticleTableProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-white/40 text-lg">No articles found</p>
        <p className="text-white/20 text-sm mt-2">Try changing the filter or create a new article</p>
      </div>
    );
  }

  return (
    <div className="text-white/70">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-xs font-medium text-white/50 uppercase tracking-wider">
        <div className="col-span-6">Title</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Publish Date</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-white/10">
        {articles.map((article) => (
          <div key={article.id} className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-white/5 transition-colors">
            {/* Article Title */}
            <div className="col-span-6">
              <h3 className="text-sm font-medium text-white mb-2">
                {article.title}
              </h3>
              <p className="text-xs text-white/50 line-clamp-2">
                {article.status === "Published" 
                  ? "Published on " + article.date 
                  : "Last edited on " + article.date
                }
              </p>
            </div>

            {/* Status */}
            <div className="col-span-2 flex items-start">
              <span className={`inline-flex px-3 py-1.5 text-xs rounded-full font-medium
                ${article.status === 'Published' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {article.status || 'Draft'}
              </span>
            </div>

            {/* Publish Date */}
            <div className="col-span-2 flex items-start">
              <span className="text-sm text-white/60">
                {article.date}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-start justify-end gap-1">
              <button
                onClick={() => onEdit(article.id)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                title="Edit article"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(article.id)}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/60 hover:text-red-400"
                title="Delete article"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ArticleTable };