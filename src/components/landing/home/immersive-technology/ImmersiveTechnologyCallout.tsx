import type { ReactElement } from "react";

import type { ImmersiveTechnologyCallout as TechnologyCallout } from "@/types/landing/home";

type ImmersiveTechnologyCalloutProps = {
  callout: TechnologyCallout;
};

const calloutPositionClasses: Record<TechnologyCallout["id"], string> = {
  "smart-battery": "start-[8%] top-[32%]",
  "renewed-brakes": "start-[13%] top-[66%]",
  "electric-motor": "end-[8%] top-[33%]",
  "adaptive-system": "end-[13%] top-[63%]",
};

const lineClasses: Record<TechnologyCallout["side"], string> = {
  start: "start-full ms-4",
  end: "end-full me-4",
};

function ImmersiveTechnologyCallout({
  callout,
}: ImmersiveTechnologyCalloutProps): ReactElement {
  return (
    <div
      className={`absolute hidden -translate-y-1/2 lg:block ${calloutPositionClasses[callout.id]}`}
    >
      <div className="relative min-w-28 rounded-[1.25rem] border border-white/10 bg-black/42 ps-6 pe-6 py-4 text-center shadow-[0_0_30px_rgba(0,0,0,0.42)] backdrop-blur-md">
        <p className="text-xs font-light tracking-wide text-white/48">
          {callout.label}
        </p>
        <p className="mt-1 text-sm font-bold text-secondary">{callout.value}</p>

        <span
          className={`absolute top-1/2 h-px w-12 -translate-y-1/2 bg-secondary/60 ${lineClasses[callout.side]}`}
        />
        <span
          className={`absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_20px_rgba(0,214,111,0.8)] ${callout.side === "start" ? "start-[calc(100%+4rem)]" : "end-[calc(100%+4rem)]"}`}
        />
      </div>
    </div>
  );
}

export default ImmersiveTechnologyCallout;
