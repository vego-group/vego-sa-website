import { formatDate } from "@/lib";
import type { Blog } from "@/interfaces";
import { BlogStatusBadge } from "./blog-status-badge";
import { RowActions } from "./blog-row-actions";

type BlogsDesktopTableProps = {
  blogs: Blog[];
};

function BlogsDesktopTable({ blogs }: BlogsDesktopTableProps) {
  return (
    <div className="hidden lg:block text-white/70 overflow-x-auto">
      <div className="min-w-200">
        <div className="grid grid-cols-11 gap-4 px-6 py-4 border-b border-white/10 text-xs font-medium text-white/50 uppercase tracking-wider">
          <div className="col-span-5">Title</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        <div className="divide-y divide-white/10">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="grid grid-cols-11 gap-4 px-6 py-5 hover:bg-white/5 transition-colors"
            >
              <div className="col-span-5">
                <h3 className="text-sm font-medium text-white mb-1 truncate">
                  {blog.title?.en || "Untitled"}
                </h3>
                <p className="text-xs text-white/50 truncate">
                  {blog.excerpt?.en || "-"}
                </p>
              </div>

              <div className="col-span-2">
                <BlogStatusBadge
                  status={
                    blog.status === "publish" || blog.status === "published"
                      ? "published"
                      : "draft"
                  }
                />
              </div>

              <div className="col-span-3">
                <span className="text-sm text-white/60">
                  {formatDate(blog?.published_at ?? blog?.created_at ?? null)}
                </span>
              </div>

              <div className="col-span-1 flex items-start justify-end gap-1">
                <RowActions blogId={blog?.id} blogTitle={blog?.title?.en} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { BlogsDesktopTable };
