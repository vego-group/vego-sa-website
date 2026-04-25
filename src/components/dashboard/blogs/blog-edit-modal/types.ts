import { Blog } from "@/interfaces/dashboard/blogs";
import type { EditBlogSchema } from "@/schemas";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type ActiveLanguage = "en" | "ar";

type BlogEditorPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  id: number;
};

type LanguageSectionProps = {
  blog?: Blog;
  activeLanguage: ActiveLanguage;
  register?: UseFormRegister<EditBlogSchema>;
  errors?: FieldErrors<EditBlogSchema>;
};

type PublishSettingsSectionFormProps = {
  register?: UseFormRegister<EditBlogSchema>;
  errors?: FieldErrors<EditBlogSchema>;
  defaultStatus?: string | null;
  createdAtValue?: string;
  onCreatedAtChange?: (value: string) => void;
};

export type {
  ActiveLanguage,
  BlogEditorPopupProps,
  LanguageSectionProps,
  PublishSettingsSectionFormProps,
};
