import type { ReactElement } from "react";

import type { PreOrderJourneyStep as JourneyStep } from "@/types/landing/home";
import PreOrderJourneyStep from "./PreOrderJourneyStep";

type PreOrderJourneyTimelineProps = {
  steps: JourneyStep[];
};

function PreOrderJourneyTimeline({
  steps,
}: PreOrderJourneyTimelineProps): ReactElement {
  return (
    <div className="relative">
      <div className="absolute start-0 end-0 top-[2.7rem] hidden h-px bg-white/10 lg:block" />
      <div className="absolute end-0 top-[2.7rem] hidden h-px w-[45%] bg-secondary/70 shadow-[0_0_24px_rgba(0,214,111,0.34)] lg:block" />

      <div className="grid gap-9 [direction:rtl] sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
        {steps.map((step) => (
          <PreOrderJourneyStep key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}

export default PreOrderJourneyTimeline;
