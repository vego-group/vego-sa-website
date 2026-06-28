import { SidebarNavLink } from "@/interfaces";
import {
  LayoutDashboard,
  FileText,
  HelpCircle,
  Car,
  ChartNoAxesCombined,
  Mail,
  ShoppingCart,
} from "lucide-react";

export const sidebarNavItems: SidebarNavLink[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "blogs", label: "Blogs", icon: FileText, path: "/dashboard/blogs" },
  { id: "faqs", label: "FAQs", icon: HelpCircle, path: "/dashboard/faqs" },
  {
    id: "test-drive",
    label: "Test Drive",
    icon: Car,
    path: "/dashboard/test-drive",
  },
  {
    id: "leads",
    label: "Contact Leads",
    icon: Mail,
    path: "/dashboard/leads",
  },
  {
    id: "pre-orders",
    label: "Pre Orders",
    icon: ShoppingCart,
    path: "/dashboard/pre-orders",
  },
  {
    id: "investment-interests",
    label: "Investment Interests",
    icon: ChartNoAxesCombined,
    path: "/dashboard/investment-interests",
  },
];
