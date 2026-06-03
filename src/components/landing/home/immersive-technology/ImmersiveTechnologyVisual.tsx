import Image from "next/image";
import type { ReactElement } from "react";

import type { ImmersiveTechnologyContent } from "@/types/landing/home";
import ImmersiveTechnologyCallout from "./ImmersiveTechnologyCallout";
import ImmersiveTechnologyMobileSpecs from "./ImmersiveTechnologyMobileSpecs";

type ImmersiveTechnologyVisualProps = {
  content: ImmersiveTechnologyContent;
};

function ImmersiveTechnologyVisual({
  content,
}: ImmersiveTechnologyVisualProps): ReactElement {
  return (
    <div className="ms-auto me-auto flex w-full max-w-5xl flex-col gap-6">
      <figure className="relative isolate aspect-[16/9] overflow-hidden bg-black shadow-[0_0_70px_rgba(0,214,111,0.12)]">
        <div className="absolute inset-x-[18%] bottom-0 h-1/2 bg-secondary/25 blur-[70px]" />
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1280px) 960px, 92vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_76%,rgba(0,214,111,0.2),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0)_55%,rgba(0,0,0,0.24)_100%)]" />

        {content.callouts.map((callout) => (
          <ImmersiveTechnologyCallout key={callout.id} callout={callout} />
        ))}
      </figure>

      <ImmersiveTechnologyMobileSpecs callouts={content.callouts} />
    </div>
  );
}

export default ImmersiveTechnologyVisual;
