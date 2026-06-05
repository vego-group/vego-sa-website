import { PAGE_SIZE } from "@/constants";
import { baseAPI } from "..";
import type { PreOrdersFilters } from "@/types/dashboard/pre-orders";

export const preOrdersAPI = async (
  page: number,
  filters?: PreOrdersFilters,
) => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("per_page", String(PAGE_SIZE));

  if (filters?.status) params.set("status", filters.status);
  if (filters?.payment_status)
    params.set("payment_status", filters.payment_status);
  if (filters?.from_date) params.set("from_date", filters.from_date);
  if (filters?.to_date) params.set("to_date", filters.to_date);
  if (filters?.sort) params.set("sort", filters.sort);

  return await baseAPI("GET", `/v1/preorders?${params.toString()}`, true);
};
