import type { ReactElement } from "react";

import type { PreOrderBenefitsContent } from "@/types/landing/home";

type PreOrderBenefitsTitleProps = {
  title: PreOrderBenefitsContent["title"];
};

const titleToneClasses: Record<
  NonNullable<PreOrderBenefitsContent["title"][number]["tone"]>,
  string
> = {
  muted: "text-white",
  accent: "text-secondary drop-shadow-[0_0_24px_rgba(0,214,111,0.34)]",
};

function PreOrderBenefitsTitle({
  title,
}: PreOrderBenefitsTitleProps): ReactElement {
  return (
    <h2 className="mx-auto max-w-5xl text-balance text-center text-4xl font-black leading-[1.25] text-white sm:text-5xl lg:text-6xl">
      {title.map((part) => (
        <span
          key={`${part.text}-${part.tone ?? "default"}`}
          className={`${titleToneClasses[part.tone ?? "muted"]} ms-2 inline-block first:ms-0`}
        >
          {part.text}
        </span>
      ))}
    </h2>
  );
}

export default PreOrderBenefitsTitle;
