import { z } from "zod";

const testDriveGenderValues = ["Male", "Female"] as const;

const testDriveProductValues = [
  "Vego 2030",
  "VG-26",
  "Vego-CEM",
  "VG-20",
  "VR-70",
] as const;

function normalizeSaudiPhone(value: unknown) {
  let digits = String(value ?? "").replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (digits.startsWith("966")) {
    digits = digits.slice(3);
  }

  return `966${digits}`;
}

const testDriveSchema = z.object({
  name: z.string().trim().min(1, "validation.required"),
  email: z
    .string()
    .trim()
    .min(1, "validation.required")
    .email("validation.email"),
  phone_number: z.preprocess(
    normalizeSaudiPhone,
    z.string().min(1, "validation.required").regex(/^9665\d{8}$/, "validation.phone"),
  ),
  age: z.number("validation.required").min(16, "validation.age"),
  gender: z.enum(testDriveGenderValues, "validation.required"),
  time_and_day: z
    .string()
    .trim()
    .min(1, "validation.required")
    .regex(
      /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/,
      "validation.required",
    ),
  product: z.enum(testDriveProductValues, "validation.required"),
});

type TestDriveSchema = z.infer<typeof testDriveSchema>;

export {
  testDriveGenderValues,
  testDriveProductValues,
  testDriveSchema,
  type TestDriveSchema,
};
