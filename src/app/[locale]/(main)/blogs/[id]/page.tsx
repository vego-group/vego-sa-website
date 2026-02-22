import BlogDetailPage from "@/components/main/blogs/blog-detail-page";

interface BlogDetailPageProps {
  params: {
    id: string;
    locale: string;
  };
}

export default function Page({ params }: BlogDetailPageProps) {
  return <BlogDetailPage />;
}