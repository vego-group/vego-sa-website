import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/provider";
import { cairo, cormorant, rootMetadata } from "../root-config";
import { GoogleTagManagerNoScript, GoogleTagManagerScript } from "../google-tag-manager";
import "../globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "swiper/css";
import "swiper/css/pagination";

export const metadata = rootMetadata;

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <GoogleTagManagerScript />
      </head>
      <body className={`${cairo.variable} ${cormorant.variable} antialiased`}>
        <GoogleTagManagerNoScript />
        <QueryProvider>
          <Toaster />
          <div className="min-h-svh">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}

export default DashboardLayout;
