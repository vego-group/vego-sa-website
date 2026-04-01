"use client";

import type { CookiesPolicySection } from "@/interfaces/site/main/cookie-policy";
import CookiesPolicySectionCard from "./CookiesPolicySectionCard";

type CookiesPolicySectionsProps = {
  sections: CookiesPolicySection[];
};

export default function CookiesPolicySections({
  sections,
}: CookiesPolicySectionsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {sections.map((section) => (
        <CookiesPolicySectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}
