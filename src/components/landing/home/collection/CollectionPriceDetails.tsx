import type { ReactElement } from "react";

import type { CollectionProduct } from "@/types/landing/home";

type CollectionPriceDetailsProps = {
  product: CollectionProduct;
};

function CollectionPriceDetails({
  product,
}: CollectionPriceDetailsProps): ReactElement {
  return (
    <div className="grid gap-5 border-t border-white/6 pt-7 sm:grid-cols-2">
      <div className="space-y-3 text-start text-sm font-light text-white/45">
        <p>{product.fullPriceLabel}</p>
        <p>{product.depositLabel}</p>
      </div>
      <div className="sm:text-end">
        <p className="text-sm font-bold text-white/92">{product.fullPrice}</p>
        <p className="mt-3 text-2xl font-black leading-none text-secondary sm:text-3xl">
          {product.depositPrice}
        </p>
      </div>
    </div>
  );
}

export default CollectionPriceDetails;
