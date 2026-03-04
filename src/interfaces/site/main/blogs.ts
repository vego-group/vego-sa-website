export interface BlogGuest {
  content: string;
  cover_image: string | null;
  created_at: string;
  excerpt: string;
  id: number;
  meta_description: string | null;
  meta_title: string | null;
  title: string;
  recommended_blogs: RecommendedBlog[];
  updated_at: string;
}

export interface RecommendedBlog {
  id: number;
  title: string;
  excerpt: string;
  cover_image: string;
}
