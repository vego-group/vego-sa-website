type Article = {
  id: string;
  title: string;
  category: string;
  date: string;
};

type ArticleTableProps = {
  articles: Article[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onNew?: () => void;
};

function ArticleTable({ articles, onEdit, onDelete, onNew }: ArticleTableProps) {
  return (
    <div className="text-white/70">
      <div className="flex justify-end mb-4">
        {onNew && (
          <button
            onClick={onNew}
            className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary/90 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Article
          </button>
        )}
      </div>

      {articles.length === 0 ? (
        <p className="text-center py-10 text-white/40">
          No articles found
        </p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4 font-medium text-center">Actions</th>
              <th className="py-3 px-4 font-medium text-center">Date</th>
              <th className="py-3 px-4 font-medium text-center">Category</th>
              <th className="py-3 px-4 font-medium text-center">Article</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-4 px-4">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => onEdit(article.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(article.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600/80 hover:bg-red-700 rounded text-sm transition-colors"
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">{article.date}</td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm">
                    {article.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <div>
                    <h3 className="font-medium text-white">{article.title}</h3>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export { ArticleTable };