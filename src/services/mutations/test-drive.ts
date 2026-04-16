"use server";

import { testDriveSchema, type TestDriveSchema } from "@/schemas";
import { safeApi } from "..";

export const addTestDriveRegistrationAPI = async (payload: TestDriveSchema) => {
  const parsedPayload = testDriveSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const message =
      parsedPayload.error.issues[0]?.message ?? "Invalid test drive payload";

    return {
      ok: false,
      status: 422,
      message,
      error: parsedPayload.error.flatten(),
    };
  }

  return await safeApi(
    "POST",
    "/test-drive-registrations",
    parsedPayload.data,
  );
};
