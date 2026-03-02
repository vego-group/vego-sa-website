import { formatDate } from "@/lib";
import { BlogStatusBadge } from "./blog-status-badge";
import { RowActions } from "./blog-row-actions";
import { Blog } from "@/interfaces/dashboard/blogs";

type BlogsMobileListProps = {
  blogs: Blog[];
};

function BlogsMobileList({ blogs }: BlogsMobileListProps) {
  return (
    <div className="block lg:hidden divide-y divide-white/10">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="p-4 space-y-3 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium text-white truncate">
              {blog.title?.en || "Untitled"}
            </h3>
            <BlogStatusBadge
              status={
                blog.status === "publish" || blog.status === "published"
                  ? "published"
                  : "draft"
              }
            />
          </div>

          <p className="text-xs text-white/50 truncate">
            {blog.excerpt?.en || "-"}
          </p>

          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>
              {formatDate(blog.published_at ?? blog.created_at ?? null)}
            </span>
          </div>

          <div className="flex items-center justify-end gap-1 pt-2">
            <RowActions blogId={blog?.id} blogTitle={blog?.title?.en} />
          </div>
        </div>
      ))}
    </div>
  );
}

export { BlogsMobileList };
