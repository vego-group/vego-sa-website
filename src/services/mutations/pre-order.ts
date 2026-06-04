"use server";

import axios, { AxiosError } from "axios";

import {
  type CreatePreOrderPayloadSchema,
  type MoyasarCardTokenPayloadSchema,
  type PayPreOrderPayloadSchema,
} from "@/schemas";
import { safeApi } from "..";
import type {
  MoyasarCardTokenResponse,
  MoyasarErrorResponse,
  PayPreorderApiResponse,
  Preorder,
  PreordersApiResponse,
} from "@/types";
import { MOYASAR_BASE_URL } from "@/constants";

export const createPreorderAPI = async (
  payload: CreatePreOrderPayloadSchema,
) => {
  return await safeApi<PreordersApiResponse | Preorder>(
    "POST",
    `/v1/preorders`,
    payload,
  );
};

export const payPreorderAPI = async (
  preorderId: string,
  payload: PayPreOrderPayloadSchema,
) => {
  return await safeApi<PayPreorderApiResponse>("POST", `/v1/preorders/${preorderId}/pay`, payload);
};

export const createMoyasarCardTokenAPI = async (
  payload: MoyasarCardTokenPayloadSchema,
  publishableKey: string,
) => {
  try {
    const response = await axios.post<MoyasarCardTokenResponse>(
      `${MOYASAR_BASE_URL}/tokens`,
      payload,
      {
        auth: {
          username: publishableKey,
          password: "",
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return {
      ok: true,
      status: response.status,
      data: response.data,
      message: "تم إنشاء رمز البطاقة بنجاح",
    };
  } catch (error) {
    const axiosError = error as AxiosError<MoyasarErrorResponse>;
    const payloadError = axiosError.response?.data;

    return {
      ok: false,
      status: axiosError.response?.status ?? 500,
      error: payloadError,
      message:
        payloadError?.message ?? axiosError.message ?? "فشل إنشاء رمز البطاقة",
    };
  }
};
