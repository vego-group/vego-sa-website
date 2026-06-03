import type { ReactElement } from "react";

import { landingPreOrder } from "@/data/landing";
import PreOrderContent from "./PreOrderContent";
import PreOrderGallery from "./PreOrderGallery";

function PreOrderSection(): ReactElement {
  return (
    <section
      id="my-vego"
      className="relative isolate overflow-hidden bg-[#00091f] px-6 py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_55%,rgba(0,123,181,0.22),transparent_36%),radial-gradient(circle_at_76%_44%,rgba(0,214,111,0.12),transparent_30%),linear-gradient(135deg,#00111f_0%,#00051c_45%,#03001f_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-white/10" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 [direction:ltr] lg:grid-cols-[minmax(0,1fr)_minmax(25rem,0.95fr)] lg:gap-20">
        <PreOrderGallery images={landingPreOrder.images} />
        <PreOrderContent content={landingPreOrder} />
      </div>
    </section>
  );
}

export default PreOrderSection;
