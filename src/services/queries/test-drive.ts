import { PAGE_SIZE } from "@/constants";
import { baseAPI } from "..";

export const testDriveRegistrationsAPI = async (page: number) =>
  await baseAPI(
    "GET",
    `/test-drive-registrations?page=${page}&per_page=${PAGE_SIZE}`,
    true,
  );
