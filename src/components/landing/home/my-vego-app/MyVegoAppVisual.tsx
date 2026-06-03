import Image from "next/image";
import type { ReactElement } from "react";

type MyVegoAppVisualProps = {
  image: {
    src: string;
    alt: string;
  };
};

function MyVegoAppVisual({ image }: MyVegoAppVisualProps): ReactElement {
  return (
    <figure className="relative min-h-[19rem] overflow-hidden rounded-[2rem] bg-black shadow-[0_34px_90px_rgba(0,0,0,0.34)] ring-1 ring-white/8 sm:min-h-[27rem] lg:min-h-[34rem] xl:min-h-[38rem]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={false}
        className="object-cover"
        sizes="(min-width: 1280px) 760px, (min-width: 1024px) 58vw, 92vw"
      />
    </figure>
  );
}

export default MyVegoAppVisual;
