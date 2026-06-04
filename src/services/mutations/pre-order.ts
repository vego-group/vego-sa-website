"use server";

import { type CreatePreOrderPayloadSchema } from "@/schemas";
import { safeApi } from "..";
import type { PreordersApiResponse } from "@/types";

export const createPreorderAPI = async (
  payload: CreatePreOrderPayloadSchema,
) => {
  return await safeApi<PreordersApiResponse>("POST", `/v1/preorders`, payload);
};
