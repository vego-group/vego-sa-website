import { PAGE_SIZE } from "@/constants";
import { baseAPI } from "..";

export const faqsDashboardAPI = async (page: number) =>
  await baseAPI("GET", `/faqs?page=${page}&per_page=${PAGE_SIZE}`, true);

export const faqAPI = async (id: number) =>
  await baseAPI("GET", `/faqs/${id}`, false);

export const faqsAPI = async (page: number) =>
  await baseAPI(
    "GET",
    `/faqs/with-language?page=${page}&per_page=${PAGE_SIZE}`,
    false,
  );
