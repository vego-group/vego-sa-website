import { SidebarNavLink } from "@/interfaces";

export const sidebarNavItems: SidebarNavLink[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", path: "/dashboard" },
  { id: "blogs", label: "Blogs", icon: "📝", path: "/dashboard/blogs" },
  { id: "faqs", label: "FAQs", icon: "❓", path: "/dashboard/faqs" },
  {
    id: "leads",
    label: "Contact Leads",
    icon: "✉️",
    path: "/dashboard/leads",
  },
];
