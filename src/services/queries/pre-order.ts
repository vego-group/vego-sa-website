import { baseAPI } from "..";
import type { PreordersApiResponse } from "@/types/landing/deposit";

export const preordersAPI = async (
  preorderId: string,
): Promise<PreordersApiResponse> =>
  await baseAPI("GET", `/v1/preorders/${preorderId}/products`);
