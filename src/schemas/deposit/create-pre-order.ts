import { z } from "zod";

const validationMessages = {
  fullNameRequired: "الاسم الكامل مطلوب",
  phoneRequired: "رقم الجوال مطلوب",
  phoneInvalid: "رقم الجوال غير صحيح",
  emailRequired: "البريد الإلكتروني مطلوب",
  emailInvalid: "البريد الإلكتروني غير صحيح",
  cityRequired: "المدينة مطلوبة",
  productNameRequired: "اسم المنتج مطلوب",
};

function normalizeSaudiPhone(value: unknown) {
  let digits = String(value ?? "").replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (digits.startsWith("966")) {
    digits = digits.slice(3);
  }

  return `966${digits}`;
}

const saudiPhoneSchema = z.preprocess(
  normalizeSaudiPhone,
  z
    .string()
    .min(1, validationMessages.phoneRequired)
    .regex(/^9665\d{8}$/, validationMessages.phoneInvalid),
);

const createPreOrderFormSchema = z.object({
  fullName: z.string().trim().min(1, validationMessages.fullNameRequired),
  phone: saudiPhoneSchema,
  email: z
    .string()
    .trim()
    .min(1, validationMessages.emailRequired)
    .email(validationMessages.emailInvalid),
  city: z.string().trim().min(1, validationMessages.cityRequired),
});

const createPreOrderPayloadSchema = z.object({
  customer_name: z.string().trim().min(1, validationMessages.fullNameRequired),
  phone: saudiPhoneSchema,
  email: z
    .string()
    .trim()
    .min(1, validationMessages.emailRequired)
    .email(validationMessages.emailInvalid),
  city: z.string().trim().min(1, validationMessages.cityRequired),
  product_name: z.string().trim().min(1, validationMessages.productNameRequired),
});

type CreatePreOrderFormSchema = z.infer<typeof createPreOrderFormSchema>;
type CreatePreOrderFormInput = z.input<typeof createPreOrderFormSchema>;
type CreatePreOrderPayloadSchema = z.infer<typeof createPreOrderPayloadSchema>;

export {
  createPreOrderFormSchema,
  createPreOrderPayloadSchema,
  type CreatePreOrderFormInput,
  type CreatePreOrderFormSchema,
  type CreatePreOrderPayloadSchema,
};
