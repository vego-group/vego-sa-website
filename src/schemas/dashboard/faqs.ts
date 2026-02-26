import { z } from "zod";

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} is required`);

const numberFromForm = <T extends z.ZodTypeAny>(label: string, schema: T) =>
  z.preprocess((value) => {
    if (value === "" || value === null || value === undefined) {
      return undefined;
    }

    const parsed =
      typeof value === "number" ? value : Number(String(value).trim());

    return Number.isNaN(parsed) ? undefined : parsed;
  }, schema);

const baseFaqSchema = z.object({
  question_en: requiredText("English question"),
  question_ar: requiredText("Arabic question"),
  answer_en: requiredText("English answer"),
  answer_ar: requiredText("Arabic answer"),
  display_order: numberFromForm(
    "Display order",
    z
      .number({ error: "Display order is required" })
      .int()
      .min(1, "Display order must be at least 1"),
  ),
  is_active: numberFromForm(
    "Status",
    z.number({ error: "Status is required" }).int().min(0).max(1),
  ),
});

const addFaqSchema = baseFaqSchema;
const editFaqSchema = baseFaqSchema;

type AddFaqFormValues = z.input<typeof addFaqSchema>;
type EditFaqFormValues = z.input<typeof editFaqSchema>;
type AddFaqSchema = z.output<typeof addFaqSchema>;
type EditFaqSchema = z.output<typeof editFaqSchema>;

export {
  addFaqSchema,
  editFaqSchema,
  type AddFaqFormValues,
  type EditFaqFormValues,
  type AddFaqSchema,
  type EditFaqSchema,
};
