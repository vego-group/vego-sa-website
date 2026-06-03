import Image from "next/image";
import type { ReactElement } from "react";

import type { PreOrderImage } from "@/types/landing/home";

const imageCardClasses: Record<PreOrderImage["variant"], string> = {
  wide: "col-span-2 aspect-[2.45/1]",
  large: "aspect-[1.34/1]",
  small: "aspect-[0.92/1]",
};

type PreOrderImageCardProps = {
  image: PreOrderImage;
};

function PreOrderImageCard({ image }: PreOrderImageCardProps): ReactElement {
  return (
    <figure
      className={`relative overflow-hidden rounded-[1.35rem] bg-white shadow-2xl shadow-black/25 ring-1 ring-white/10 ${imageCardClasses[image.variant]}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes={
          image.variant === "wide"
            ? "(min-width: 1024px) 560px, 90vw"
            : "(min-width: 1024px) 280px, 45vw"
        }
      />
    </figure>
  );
}

export default PreOrderImageCard;
