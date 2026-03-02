"use server";

import { AddFaqSchema, EditFaqSchema } from "@/schemas";
import { safeApi } from "..";

export const addFaqAPI = async (payload: AddFaqSchema) =>
  await safeApi("POST", "/faqs", payload);

export const updateFaqAPI = async (payload: EditFaqSchema, id: number) =>
  await safeApi("PUT", `/faqs/${id}`, payload);

export const deleteFaqAPI = async (id: number) =>
  await safeApi("DELETE", `/faqs/${id}`);
