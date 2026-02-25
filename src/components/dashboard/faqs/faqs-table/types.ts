export type FaqsTableProps = {
  activeTab?: "all" | "published" | "drafts";
  searchQuery?: string;
};

export type FaqApiItem = {
  id: number | string;
  order?: number;
  sort_order?: number;
  question_en?: string;
  question_ar?: string;
  answer_en?: string;
  answer_ar?: string;
  status?: string;
  published_at?: string | null;
};
