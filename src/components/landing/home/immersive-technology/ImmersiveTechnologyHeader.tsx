import type { ReactElement } from "react";

import type { ImmersiveTechnologyContent } from "@/types/landing/home";
import ImmersiveTechnologyTitle from "./ImmersiveTechnologyTitle";

type ImmersiveTechnologyHeaderProps = {
  content: ImmersiveTechnologyContent;
};

function ImmersiveTechnologyHeader({
  content,
}: ImmersiveTechnologyHeaderProps): ReactElement {
  return (
    <header>
      <div className="ms-auto me-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <ImmersiveTechnologyTitle title={content.title} />
        <p className="max-w-3xl text-base font-light leading-8 text-white/66 sm:text-lg">
          {content.description}
        </p>
      </div>
    </header>
  );
}

export default ImmersiveTechnologyHeader;
