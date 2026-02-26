import { PAGE_SIZE } from "@/constants";
import { baseAPI } from "..";

export const contactsAPI = async (page: number) =>
  await baseAPI("GET", `/contacts?page=${page}&per_page=${PAGE_SIZE}`, true);
