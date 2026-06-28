"use server";

import type { InvestmentInterestPayload } from "@/interfaces";
import { safeApi } from "..";

export const investmentInterestAPI = async (
  payload: InvestmentInterestPayload,
) => await safeApi("POST", "/investment-requests", payload);

export const deleteInvestmentInterestAPI = async (id: number | string) =>
  await safeApi("DELETE", `/investment-requests/${id}`);
