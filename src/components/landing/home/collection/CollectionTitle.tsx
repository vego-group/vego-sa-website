import type { ReactElement } from "react";

import type { CollectionContent } from "@/types/landing/home";

type CollectionTitleProps = {
  title: CollectionContent["title"];
};

const titleToneClasses: Record<
  NonNullable<CollectionContent["title"][number]["tone"]>,
  string
> = {
  muted: "text-white",
  accent: "text-secondary",
  brand: "text-secondary",
};

function CollectionTitle({ title }: CollectionTitleProps): ReactElement {
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

export default CollectionTitle;
