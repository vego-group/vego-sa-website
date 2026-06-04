import { SaudiRiyal } from "lucide-react";
import type { ReactElement } from "react";

import type { CollectionProduct } from "@/types/landing/home";

type CollectionPriceDetailsProps = {
  product: CollectionProduct;
};

function PriceValue({
  children,
  className,
  iconClassName,
}: {
  children: string;
  className: string;
  iconClassName: string;
}): ReactElement {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span>{children}</span>
      <SaudiRiyal aria-hidden="true" className={iconClassName} />
    </span>
  );
}

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
        <p className="text-sm font-bold text-white/92">
          <PriceValue className="" iconClassName="size-4">
            {product.fullPrice}
          </PriceValue>
        </p>
        <p className="mt-3 text-secondary">
          <PriceValue
            className="text-2xl font-black leading-none sm:text-3xl"
            iconClassName="size-6 sm:size-7"
          >
            {product.depositPrice}
          </PriceValue>
        </p>
      </div>
    </div>
  );
}

export default CollectionPriceDetails;
