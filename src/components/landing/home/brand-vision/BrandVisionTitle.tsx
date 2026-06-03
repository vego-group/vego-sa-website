import type { ReactElement } from "react";

import type { BrandVisionContent } from "@/types/landing/home";

const titleToneClasses = {
  accent: "text-secondary drop-shadow-[0_0_24px_rgba(0,214,111,0.28)]",
  muted: "text-[#cbd8e7]",
};

type BrandVisionTitleProps = {
  title: BrandVisionContent["title"];
};

function BrandVisionTitle({ title }: BrandVisionTitleProps): ReactElement {
  return (
    <h2 className="text-balance text-4xl font-black leading-tight sm:text-5xl lg:text-[3.45rem]">
      {title.map((part) => (
        <span
          key={part.text}
          className={`${titleToneClasses[part.tone ?? "muted"]} mx-1.5 inline-block`}
        >
          {part.text}
        </span>
      ))}
    </h2>
  );
}

export default BrandVisionTitle;
