import { BlogDetailPage } from "@/components/site/main/blogs";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogDetailPage id={id} />;
}
