import type { ReactElement } from "react";

import type { BrandVisionContent as BrandVisionContentType } from "@/types/landing/home";
import BrandVisionTitle from "./BrandVisionTitle";

type BrandVisionContentProps = {
  content: BrandVisionContentType;
};

function BrandVisionContent({
  content,
}: BrandVisionContentProps): ReactElement {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mx-auto max-w-5xl text-center">
        <BrandVisionTitle title={content.title} />
        <p className="mx-auto mt-6 max-w-3xl text-base font-light leading-8 text-white/76 sm:text-lg sm:leading-9">
          {content.description}
        </p>
      </div>
    </div>
  );
}

export default BrandVisionContent;
