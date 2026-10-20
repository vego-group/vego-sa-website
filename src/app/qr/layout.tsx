import type { ReactNode } from "react";
import { cairo } from "../root-config";
import "../globals.css";

type QrLayoutProps = {
  children: ReactNode;
};

export default function QrLayout({ children }: QrLayoutProps) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cairo.variable}>{children}</body>
    </html>
  );
}
