import type { ReactElement } from "react";

import { depositCopy } from "@/data/landing/deposit";
import type { DepositHeroProps } from "@/interfaces/landing/deposit";

function DepositHero({ phase }: DepositHeroProps): ReactElement {
  const copy = depositCopy[phase];

  return (
    <header className="mx-auto max-w-3xl text-center">
      <h1 className="text-3xl font-black text-white/86 sm:text-5xl">
        {copy.title}{" "}
        <span className="text-secondary">{copy.highlight}</span>
      </h1>
      <p className="mt-4 text-base leading-8 text-white/62">
        {copy.description}
      </p>
    </header>
  );
}

export default DepositHero;
