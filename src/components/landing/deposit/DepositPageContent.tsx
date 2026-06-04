"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, type ReactElement } from "react";
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
  buildMoyasarCardTokenPayload,
  createPreOrderFormSchema,
  payPreOrderFormSchema,
  type CreatePreOrderFormInput,
  type CreatePreOrderFormSchema,
  type CreatePreOrderPayloadSchema,
  type PayPreOrderFormInput,
  type PayPreOrderFormSchema,
} from "@/schemas";
import {
  createMoyasarCardTokenAPI,
  createPreorderAPI,
  payPreorderAPI,
} from "@/services/mutations/pre-order";
import type {
  DepositPhase,
  PreorderPaymentConfig,
  Preorder,
  PreordersApiResponse,
} from "@/types/landing/deposit";
import DepositHero from "./DepositHero";
import PayDepositForm from "./form/PayDepositForm";
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

function getPreorderPaymentData(
  data?: PreordersApiResponse | Preorder,
): { preorderId: string; payment?: PreorderPaymentConfig } | null {
  const preorder = data && "preorder" in data ? data.preorder : data;

  if (!preorder?.id) {
    return null;
  }

  return {
    preorderId: String(preorder.id),
    payment: data && "payment" in data ? data.payment : undefined,
  };
}

function DepositPageContent({
  initialProductSlug,
}: DepositPageContentProps): ReactElement {
  const productSlug = initialProductSlug ?? "";
  const { data: productResponse, isLoading: isProductLoading } =
    useProduct(productSlug);
  const product = productResponse?.data;
  const [phase, setPhase] = useState<DepositPhase>("details");
  const [preorderId, setPreorderId] = useState<string | null>(null);
  const [paymentConfig, setPaymentConfig] =
    useState<PreorderPaymentConfig | null>(null);

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

  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors, isSubmitting: isPaymentSubmitting },
  } = useForm<PayPreOrderFormInput, unknown, PayPreOrderFormSchema>({
    resolver: zodResolver(payPreOrderFormSchema),
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    mode: "onChange",
  });

  const goToPhase = (nextPhase: DepositPhase): void => {
    setPhase(nextPhase);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    if (result?.ok) {
      const preorderPaymentData = getPreorderPaymentData(
        "data" in result ? result.data : undefined,
      );

      if (!preorderPaymentData) {
        toast.error("تعذر قراءة رقم طلب الحجز من الخادم");
        return;
      }

      if (!preorderPaymentData.payment?.publishable_key) {
        toast.error("تعذر قراءة بيانات الدفع من الخادم");
        return;
      }

      setPreorderId(preorderPaymentData.preorderId);
      setPaymentConfig(preorderPaymentData.payment);
      goToPhase("pay-deposit");
      toast.success(result.message || "تم إنشاء طلب الحجز بنجاح");
      return;
    }

    toast.error(result?.message || "فشل إنشاء طلب الحجز");
  });

  const handlePayPreorder = handlePaymentSubmit(async (values) => {
    if (!preorderId) {
      toast.error("أنشئ طلب الحجز قبل الدفع");
      goToPhase("details");
      return;
    }

    if (!paymentConfig?.publishable_key) {
      toast.error("بيانات الدفع غير مكتملة. أعد إنشاء طلب الحجز");
      goToPhase("details");
      return;
    }

    const tokenPayload = buildMoyasarCardTokenPayload(
      values,
      paymentConfig.callback_url,
    );
    const tokenResult = await createMoyasarCardTokenAPI(
      tokenPayload,
      paymentConfig.publishable_key,
    );
    const cardToken = "data" in tokenResult ? tokenResult.data?.id : undefined;

    if (!tokenResult.ok || !cardToken) {
      toast.error(tokenResult.message || "فشل إنشاء رمز البطاقة");
      return;
    }

    const payResult = await payPreorderAPI(preorderId, {
      card_token: cardToken,
    });

    if (payResult.ok) {
      goToPhase("booking-confirmed");
      toast.success(payResult.message || "تم دفع العربون بنجاح");
      return;
    }

    toast.error(payResult.message || "فشل دفع العربون");
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

        {phase === "pay-deposit" ? (
          <PayDepositForm
            productSlug={productSlug}
            errors={paymentErrors}
            isSubmitting={isPaymentSubmitting}
            register={registerPayment}
            onBack={() => goToPhase("details")}
            onSubmit={handlePayPreorder}
          />
        ) : null}

        {phase === "booking-confirmed" ? (
          <section className="mx-auto grid w-full max-w-2xl gap-6 rounded-3xl border border-white/12 bg-white/8 p-8 text-center shadow-[0_28px_90px_rgba(0,0,0,0.24)]">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-secondary text-3xl font-black text-primary">
              ✓
            </div>
            <p className="text-lg font-bold leading-8 text-white/76">
              تم تأكيد الحجز. سنقوم بالتواصل معك لاستكمال خطوات الاستلام.
            </p>
          </section>
        ) : null}
      </div>
    </main>
  );
}

export default DepositPageContent;
