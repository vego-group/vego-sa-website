import type { ReactElement } from "react";

import type { PreOrderBenefitsContent } from "@/types/landing/home";
import PreOrderBenefitsTitle from "./PreOrderBenefitsTitle";

type PreOrderBenefitsHeaderProps = {
  content: PreOrderBenefitsContent;
};

function PreOrderBenefitsHeader({
  content,
}: PreOrderBenefitsHeaderProps): ReactElement {
  return (
    <header>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-7 text-center">
        <PreOrderBenefitsTitle title={content.title} />
        <p className="max-w-3xl text-base font-light leading-8 text-white/66 sm:text-lg">
          {content.description}
        </p>
      </div>
    </header>
  );
}

export default PreOrderBenefitsHeader;
