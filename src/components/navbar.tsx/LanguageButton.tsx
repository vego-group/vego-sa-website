import { Globe } from "lucide-react";
import type { ReactElement } from "react";

type LanguageButtonProps = {
  label: string;
  className: string;
};

export default function LanguageButton({
  label,
  className,
}: LanguageButtonProps): ReactElement {
  return (
    <button type="button" className={className}>
      <Globe className="size-4" />
      {label}
    </button>
  );
}
