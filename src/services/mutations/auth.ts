import { LoginSchema } from "@/schemas";
import { safeApi } from "..";
import { AuthResponse } from "@/types";

export const loginAPI = async (payload: LoginSchema) =>
  await safeApi<AuthResponse>("POST", "/login", payload);

export const logoutAPI = async () => await safeApi("POST", "/logout");
