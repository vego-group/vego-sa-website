import type { ReactElement } from "react";

import type { PreOrderJourneyStep as JourneyStep } from "@/types/landing/home";

type PreOrderJourneyStepProps = {
  step: JourneyStep;
};

function PreOrderJourneyStep({
  step,
}: PreOrderJourneyStepProps): ReactElement {
  return (
    <article className="relative flex min-w-0 flex-col items-center text-center">
      <div className="relative z-10 flex size-[5.4rem] items-center justify-center rounded-full border border-secondary/18 bg-secondary/[0.08] text-xl font-black text-secondary shadow-[0_0_50px_rgba(0,214,111,0.26)] ring-1 ring-white/8 backdrop-blur-sm sm:size-[5.9rem]">
        {step.number}
      </div>

      <div className="mt-8 flex min-h-24 flex-col items-center">
        <h3 className="text-xl font-black leading-8 text-white sm:text-2xl">
          {step.title}
        </h3>
        <p className="mt-2 max-w-52 text-sm font-light leading-7 text-white/48 sm:text-base">
          {step.description}
        </p>
      </div>
    </article>
  );
}

export default PreOrderJourneyStep;
