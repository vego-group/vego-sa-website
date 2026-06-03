import type { ReactElement } from "react";

type HeroDescriptionProps = {
  description: string;
};

function HeroDescription({ description }: HeroDescriptionProps): ReactElement {
  return (
    <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
      {description}
    </p>
  );
}

export default HeroDescription;
