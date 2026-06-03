import { Zap } from "lucide-react";
import type { ReactElement } from "react";

type HeroBadgeProps = {
  label: string;
};

function HeroBadge({ label }: HeroBadgeProps): ReactElement {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 backdrop-blur-md">
      <Zap aria-hidden="true" className="size-4 text-secondary" />
      {label}
    </div>
  );
}

export default HeroBadge;
