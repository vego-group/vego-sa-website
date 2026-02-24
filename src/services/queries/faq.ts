import { PAGE_SIZE } from "@/constants";
import { baseAPI } from "..";

export const faqsAPI = async (page: number, auth: boolean = false) =>
  await baseAPI("GET", `/faqs?page=${page}&per_page=${PAGE_SIZE}`, auth);
