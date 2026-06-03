import type { ReactElement } from "react";

import type { CollectionContent } from "@/types/landing/home";
import CollectionTitle from "./CollectionTitle";

type CollectionHeaderProps = {
  content: CollectionContent;
};

function CollectionHeader({ content }: CollectionHeaderProps): ReactElement {
  return (
    <header>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <CollectionTitle title={content.title} />
        <p className="max-w-3xl text-base font-light leading-8 text-white/62 sm:text-lg">
          {content.description}
        </p>
      </div>
    </header>
  );
}

export default CollectionHeader;
