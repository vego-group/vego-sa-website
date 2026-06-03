import { Check } from "lucide-react";
import type { ReactElement } from "react";

import type { DepositStepItemProps } from "@/interfaces/landing/deposit";

function DepositStepItem({
  index,
  isActive,
  isCompleted,
  label,
}: DepositStepItemProps): ReactElement {
  return (
    <div className="flex min-w-20 flex-col items-center gap-2 text-center">
      <div
        className={`grid size-12 place-items-center rounded-2xl border text-sm font-black transition ${
          isActive || isCompleted
            ? "border-secondary/60 bg-secondary text-primary shadow-[0_0_28px_rgba(27,217,137,0.34)]"
            : "border-white/10 bg-white/8 text-white/45"
        }`}
      >
        {isCompleted ? <Check className="size-5" aria-hidden="true" /> : index}
      </div>
      <span
        className={`text-xs font-bold ${
          isActive ? "text-white" : "text-white/45"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default DepositStepItem;
