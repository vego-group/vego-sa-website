import type { ReactElement } from "react";

import type { MyVegoAppTitlePart } from "@/types/landing/home";

type MyVegoAppTitleProps = {
  title: MyVegoAppTitlePart[];
};

const toneClassName: Record<NonNullable<MyVegoAppTitlePart["tone"]>, string> = {
  accent: "text-secondary drop-shadow-[0_0_24px_rgba(0,214,111,0.38)]",
  brand: "text-secondary drop-shadow-[0_0_24px_rgba(0,214,111,0.38)]",
  muted: "text-white",
};

function MyVegoAppTitle({ title }: MyVegoAppTitleProps): ReactElement {
  return (
    <h2 className="max-w-3xl text-balance text-3xl font-black leading-[1.32] tracking-normal sm:text-4xl lg:text-5xl text-right">
      {title.map((part, index) => (
        <span
          key={`${part.text}-${index}`}
          className={toneClassName[part.tone ?? "muted"]}
        >
          {part.text}
          {index === 1 ? <br /> : " "}
        </span>
      ))}
    </h2>
  );
}

export default MyVegoAppTitle;
