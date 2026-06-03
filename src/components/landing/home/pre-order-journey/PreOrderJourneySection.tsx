import type { ReactElement } from "react";

import { landingPreOrderJourney } from "@/data/landing";
import PreOrderJourneyHeader from "./PreOrderJourneyHeader";
import PreOrderJourneyTimeline from "./PreOrderJourneyTimeline";

function PreOrderJourneySection(): ReactElement {
  return (
    <section
      id="pre-order-journey"
      className="relative isolate overflow-hidden bg-[#00091f] ps-6 pe-6 py-20 sm:py-24 lg:py-36"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#00091f_0%,#00111f_48%,#00091f_100%)] lg:bg-[radial-gradient(circle_at_18%_49%,rgba(0,123,181,0.19),transparent_34%),radial-gradient(circle_at_81%_52%,rgba(0,214,111,0.1),transparent_25%),linear-gradient(135deg,#00111f_0%,#00091f_45%,#03001f_100%)]" />
      <div className="pointer-events-none absolute start-0 top-0 -z-10 hidden h-full w-1/2 bg-[radial-gradient(circle_at_32%_53%,rgba(0,214,111,0.08),transparent_34%)] lg:block" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 sm:gap-20 lg:gap-24">
        <PreOrderJourneyHeader content={landingPreOrderJourney} />
        <PreOrderJourneyTimeline steps={landingPreOrderJourney.steps} />
      </div>
    </section>
  );
}

export default PreOrderJourneySection;
