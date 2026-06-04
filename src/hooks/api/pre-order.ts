import { getPreorderAPI, lookupPreorderAPI } from "@/services/queries";
import { useCustomQuery } from "../useCustomQuery";

export function usePreorder(preorderId: string) {
  return useCustomQuery(
    ["preorder", preorderId],
    async () => getPreorderAPI(preorderId),
    { enabled: !!preorderId },
  );
}

export function usePreorderLookup(phone: string) {
  return useCustomQuery(
    ["preorder-lookup", phone],
    async () => lookupPreorderAPI(phone),
    { enabled: !!phone },
  );
}
