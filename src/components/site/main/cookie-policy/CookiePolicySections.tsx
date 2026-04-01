"use client";

import type { CookiePolicySection } from "@/interfaces/site/main/cookie-policy";
import CookiePolicySectionCard from "./CookiePolicySectionCard";

type CookiePolicySectionsProps = {
  sections: CookiePolicySection[];
};

export default function CookiePolicySections({
  sections,
}: CookiePolicySectionsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {sections.map((section) => (
        <CookiePolicySectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}
