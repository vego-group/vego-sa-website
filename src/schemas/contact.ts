import { z } from "zod";

const contactSubjectValues = [
  "general",
  "products",
  "partnership",
  "support",
  "jobs",
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1, "validation.nameRequired"),
  email: z
    .string()
    .trim()
    .min(1, "validation.emailRequired")
    .email("validation.emailInvalid"),
  phone: z.string().trim().min(1, "validation.phoneRequired"),
  subject: z
    .string()
    .trim()
    .min(1, "validation.subjectRequired")
    .refine(
      (value) => contactSubjectValues.includes(value as (typeof contactSubjectValues)[number]),
      "validation.subjectInvalid",
    ),
  message: z.string().trim().min(1, "validation.messageRequired"),
  locale: z.string().trim().min(1, "validation.localeRequired"),
});

type ContactSchema = z.infer<typeof contactSchema>;

export { contactSchema, contactSubjectValues, type ContactSchema };
