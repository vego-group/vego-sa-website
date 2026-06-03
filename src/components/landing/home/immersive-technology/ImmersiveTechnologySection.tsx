import type { ReactElement } from "react";

import { landingImmersiveTechnology } from "@/data/landing";
import ImmersiveTechnologyHeader from "./ImmersiveTechnologyHeader";
import ImmersiveTechnologyVisual from "./ImmersiveTechnologyVisual";

function ImmersiveTechnologySection(): ReactElement {
  return (
    <section
      id="immersive-technology"
      className="relative isolate overflow-hidden bg-[#00091f] ps-6 pe-6 py-20 sm:py-24 lg:py-36"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_63%,rgba(0,123,181,0.2),transparent_34%),radial-gradient(circle_at_50%_54%,rgba(0,214,111,0.11),transparent_26%),radial-gradient(circle_at_84%_46%,rgba(16,20,75,0.7),transparent_38%),linear-gradient(135deg,#00111f_0%,#00091f_44%,#03001f_100%)]" />

      <div className="ms-auto me-auto flex w-full max-w-7xl flex-col gap-14 sm:gap-16 lg:gap-20">
        <ImmersiveTechnologyHeader content={landingImmersiveTechnology} />
        <ImmersiveTechnologyVisual content={landingImmersiveTechnology} />
      </div>
    </section>
  );
}

export default ImmersiveTechnologySection;
