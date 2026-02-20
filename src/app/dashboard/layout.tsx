import { Cairo, Cormorant_Garamond } from "next/font/google";
import type { ReactNode } from "react";
import "../globals.css";
import "swiper/css";
import "swiper/css/pagination";
import { Sidebar } from "../../components/dashboard/dashboard/sidebar";

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
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-primary to-emerald-950" />
          </div>
          
          <div className="relative flex min-h-svh">
            <Sidebar />
            {/* Main content - responsive margins */}
            <main className="flex-1 w-full min-w-0 pt-[57px] md:pt-0 md:ml-16 lg:ml-64">
              <div className="max-w-full overflow-x-hidden">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

export default DashboardLayout;