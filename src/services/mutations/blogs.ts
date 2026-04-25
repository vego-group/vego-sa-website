"use server";

import { safeApi } from "..";

export const addBlogAPI = async (payload: FormData) =>
  await safeApi("POST", "/blogs", payload, { isForm: true });

export const updateBlogAPI = async (payload: FormData, id: number) =>
  await safeApi("POST", `/blogs/${id}`, payload, { isForm: true });

export const deleteBlogAPI = async (id: number) =>
  await safeApi("DELETE", `/blogs/${id}`);
