import { z } from "zod";

const investmentTicketTypeValues = [
  "150000-200000",
  "250000-350000",
  "350000+",
] as const;

const investmentInterestSchema = z.object({
  full_name: z.string().trim().min(1, "validation.fullNameRequired"),
  phone_number: z
    .string()
    .trim()
    .min(1, "validation.phoneRequired")
    .max(20, "validation.phoneMax"),
  email: z
    .string()
    .trim()
    .refine((value) => !value || z.email().safeParse(value).success, {
      message: "validation.emailInvalid",
    })
    .optional(),
  ticket_type: z
    .string()
    .trim()
    .min(1, "validation.ticketTypeRequired")
    .refine(
      (value) =>
        investmentTicketTypeValues.includes(
          value as (typeof investmentTicketTypeValues)[number],
        ),
      "validation.ticketTypeInvalid",
    ),
});

type InvestmentInterestSchema = z.infer<typeof investmentInterestSchema>;

export {
  investmentInterestSchema,
  investmentTicketTypeValues,
  type InvestmentInterestSchema,
};
