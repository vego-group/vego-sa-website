import type { ReactElement } from "react";

import type { PreOrderContent } from "@/types/landing/home";
import PreOrderImageCard from "./PreOrderImageCard";

type PreOrderGalleryProps = {
  images: PreOrderContent["images"];
};

function PreOrderGallery({ images }: PreOrderGalleryProps): ReactElement {
  return (
    <div className="grid w-full max-w-164 grid-cols-2 gap-4 sm:gap-6 lg:max-w-none">
      {images.map((image) => (
        <PreOrderImageCard key={image.src} image={image} />
      ))}
    </div>
  );
}

export default PreOrderGallery;
