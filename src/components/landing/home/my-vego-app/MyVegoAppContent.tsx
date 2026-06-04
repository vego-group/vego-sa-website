import type { ReactElement } from "react";

import type { MyVegoAppContent as MyVegoAppContentType } from "@/types/landing/home";
import MyVegoAppStoreButtons from "./MyVegoAppStoreButtons";
import MyVegoAppTitle from "./MyVegoAppTitle";

type MyVegoAppContentProps = {
  content: MyVegoAppContentType;
};

function MyVegoAppContent({ content }: MyVegoAppContentProps): ReactElement {
  return (
    <div className="flex flex-col items-center text-center [direction:rtl] lg:items-end lg:text-end">
      <MyVegoAppTitle title={content.title} />

      <p className="mt-7 text-right max-w-xl text-sm font-light leading-7 text-white/62 sm:text-base sm:leading-8">
        {content.description}
      </p>

      <MyVegoAppStoreButtons stores={content.stores} />
    </div>
  );
}

export default MyVegoAppContent;
