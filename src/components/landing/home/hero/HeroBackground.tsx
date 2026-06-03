import Image from "next/image";
import type { ReactElement } from "react";

type HeroBackgroundProps = {
  alt: string;
  src: string;
};

function HeroBackground({ alt, src }: HeroBackgroundProps): ReactElement {
  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_55%,rgba(0,123,181,0.22),transparent_36%),radial-gradient(circle_at_76%_44%,rgba(0,214,111,0.12),transparent_30%),linear-gradient(135deg,#00111f_0%,#00051c_45%,#03001f_100%)] opacity-85" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-slate-950 via-primary/90 to-transparent" />
    </div>
  );
}

export default HeroBackground;
