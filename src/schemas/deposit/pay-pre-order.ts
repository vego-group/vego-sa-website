import { z } from "zod";

const validationMessages = {
  cardHolderNameRequired: "اسم حامل البطاقة مطلوب",
  cardNumberRequired: "رقم البطاقة مطلوب",
  cardNumberInvalid: "رقم البطاقة غير صحيح",
  expiryDateRequired: "تاريخ الانتهاء مطلوب",
  expiryDateInvalid: "تاريخ الانتهاء غير صحيح",
  expiryDateExpired: "البطاقة منتهية الصلاحية",
  cvvRequired: "رمز التحقق مطلوب",
  cvvInvalid: "رمز التحقق غير صحيح",
  cardTokenRequired: "رمز البطاقة مطلوب",
};

function onlyDigits(value: unknown): string {
  return String(value ?? "").replace(/\D/g, "");
}

function parseExpiryDate(value: string): { month: string; year: string } | null {
  const match = value.trim().match(/^(\d{2})\s*\/\s*(\d{2}|\d{4})$/);

  if (!match) {
    return null;
  }

  const [, month, rawYear] = match;
  const year = rawYear.length === 2 ? `20${rawYear}` : rawYear;

  return { month, year };
}

function isFutureExpiry(value: string): boolean {
  const expiry = parseExpiryDate(value);

  if (!expiry) {
    return false;
  }

  const month = Number(expiry.month);
  const year = Number(expiry.year);

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return false;
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  return year > currentYear || (year === currentYear && month >= currentMonth);
}

const payPreOrderFormSchema = z.object({
  cardHolderName: z
    .string()
    .trim()
    .min(1, validationMessages.cardHolderNameRequired),
  cardNumber: z.preprocess(
    onlyDigits,
    z
      .string()
      .min(1, validationMessages.cardNumberRequired)
      .regex(/^\d{13,19}$/, validationMessages.cardNumberInvalid),
  ),
  expiryDate: z
    .string()
    .trim()
    .min(1, validationMessages.expiryDateRequired)
    .regex(/^\d{2}\s*\/\s*(\d{2}|\d{4})$/, validationMessages.expiryDateInvalid)
    .refine(isFutureExpiry, validationMessages.expiryDateExpired),
  cvv: z.preprocess(
    onlyDigits,
    z
      .string()
      .min(1, validationMessages.cvvRequired)
      .regex(/^\d{3,4}$/, validationMessages.cvvInvalid),
  ),
});

const moyasarCardTokenPayloadSchema = z.object({
  name: z.string().trim().min(1, validationMessages.cardHolderNameRequired),
  number: z
    .string()
    .trim()
    .regex(/^\d{13,19}$/, validationMessages.cardNumberInvalid),
  month: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])$/, validationMessages.expiryDateInvalid),
  year: z
    .string()
    .trim()
    .regex(/^\d{4}$/, validationMessages.expiryDateInvalid),
  cvc: z.string().trim().regex(/^\d{3,4}$/, validationMessages.cvvInvalid),
  callback_url: z.string().trim().url().optional(),
});

const payPreOrderPayloadSchema = z.object({
  card_token: z.string().trim().min(1, validationMessages.cardTokenRequired),
});

type PayPreOrderFormSchema = z.infer<typeof payPreOrderFormSchema>;
type PayPreOrderFormInput = z.input<typeof payPreOrderFormSchema>;
type MoyasarCardTokenPayloadSchema = z.infer<
  typeof moyasarCardTokenPayloadSchema
>;
type PayPreOrderPayloadSchema = z.infer<typeof payPreOrderPayloadSchema>;

function buildMoyasarCardTokenPayload(
  values: PayPreOrderFormSchema,
  callbackUrl?: string,
): MoyasarCardTokenPayloadSchema {
  const expiry = parseExpiryDate(values.expiryDate);

  if (!expiry) {
    throw new Error(validationMessages.expiryDateInvalid);
  }

  return moyasarCardTokenPayloadSchema.parse({
    name: values.cardHolderName,
    number: values.cardNumber,
    month: expiry.month,
    year: expiry.year,
    cvc: values.cvv,
    callback_url: callbackUrl,
  });
}

export {
  buildMoyasarCardTokenPayload,
  moyasarCardTokenPayloadSchema,
  payPreOrderFormSchema,
  payPreOrderPayloadSchema,
  type MoyasarCardTokenPayloadSchema,
  type PayPreOrderFormInput,
  type PayPreOrderFormSchema,
  type PayPreOrderPayloadSchema,
};
