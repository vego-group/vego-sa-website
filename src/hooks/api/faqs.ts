import { faqAPI, faqsAPI } from "@/services/queries/faq";
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

export function useDashboardFaqs(page: number) {
  return useCustomQuery(["dashboard", "faqs", page], async () =>
    faqsAPI(page, true),
  );
}

export function useFaq(id: number, auth: boolean = false) {
  return useCustomQuery(["faq", id], async () => faqAPI(id, auth));
}
