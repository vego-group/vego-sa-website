import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const acceptedFileTypes = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
] as const;

const billingTypeValues = ["prepaid", "postpaid"] as const;

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

const fileValidator = z
  .instanceof(File, { message: "validation.fileRequired" })
  .refine((file) => file.size <= MAX_FILE_SIZE, "validation.fileTooLarge")
  .refine(
    (file) =>
      acceptedFileTypes.includes(file.type as (typeof acceptedFileTypes)[number]),
    "validation.fileInvalidType",
  );

const companiesRegisterSchema = z.object({
  // Required fields
  company_name: z
    .string()
    .trim()
    .min(2, "validation.companyNameMin")
    .max(150, "validation.companyNameMax"),

  contact_person_name: z
    .string()
    .trim()
    .min(2, "validation.contactPersonNameMin")
    .max(100, "validation.contactPersonNameMax"),

  contact_phone: z
    .string()
    .trim()
    .min(1, "validation.required")
    .regex(/^9665\d{8}$/, "validation.phone"),

  contact_email: z
    .string()
    .trim()
    .min(1, "validation.emailRequired")
    .email("validation.emailInvalid"),

  commercial_reg_no: z
    .string()
    .trim()
    .min(1, "validation.required")
    .regex(/^\d{10}$/, "validation.commercialRegNoInvalid"),

  commercial_reg_file: fileValidator,

  // Optional fields
  commercial_license_file: fileValidator.optional(),
  sales_contract_file: fileValidator.optional(),

  address: z.string().trim().max(255, "validation.addressMax").optional(),
  city: z.string().trim().max(100, "validation.cityMax").optional(),
  region: z.string().trim().max(100, "validation.regionMax").optional(),
  tax_id: z
    .string()
    .trim()
    .regex(/^\d{15}$/, "validation.taxIdInvalid")
    .optional()
    .or(z.literal("")),

  max_motorcycles: z
    .number("validation.mustBeNumber")
    .int("validation.mustBeInteger")
    .min(0, "validation.mustBePositive")
    .optional(),

  max_drivers: z
    .number("validation.mustBeNumber")
    .int("validation.mustBeInteger")
    .min(0, "validation.mustBePositive")
    .optional(),

  billing_type: z.enum(billingTypeValues, "validation.billingTypeInvalid").optional(),
});

type CompaniesRegisterSchema = z.infer<typeof companiesRegisterSchema>;

export {
  acceptedFileTypes,
  billingTypeValues,
  companiesRegisterSchema,
  normalizeSaudiPhone,
  type CompaniesRegisterSchema,
};