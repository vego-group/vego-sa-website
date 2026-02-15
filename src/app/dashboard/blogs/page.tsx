// src/app/dashboard/blogs/page.tsx
"use client";

import { DashboardShell } from "@/components/dashboard/dashboard/dashboard-shell";
import { BlogsContent } from "@/components/dashboard/blogs/blogs-content";

function BlogsPage() {
  return (
    <DashboardShell>
      <BlogsContent />
    </DashboardShell>
  );
}

export default BlogsPage;