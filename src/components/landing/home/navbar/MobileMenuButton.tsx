import { Menu } from "lucide-react";
import type { ReactElement } from "react";

type MobileMenuButtonProps = {
  onClick: () => void;
};

function MobileMenuButton({ onClick }: MobileMenuButtonProps): ReactElement {
  return (
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-sm transition hover:bg-white/25 lg:hidden"
      aria-label="فتح القائمة"
      onClick={onClick}
    >
      <Menu aria-hidden="true" className="size-5" />
    </button>
  );
}
export default MobileMenuButton;
