import type { ReactElement } from "react";

import type { PreOrderContent as PreOrderContentType } from "@/types/landing/home";

type PreOrderContentProps = {
  content: PreOrderContentType;
};

function PreOrderContent({ content }: PreOrderContentProps): ReactElement {
  return (
    <div className="max-w-2xl text-right">
      <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-[3.35rem]">
        {content.title}
        <span className="mt-3 block text-secondary drop-shadow-[0_0_22px_rgba(0,214,111,0.45)]">
          {content.highlight}
        </span>
      </h2>

      <p className="mt-8 text-lg font-light leading-[2.15] text-white sm:text-xl">
        {content.description}
      </p>
    </div>
  );
}

export default PreOrderContent;
