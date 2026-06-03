import type { IconType } from "react-icons";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import type { ReactElement } from "react";

import type { MyVegoStoreLink } from "@/types/landing/home";

type MyVegoStoreBadgeProps = {
  store: MyVegoStoreLink;
};

const storeIcons: Record<MyVegoStoreLink["platform"], IconType> = {
  "app-store": FaApple,
  "google-play": FaGooglePlay,
};

function MyVegoStoreBadge({ store }: MyVegoStoreBadgeProps): ReactElement {
  const Icon = storeIcons[store.platform];

  return (
    <a
      href={store.href}
      aria-label={`${store.eyebrow} ${store.label}`}
      className="inline-flex h-16 w-60 max-w-full items-center justify-center gap-3 rounded-lg border-2 border-white bg-transparent ps-4 pe-5 text-white shadow-[0_16px_42px_rgba(0,0,0,0.2)] transition duration-300 hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-[#00091f]"
    >
      <Icon aria-hidden="true" className="size-7 shrink-0" />

      <span className="flex min-w-0 flex-col items-start [direction:ltr]">
        <span className="whitespace-nowrap text-xs font-bold leading-none">
          {store.eyebrow}
        </span>
        <span className="whitespace-nowrap text-[1.35rem] font-bold leading-[1.05] tracking-normal sm:text-2xl">
          {store.label}
        </span>
      </span>
    </a>
  );
}

export default MyVegoStoreBadge;
