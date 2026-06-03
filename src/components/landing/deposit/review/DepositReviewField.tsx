import type { ReactElement } from "react";

import type { DepositReviewFieldProps } from "@/interfaces/landing/deposit";

function DepositReviewField({
  label,
  value,
}: DepositReviewFieldProps): ReactElement {
  return (
    <div className="grid gap-2">
      <span className="text-sm font-bold text-white/55">{label}</span>
      <div className="min-h-14 rounded-2xl border border-white/8 bg-white/5 px-5 py-4 text-sm font-bold text-white/88">
        {value || "غير محدد"}
      </div>
    </div>
  );
}

export default DepositReviewField;
