import type { ReactElement } from "react";

import { landingMyVegoApp } from "@/data/landing";
import MyVegoAppContent from "./MyVegoAppContent";
import MyVegoAppVisual from "./MyVegoAppVisual";

function MyVegoAppSection(): ReactElement {
  return (
    <section
      id="my-vego-app"
      className="relative isolate overflow-hidden bg-[#00091f] ps-6 pe-6 py-20 sm:py-24 lg:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_48%,rgba(0,123,181,0.24),transparent_34%),radial-gradient(circle_at_49%_52%,rgba(0,214,111,0.1),transparent_24%),radial-gradient(circle_at_85%_42%,rgba(25,24,95,0.58),transparent_38%),linear-gradient(135deg,#00111f_0%,#00091f_48%,#03001f_100%)]" />

      <div className="ms-auto me-auto grid w-full max-w-7xl items-center gap-12 [direction:ltr] lg:grid-cols-[minmax(0,0.95fr)_minmax(26rem,0.95fr)] lg:gap-14 xl:gap-16">
        <MyVegoAppContent content={landingMyVegoApp} />
        <MyVegoAppVisual image={landingMyVegoApp.image} />
      </div>
    </section>
  );
}

export default MyVegoAppSection;
