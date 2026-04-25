"use client";

import type { TermsSectionBlock } from "@/types";
import TermsSectionCard from "./TermsSectionCard";

type TermsSectionsGridProps = {
  sections: TermsSectionBlock[];
};

export default function TermsSectionsGrid({
  sections,
}: TermsSectionsGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {sections.map((section) => (
        <TermsSectionCard key={section.key} section={section} />
      ))}
    </div>
  );
}
