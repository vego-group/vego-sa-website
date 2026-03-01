import { PAGE_SIZE } from "@/constants";
import { baseAPI } from "..";

export const blogsDashboardAPI = async (page: number) =>
  await baseAPI("GET", `/blogs?page=${page}&per_page=${PAGE_SIZE}`, true);

export const blogsAPI = async (page: number) =>
  await baseAPI(
    "GET",
    `/blogs/with-language?page=${page}&per_page=${PAGE_SIZE}`,
  );

export const blogDashboardAPI = async (id: number) =>
  await baseAPI("GET", `/blogs/${id}`, true);

export const blogAPI = async (id: number) =>
  await baseAPI("GET", `/blogs/${id}/with-language`);
