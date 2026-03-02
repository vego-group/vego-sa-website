import { z } from "zod";

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} is required`);

const addBlogSchema = z.object({
  title_en: requiredText("English title"),
  title_ar: requiredText("Arabic title"),
  excerpt_en: requiredText("English excerpt"),
  excerpt_ar: requiredText("Arabic excerpt"),
  content_en: requiredText("English content"),
  content_ar: requiredText("Arabic content"),
  meta_title_en: requiredText("English meta title"),
  meta_title_ar: requiredText("Arabic meta title"),
  meta_description_en: requiredText("English meta description"),
  meta_description_ar: requiredText("Arabic meta description"),
  status: z.enum(["draft", "publish"]),
  cover_image: z
    .any()
    .refine(
      (files) =>
        files &&
        typeof files === "object" &&
        "length" in files &&
        Number(files.length) > 0,
      "Cover image is required",
    ),
});

const editBlogSchema = addBlogSchema.extend({
  cover_image: z.any().optional(),
});

type AddBlogSchema = z.infer<typeof addBlogSchema>;
type EditBlogSchema = z.infer<typeof editBlogSchema>;

export { addBlogSchema, editBlogSchema, type AddBlogSchema, type EditBlogSchema };
