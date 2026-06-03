import type { ReactElement } from "react";

import type { PreOrderJourneyContent } from "@/types/landing/home";

type PreOrderJourneyTitleProps = {
  title: PreOrderJourneyContent["title"];
};

const titleToneClasses: Record<
  NonNullable<PreOrderJourneyContent["title"][number]["tone"]>,
  string
> = {
  muted: "text-white",
  accent: "text-secondary drop-shadow-[0_0_24px_rgba(0,214,111,0.34)]",
};

function PreOrderJourneyTitle({
  title,
}: PreOrderJourneyTitleProps): ReactElement {
  return (
    <h2 className="mx-auto max-w-5xl text-balance text-center text-4xl font-black leading-[1.25] text-white sm:text-5xl lg:text-6xl">
      {title.map((part) => (
        <span
          key={`${part.text}-${part.tone ?? "muted"}`}
          className={`${titleToneClasses[part.tone ?? "muted"]} ms-2 inline-block first:ms-0`}
        >
          {part.text}
        </span>
      ))}
    </h2>
  );
}

export default PreOrderJourneyTitle;
