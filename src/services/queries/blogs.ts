import { PAGE_SIZE } from "@/constants";
import { baseAPI } from "..";

export const blogsAPI = async (page: number, auth: boolean = false) =>
  await baseAPI("GET", `/blogs?page=${page}&per_page=${PAGE_SIZE}`, auth);
