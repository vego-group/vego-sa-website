import type { Metadata } from "next";
import CertificateVerification from "./certificate-verification";

export const metadata: Metadata = {
  title: "VEGO-CTO-OWN-20261020-001 · VEGO",
  description: "سجل التحقق من شهادة إثبات ملكية الأصول البرمجية لدى VEGO.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  referrer: "no-referrer",
};

export default function CertificateVerificationPage() {
  return <CertificateVerification />;
}
