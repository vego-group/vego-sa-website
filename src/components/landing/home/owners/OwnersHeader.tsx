import type { ReactElement } from "react";

import type { OwnersContent } from "@/types/landing/home";
import OwnersTitle from "./OwnersTitle";

type OwnersHeaderProps = {
  content: OwnersContent;
};

function OwnersHeader({ content }: OwnersHeaderProps): ReactElement {
  return (
    <header>
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <OwnersTitle title={content.title} />
      </div>
    </header>
  );
}

export default OwnersHeader;
