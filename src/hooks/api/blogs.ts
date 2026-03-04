import {
  blogAPI,
  blogDashboardAPI,
  blogsAPI,
  blogsDashboardAPI,
} from "@/services/queries/blogs";
import { useCustomInfiniteQuery, useCustomQuery } from "../useCustomQuery";

export function useBlogs() {
  return useCustomInfiniteQuery(
    ["public", "blogs"],
    async ({ pageParam = 1 }) => {
      return blogsAPI(pageParam);
    },
    {
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const pagination = lastPage?.data?.data;
        if (!pagination) return undefined;
        if (
          pagination.next_page_url &&
          pagination.current_page < pagination.last_page
        ) {
          return pagination.current_page + 1;
        }
        return undefined;
      },
    },
  );
}

export function useDashboardBlogs(page: number) {
  return useCustomQuery(["dashboard", "blogs", page], async () =>
    blogsDashboardAPI(page),
  );
}

export function useBlog(id: number) {
  return useCustomQuery(["public", "blog", id], async () => blogAPI(id));
}

export function useDashboardBlog(id: number) {
  return useCustomQuery(["dashboard", "blog", id], async () =>
    blogDashboardAPI(id),
  );
}
