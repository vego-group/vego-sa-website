import type { ReactElement } from "react";

function PreOrderAccent(): ReactElement {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-px w-20 bg-secondary shadow-[0_0_24px_rgba(0,214,111,0.65)] sm:w-28"
    />
  );
}

export default PreOrderAccent;
