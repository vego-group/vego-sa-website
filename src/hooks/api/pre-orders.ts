import { preOrdersAPI } from "@/services/queries/pre-orders";
import { useCustomQuery, useCustomInfiniteQuery } from "../useCustomQuery";
import type { PreOrdersFilters } from "@/types/dashboard/pre-orders";

export function usePreOrders(page: number, filters?: PreOrdersFilters) {
  return useCustomQuery(["pre-orders", page, filters], async () =>
    preOrdersAPI(page, filters),
  );
}

export function usePreOrdersInfinite(filters?: PreOrdersFilters) {
  return useCustomInfiniteQuery(
    ["pre-orders-infinite", filters],
    async ({ pageParam = 1 }) => preOrdersAPI(pageParam, filters),
    {
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const meta = (lastPage as { meta?: { current_page: number; last_page: number } })?.meta;
        const nextLink = (lastPage as { links?: { next: string | null } })?.links?.next;

        if (!meta || !nextLink) return undefined;
        if (meta.current_page < meta.last_page) return meta.current_page + 1;
        return undefined;
      },
    },
  );
}
