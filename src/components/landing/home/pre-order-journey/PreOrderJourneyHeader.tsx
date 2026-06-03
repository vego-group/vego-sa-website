import type { ReactElement } from "react";

import type { PreOrderJourneyContent } from "@/types/landing/home";
import PreOrderJourneyTitle from "./PreOrderJourneyTitle";

type PreOrderJourneyHeaderProps = {
  content: PreOrderJourneyContent;
};

function PreOrderJourneyHeader({
  content,
}: PreOrderJourneyHeaderProps): ReactElement {
  return (
    <header>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-7 text-center">
        <PreOrderJourneyTitle title={content.title} />
        <p className="max-w-3xl text-base font-light leading-8 text-white/66 sm:text-lg">
          {content.description}
        </p>
      </div>
    </header>
  );
}

export default PreOrderJourneyHeader;
