import { z } from "zod";

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} is required`);

const baseFaqSchema = z.object({
  question_en: requiredText("English question"),
  question_ar: requiredText("Arabic question"),
  answer_en: requiredText("English answer"),
  answer_ar: requiredText("Arabic answer"),
  order: z.number().int().min(1, "Display order must be at least 1"),
  status: z.enum(["draft", "publish"]),
});

const addFaqSchema = baseFaqSchema;
const editFaqSchema = baseFaqSchema;

type AddFaqSchema = z.infer<typeof addFaqSchema>;
type EditFaqSchema = z.infer<typeof editFaqSchema>;

export { addFaqSchema, editFaqSchema, type AddFaqSchema, type EditFaqSchema };
