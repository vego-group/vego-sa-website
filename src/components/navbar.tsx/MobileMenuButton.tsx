import type { ReactElement } from "react";
import { Button } from "../ui/button";

type MobileMenuButtonProps = {
  onClick: () => void;
};

export default function MobileMenuButton({
  onClick,
}: MobileMenuButtonProps): ReactElement {
  return (
    <Button
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-primary lg:hidden"
      aria-label="Open menu"
      onClick={onClick}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M4 7h16M4 12h16M4 17h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </Button>
  );
}
