import { blogAPI, blogsAPI } from "@/services/queries/blogs";
import { useCustomInfiniteQuery, useCustomQuery } from "../useCustomQuery";

export function useBlogs() {
  return useCustomInfiniteQuery(
    ["blogs"],
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
  return useCustomQuery(["blogs", page], async () => blogsAPI(page, true));
}

export function useBlog(id: string, auth: boolean = false) {
  return useCustomQuery(["blog", id], async () => blogAPI(id, auth));
}
