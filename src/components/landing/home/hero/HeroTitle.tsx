import type { ReactElement } from "react";

type HeroTitleProps = {
  title: string;
};

function HeroTitle({ title }: HeroTitleProps): ReactElement {
  return (
    <h1 className="mt-7 text-balance text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
      {title}
    </h1>
  );
}

export default HeroTitle;
