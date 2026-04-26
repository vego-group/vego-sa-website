"use server";

import { safeApi } from "..";

export const registerCompanyAPI = async (payload: FormData) =>
  await safeApi("POST", "/companies/register", payload, { isForm: true });