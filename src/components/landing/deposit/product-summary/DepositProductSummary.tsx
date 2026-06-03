import Image from "next/image";
import type { ReactElement } from "react";

import type { DepositProductSummaryProps } from "@/interfaces/landing/deposit";
import { getRemainingAmount } from "../deposit-pricing";

function DepositProductSummary({
  product,
  variant = "compact",
}: DepositProductSummaryProps): ReactElement {
  const isReview = variant === "review";

  return (
    <section className="w-full q overflow-hidden rounded-3xl border  border-secondary/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(0,17,45,0.76)_50%,rgba(0,214,111,0.1))] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <figure
          className={`relative overflow-hidden rounded-2xl bg-white lg:shrink-0 ${
            isReview ? "aspect-[1.75/1] lg:w-80" : "aspect-[1.75/1] lg:w-96"
          }`}
        >
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            className="object-contain p-3"
            sizes={isReview ? "320px" : "(min-width: 1024px) 384px, 90vw"}
          />
        </figure>

        <div className="flex-1 space-y-3 lg:px-4">
          <p className="text-sm font-bold text-white/62">الدراجة المختارة</p>
          <h2 className="ms-auto max-w-sm text-2xl sm:text-4xl font-bold leading-tight text-white">
            {product.name}
          </h2>
          <p className="text-base leading-7 text-white/52">
            {product.image.alt}
          </p>
        </div>

        <div className="grid gap-4 rounded-3xl border border-white/12 bg-white/6 p-5 sm:min-w-80 lg:w-[26rem]">
          <div className="flex flex-row-reverse items-center justify-between gap-6">
            <span className="text-end text-sm leading-6 text-white/52">
              {product.fullPriceLabel}
            </span>
            <span className="text-start text-lg font-black text-white">
              {product.fullPrice}
            </span>
          </div>

          <div className="flex flex-row-reverse items-center justify-between gap-6">
            <span className="text-end text-sm leading-6 text-white/52">
              {product.depositLabel}
            </span>
            <span className="text-start text-3xl font-black leading-none text-secondary">
              {product.depositPrice}
            </span>
          </div>

          <div className="flex flex-row-reverse items-center justify-between gap-6 border-t border-white/10 pt-4">
            <span className="text-end text-sm leading-6 text-white/52">
              المبلغ المتبقي عند الاستلام:
            </span>
            <span className="text-start text-base font-black text-white">
              {getRemainingAmount(product)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DepositProductSummary;
