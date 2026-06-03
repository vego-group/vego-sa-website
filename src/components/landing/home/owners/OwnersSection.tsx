import type { ReactElement } from "react";

import { landingOwners } from "@/data/landing";
import OwnersGrid from "./OwnersGrid";
import OwnersHeader from "./OwnersHeader";

function OwnersSection(): ReactElement {
  return (
    <section className="relative isolate overflow-hidden bg-[#00091f] ps-6 pe-6 py-20 sm:py-24 lg:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_50%,rgba(0,123,181,0.18),transparent_34%),radial-gradient(circle_at_84%_54%,rgba(16,20,75,0.7),transparent_36%),linear-gradient(135deg,#00111f_0%,#00091f_44%,#03001f_100%)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 sm:gap-16 lg:gap-20">
        <OwnersHeader content={landingOwners} />
        <OwnersGrid testimonials={landingOwners.testimonials} />
      </div>
    </section>
  );
}

export default OwnersSection;
