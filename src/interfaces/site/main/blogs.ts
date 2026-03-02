export interface BlogGuest {
  content: string;
  cover_image: string | null;
  created_at: string;
  excerpt: string;
  id: number;
  meta_description: string | null;
  meta_title: string | null;
  title: string;
  updated_at: string;
}
