import { faqAPI, faqsAPI, faqsDashboardAPI } from "@/services/queries/faq";
import { useCustomInfiniteQuery, useCustomQuery } from "../useCustomQuery";

export function useFaqs() {
  return useCustomInfiniteQuery(
    ["public", "faqs"],
    async ({ pageParam = 1 }) => {
      return faqsAPI(pageParam);
    },
    {
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const meta = lastPage?.meta;
        const nextLink = lastPage?.links?.next;

        if (!meta || !nextLink) {
          return undefined;
        }

        if (meta.current_page < meta.last_page) {
          return meta.current_page + 1;
        }

        return undefined;
      },
    },
  );
}

export function useDashboardFaqs(page: number) {
  return useCustomQuery(["dashboard", "faqs", page], async () =>
    faqsDashboardAPI(page),
  );
}

export function useFaq(id: number) {
  return useCustomQuery(["faq", id], async () => faqAPI(id));
}
