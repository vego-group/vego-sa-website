export type FaqsTableProps = {
  activeTab?: "all" | "published" | "drafts";
  searchQuery?: string;
};

export type FaqApiItem = {
  id: number | string;
  display_order?: number;
  order?: number;
  sort_order?: number;
  question_en?: string;
  question_ar?: string;
  answer_en?: string;
  answer_ar?: string;
  is_active?: number | boolean | string | null;
  status?: string;
  published_at?: string | null;
};
