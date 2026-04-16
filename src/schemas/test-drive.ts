import { z } from "zod";

const testDriveGenderValues = ["male", "female"] as const;

const testDriveProductValues = [
  "vego-2030",
  "vg-26",
  "vego-cem",
  "vg-20",
  "vr-70",
] as const;

const testDriveSchema = z.object({
  name: z.string().trim().min(1, "validation.required"),
  email: z
    .string()
    .trim()
    .min(1, "validation.required")
    .email("validation.email"),
  phone: z
    .string()
    .trim()
    .min(1, "validation.required")
    .regex(/^[0-9\s-]{8,20}$/, "validation.phone"),
  age: z
    .string()
    .trim()
    .min(1, "validation.required")
    .refine((value) => Number(value) >= 18, "validation.age"),
  gender: z
    .string()
    .trim()
    .min(1, "validation.required")
    .refine(
      (value) =>
        testDriveGenderValues.includes(
          value as (typeof testDriveGenderValues)[number],
        ),
      "validation.required",
    ),
  date: z.string().trim().min(1, "validation.required"),
  time: z.string().trim().min(1, "validation.required"),
  product: z
    .string()
    .trim()
    .min(1, "validation.required")
    .refine(
      (value) =>
        testDriveProductValues.includes(
          value as (typeof testDriveProductValues)[number],
        ),
      "validation.required",
    ),
});

type TestDriveSchema = z.infer<typeof testDriveSchema>;

export {
  testDriveGenderValues,
  testDriveProductValues,
  testDriveSchema,
  type TestDriveSchema,
};
