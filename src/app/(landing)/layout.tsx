import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import QueryProvider from "@/provider";
import { cairo, cormorant, rootMetadata } from "../root-config";
import "../globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "swiper/css";
import "swiper/css/pagination";

export const metadata = {
  ...rootMetadata,
  openGraph: {
    ...rootMetadata.openGraph,
    locale: "ar_AR",
  },
};

type LandingLayoutProps = {
  children: ReactNode;
};

function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} ${cormorant.variable} bg-linear-to-br from-primary via-primary to-secondary antialiased`}
      >
        <QueryProvider>
          <Toaster />
          <div className="min-h-svh bg-linear-to-br from-emerald-950 via-primary to-emerald-950">
            <Navbar />
            {children}
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}

export default LandingLayout;
