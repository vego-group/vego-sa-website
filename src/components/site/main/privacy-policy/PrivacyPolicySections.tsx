import type { PrivacyPolicySection } from "@/types";
import PrivacyPolicySectionCard from "./PrivacyPolicySectionCard";

type PrivacyPolicySectionsProps = {
  sections: PrivacyPolicySection[];
};

function isFeatured(section: PrivacyPolicySection) {
  return section.items && section.items.length >= 4;
}

export default function PrivacyPolicySections({
  sections,
}: PrivacyPolicySectionsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {sections.map((section) => (
        <div
          key={section.id}
          className={isFeatured(section) ? "lg:col-span-2" : ""}
        >
          <PrivacyPolicySectionCard section={section} />
        </div>
      ))}
    </div>
  );
}
