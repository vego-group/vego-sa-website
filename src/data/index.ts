export * from "./animation";
export * from "./variants";
export * from "./navbar";
export * from "./commitment-to-excellence";
export * from "./main/index";

// أضف هذا الكود في نهاية الملف
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "news.erp.title",
    summary: "news.erp.summary",
    image: "/images/news/erp.jpg"
  },
  {
    id: "2",
    title: "news.cloud.title",
    summary: "news.cloud.summary",
    image: "/images/news/cloud.jpg"
  },
  {
    id: "3",
    title: "news.implementation.title",
    summary: "news.implementation.summary",
    image: "/images/news/implementation.jpg"
  },
];