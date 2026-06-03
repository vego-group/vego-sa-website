import type { ReactElement } from "react";

import type { MyVegoStoreLink } from "@/types/landing/home";
import MyVegoStoreBadge from "./MyVegoStoreBadge";

type MyVegoAppStoreButtonsProps = {
  stores: MyVegoStoreLink[];
};

function MyVegoAppStoreButtons({
  stores,
}: MyVegoAppStoreButtonsProps): ReactElement {
  return (
    <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-end">
      {stores.map((store) => (
        <MyVegoStoreBadge key={store.id} store={store} />
      ))}
    </div>
  );
}

export default MyVegoAppStoreButtons;
