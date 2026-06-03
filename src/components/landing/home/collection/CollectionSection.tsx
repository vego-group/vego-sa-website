import type { ReactElement } from "react";

import { landingCollection } from "@/data/landing";
import CollectionGrid from "./CollectionGrid";
import CollectionHeader from "./CollectionHeader";

function CollectionSection(): ReactElement {
  return (
    <section
      id="products"
      className="relative isolate overflow-hidden bg-[#00091f] ps-6 pe-6 py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_46%,rgba(0,123,181,0.17),transparent_32%),radial-gradient(circle_at_78%_34%,rgba(0,214,111,0.11),transparent_28%),linear-gradient(135deg,#00111f_0%,#00091f_46%,#03001f_100%)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 sm:gap-14 lg:gap-16">
        <CollectionHeader content={landingCollection} />
        <CollectionGrid products={landingCollection.products} />
      </div>
    </section>
  );
}

export default CollectionSection;
