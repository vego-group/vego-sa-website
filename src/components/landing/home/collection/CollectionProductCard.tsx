import type { ReactElement } from "react";

import type { CollectionProduct } from "@/types/landing/home";
import CollectionPriceDetails from "./CollectionPriceDetails";
import CollectionProductAction from "./CollectionProductAction";
import CollectionProductMedia from "./CollectionProductMedia";

type CollectionProductCardProps = {
  product: CollectionProduct;
};

function CollectionProductCard({
  product,
}: CollectionProductCardProps): ReactElement {
  return (
    <article className="group overflow-hidden rounded-[1.6rem] border border-white/12 bg-[linear-gradient(135deg,rgba(0,214,111,0.17)_0%,rgba(0,17,45,0.74)_42%,rgba(3,5,33,0.92)_100%)] p-2.5 shadow-[0_30px_80px_rgba(0,0,0,0.22)] transition duration-300 hover:border-secondary/35 hover:shadow-[0_34px_90px_rgba(0,214,111,0.13)]">
      <CollectionProductMedia product={product} />

      <div className="flex flex-col gap-7 ps-4 pe-4 pb-4 pt-7 sm:ps-5 sm:pe-5 sm:pb-5">
        <h3 className="text-end text-3xl font-bold tracking-[-0.02em] text-white/88 sm:text-3xl">
          {product.name}
        </h3>

        <CollectionPriceDetails product={product} />
        <CollectionProductAction product={product} />
      </div>
    </article>
  );
}

export default CollectionProductCard;
