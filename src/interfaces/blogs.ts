import { Lang } from ".";

export type Blog = {
  id: number | string;
  title?: Lang | null;
  excerpt?: Lang | null;
  content?: Lang | null;
  meta_title?: Lang | null;
  meta_description?: Lang | null;
  status?: string | null;
  cover_image?: string | null;
  published_at?: string | null;
  created_at?: string | null;
};
