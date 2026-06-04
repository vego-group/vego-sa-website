import { baseAPI } from "..";

export const getPreorderAPI = async (preorderId: string) =>
  await baseAPI("GET", `/v1/preorders/${preorderId}`);

export const lookupPreorderAPI = async (phone: string) =>
  await baseAPI(
    "GET",
    phone ? `/v1/preorders/lookup?phone=${phone}` : `/v1/preorders/lookup`,
  );
