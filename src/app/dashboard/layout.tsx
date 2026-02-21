import { Cairo, Cormorant_Garamond } from "next/font/google";
import type { ReactNode } from "react";
import "../globals.css";
import "swiper/css";
import "swiper/css/pagination";

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
          <div className="min-h-svh">{children}</div>
        </div>
      </body>
    </html>
  );
}

export default DashboardLayout;
