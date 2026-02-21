import { Cairo, Cormorant_Garamond } from "next/font/google";
import type { ReactNode } from "react";
import "../globals.css";
import "swiper/css";
import "swiper/css/pagination";
import { Sidebar } from "../../components/dashboard/dashboard/sidebar"; // هذا المسار صحيح

type DashboardLayoutProps = {
  children: ReactNode;
};

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${cairo.variable} ${cormorant.variable} antialiased`}>
        <div className="relative min-h-svh bg-primary">
          {/* Background Gradient */}
          <div className="pointer-events-none fixed inset-0">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-950 via-primary to-emerald-950" />
          </div>

          <div className="relative flex min-h-svh">
            <Sidebar />
            <div className="flex-1 ml-64">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default DashboardLayout;
