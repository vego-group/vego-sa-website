"use server";

import type { ContactSchema } from "@/schemas";
import { safeApi } from "..";

export const contactAPI = async (payload: ContactSchema) =>
  await safeApi("POST", "/contact", payload);
