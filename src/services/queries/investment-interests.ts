import { PAGE_SIZE } from "@/constants";
import { baseAPI } from "..";

export const investmentInterestsAPI = async (page: number) =>
  await baseAPI(
    "GET",
    `/investment-requests?page=${page}&per_page=${PAGE_SIZE}`,
    true,
  );
