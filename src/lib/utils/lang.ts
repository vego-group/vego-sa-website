"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale(): Promise<string> {
  const locale = await getLocale();
  return locale;
}
