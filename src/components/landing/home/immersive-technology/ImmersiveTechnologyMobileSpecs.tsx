import type { ReactElement } from "react";

import type { ImmersiveTechnologyCallout } from "@/types/landing/home";

type ImmersiveTechnologyMobileSpecsProps = {
  callouts: ImmersiveTechnologyCallout[];
};

function ImmersiveTechnologyMobileSpecs({
  callouts,
}: ImmersiveTechnologyMobileSpecsProps): ReactElement {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
      {callouts.map((callout) => (
        <div
          key={callout.id}
          className="rounded-2xl border border-white/10 bg-white/[0.03] ps-5 pe-5 py-4 text-center"
        >
          <p className="text-xs font-light tracking-wide text-white/50">
            {callout.label}
          </p>
          <p className="mt-1 text-sm font-bold text-secondary">
            {callout.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ImmersiveTechnologyMobileSpecs;
