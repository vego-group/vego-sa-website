import type { ReactElement } from "react";

import type { ImmersiveTechnologyContent } from "@/types/landing/home";

type ImmersiveTechnologyTitleProps = {
  title: ImmersiveTechnologyContent["title"];
};

const titleToneClasses: Record<
  NonNullable<ImmersiveTechnologyContent["title"][number]["tone"]>,
  string
> = {
  muted: "text-white",
  accent: "text-secondary drop-shadow-[0_0_24px_rgba(0,214,111,0.38)]",
};

function ImmersiveTechnologyTitle({
  title,
}: ImmersiveTechnologyTitleProps): ReactElement {
  return (
    <h2 className="ms-auto me-auto max-w-5xl text-balance text-center text-4xl font-black leading-[1.22] text-white sm:text-5xl lg:text-6xl">
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

export default ImmersiveTechnologyTitle;
