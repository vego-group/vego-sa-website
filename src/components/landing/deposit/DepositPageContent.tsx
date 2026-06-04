"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowRight, SaudiRiyal } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  depositDefaultPersonalInfo,
  depositPersonalFields,
  depositSteps,
} from "@/data/landing";
import { useProduct } from "@/hooks";
import type { DepositPageContentProps } from "@/interfaces/landing/deposit";
import {
  createPreOrderFormSchema,
  type CreatePreOrderFormInput,
  type CreatePreOrderFormSchema,
  type CreatePreOrderPayloadSchema,
} from "@/schemas";
import { createPreorderAPI } from "@/services/mutations/pre-order";
import type { DepositPhase } from "@/types/landing/deposit";
import DepositHero from "./DepositHero";
import PersonalInfoForm from "./form/PersonalInfoForm";
import DepositStepper from "./stepper/DepositStepper";

const buildPreorderPayload = (
  values: CreatePreOrderFormSchema,
  productName: string,
): CreatePreOrderPayloadSchema => ({
  customer_name: values.fullName,
  phone: values.phone,
  email: values.email,
  city: values.city,
  product_name: productName,
});

function DepositPageContent({
  initialProductSlug,
}: DepositPageContentProps): ReactElement {
  const productSlug = initialProductSlug ?? "";
  const { data: productResponse, isLoading: isProductLoading } =
    useProduct(productSlug);
  const product = productResponse?.data;
  const searchParams = useSearchParams();
  const payment = searchParams.get("payment");

  const preorderId = searchParams.get("preorder_id");
  const customerName = searchParams.get("customer_name");
  const depositAmount = searchParams.get("deposit_amount");
  const productName = searchParams.get("product");

  const [phase, setPhase] = useState<DepositPhase>(
    payment === "paid" || payment === "success"
      ? "booking-confirmed"
      : "details",
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreatePreOrderFormInput, unknown, CreatePreOrderFormSchema>({
    resolver: zodResolver(createPreOrderFormSchema),
    defaultValues: depositDefaultPersonalInfo,
    mode: "onChange",
  });

  useEffect(() => {
    if (payment === "failed") {
      toast.error("فشل الدفع، يرجى المحاولة مرة أخرى");
    }
  }, [payment]);

  const handleDownloadReceipt = () => {
    const rows = [
      customerName &&
        `<div class="row"><span class="label">اسم العميل</span><span class="value">${customerName}</span></div>`,
      productName &&
        `<div class="row"><span class="label">المنتج</span><span class="value">${productName}</span></div>`,
      depositAmount &&
        `<div class="row"><span class="label">مبلغ العربون</span><span class="value" style="display:inline-flex;align-items:center;gap:4px">${Number(depositAmount).toLocaleString("en-US")}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m20 19.5-5.5 1.2"/><path d="M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2"/><path d="m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2"/><path d="M20 10 4 13.5"/></svg></span></div>`,
    ]
      .filter(Boolean)
      .join("");

    const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8"/>
  <title>إيصال الحجز - VEGO</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Arial,sans-serif;direction:rtl;padding:48px 40px;color:#111;background:#fff}
    .brand{font-size:26px;font-weight:900;color:#00d66f;margin-bottom:28px;letter-spacing:1px}
    h1{font-size:20px;font-weight:900;margin-bottom:6px}
    .sub{color:#888;font-size:14px;margin-bottom:28px}
    hr{border:none;border-top:1px solid #eee;margin:24px 0}
    .row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f4f4f4}
    .label{color:#999;font-size:13px}
    .value{font-weight:700;font-size:14px}
    .ref{background:#f8fdf9;border:1px solid #c8f0db;border-radius:12px;padding:20px;text-align:center;margin:28px 0}
    .ref-label{font-size:12px;color:#888;margin-bottom:6px}
    .ref-num{font-size:26px;font-weight:900;color:#00a854;letter-spacing:3px}
    .ref-note{font-size:11px;color:#bbb;margin-top:6px}
    .footer{margin-top:40px;font-size:11px;color:#ccc;text-align:center}
    @media print{body{padding:20px}}
  </style>
</head>
<body>
  <div class="brand">VEGO</div>
  <h1>إيصال حجز دراجة كهربائية</h1>
  <p class="sub">تم تأكيد حجزك بنجاح — ${new Date().toLocaleDateString("ar-SA")}</p>
  <hr/>
  ${rows}
  ${preorderId ? `<div class="ref"><div class="ref-label">رقم الحجز الخاص بك</div><div class="ref-num" style="direction:ltr;unicode-bidi:embed">#VEGO${preorderId}</div><div class="ref-note">احتفظ بهذا الرقم للمراجعة</div></div>` : ""}
  <div class="footer">شركة فيغو للتنقل الكهربائي &bull; vego.sa</div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank", "width=620,height=750");
    if (!win) return;
    win.focus();
    setTimeout(() => {
      win.print();
      URL.revokeObjectURL(url);
    }, 400);
  };

  const handleCreatePreorder = handleSubmit(async (values) => {
    if (!productSlug) {
      toast.error("معرّف المنتج غير موجود.");
      return;
    }

    if (isProductLoading || !product?.name) {
      toast.error("بيانات المنتج لا تزال قيد التحميل.");
      return;
    }

    const result = await createPreorderAPI(
      buildPreorderPayload(values, product.name),
    );
    if (!result?.ok) {
      toast.error(result?.message || "فشل إنشاء طلب الحجز");
      return;
    }

    const checkoutUrl =
      result.data && "checkout_url" in result.data
        ? result.data.checkout_url
        : null;

    if (!checkoutUrl) {
      toast.error("تعذر الحصول على رابط الدفع من الخادم");
      return;
    }

    window.location.assign(checkoutUrl);
  });

  return (
    <main className="relative isolate overflow-hidden bg-[#00091f] px-6 py-12 text-white sm:py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(0,214,111,0.18),transparent_28%),radial-gradient(circle_at_78%_36%,rgba(0,123,181,0.18),transparent_32%),linear-gradient(135deg,#00111f_0%,#00091f_46%,#03001f_100%)]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="flex justify-start">
          <Link
            href="/landing"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-5 text-sm font-bold text-white/76 transition hover:bg-white/14"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
            العودة للرئيسية
          </Link>
        </div>

        <DepositStepper steps={depositSteps} phase={phase} />
        <DepositHero phase={phase} />

        {phase === "details" ? (
          <PersonalInfoForm
            fields={depositPersonalFields}
            productSlug={productSlug}
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            register={register}
            onSubmit={handleCreatePreorder}
          />
        ) : null}

        {phase === "booking-confirmed" ? (
          <section className="mx-auto grid w-full max-w-2xl gap-6 rounded-3xl border border-white/12 bg-white/8 p-8 text-center shadow-[0_28px_90px_rgba(0,0,0,0.24)]">
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-secondary text-4xl font-black text-primary shadow-[0_0_48px_rgba(0,214,111,0.4)]">
              ✓
            </div>

            <div className="grid gap-2">
              {customerName ? (
                <p className="text-sm text-white/50">
                  مرحباً،{" "}
                  <span className="font-bold text-white/76">
                    {customerName}
                  </span>
                </p>
              ) : null}
            </div>

            {preorderId ? (
              <div className="rounded-2xl border border-white/12 bg-white/6 px-6 py-5">
                <p className="mb-2 text-sm text-white/52">رقم الحجز الخاص بك</p>
                <p dir="ltr" className="text-2xl font-black tracking-widest text-secondary">
                  #VEGO{preorderId}
                </p>
                <p className="mt-2 text-xs text-white/38">
                  احتفظ بهذا الرقم للمراجعة
                </p>
              </div>
            ) : null}

            <dl className="grid grid-cols-2 gap-3 text-right">
              {productName ? (
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <dt className="text-xs text-white/45">المنتج</dt>
                  <dd className="mt-1 font-bold text-white/82">
                    {productName}
                  </dd>
                </div>
              ) : null}
              {depositAmount ? (
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <dt className="text-xs text-white/45">مبلغ العربون</dt>
                  <dd className="mt-1 inline-flex items-center gap-1 font-bold text-secondary">
                    {Number(depositAmount).toLocaleString("en-US")}
                    <SaudiRiyal className="size-4" aria-hidden="true" />
                  </dd>
                </div>
              ) : null}
            </dl>

            <button
              type="button"
              onClick={handleDownloadReceipt}
              className="mx-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 text-sm font-black text-primary shadow-[0_0_32px_rgba(0,214,111,0.28)] transition hover:bg-secondary/90"
            >
              تحميل إيصال الحجز
            </button>
          </section>
        ) : null}
      </div>
    </main>
  );
}

export default DepositPageContent;
