import type { ReactElement } from "react";

import type { OwnersContent } from "@/types/landing/home";

type OwnersTitleProps = {
  title: OwnersContent["title"];
};

const titleToneClasses: Record<
  NonNullable<OwnersContent["title"][number]["tone"]>,
  string
> = {
  muted: "text-[#cbd8e7]",
  accent: "text-secondary drop-shadow-[0_0_24px_rgba(0,214,111,0.22)]",
};

function OwnersTitle({ title }: OwnersTitleProps): ReactElement {
  return (
    <h2 className="text-balance text-center text-4xl font-black leading-tight sm:text-5xl lg:text-[3.45rem]">
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

export default OwnersTitle;
