import { testDriveRegistrationsAPI } from "@/services/queries";
import { useCustomInfiniteQuery, useCustomQuery } from "../useCustomQuery";

export function useDashboardTestDriveRegistrations(page: number) {
  return useCustomQuery(["test-drive-registrations", page], async () =>
    testDriveRegistrationsAPI(page),
  );
}

export function useTestDriveRegistrations() {
  return useCustomInfiniteQuery(
    ["test-drive-registrations"],
    async ({ pageParam = 1 }) => {
      return testDriveRegistrationsAPI(pageParam);
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
