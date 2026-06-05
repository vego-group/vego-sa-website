import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SuccessPageProps = {
  searchParams: Promise<{ preorder_id?: string }>;
};

async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { preorder_id } = await searchParams;

  return (
    <main className="relative isolate overflow-hidden bg-[#00091f] px-6 py-12 text-white sm:py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(0,214,111,0.18),transparent_28%),radial-gradient(circle_at_78%_36%,rgba(0,123,181,0.18),transparent_32%),linear-gradient(135deg,#00111f_0%,#00091f_46%,#03001f_100%)]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 py-16">
        <section className="mx-auto grid w-full max-w-2xl gap-6 rounded-3xl border border-white/12 bg-white/8 p-8 text-center shadow-[0_28px_90px_rgba(0,0,0,0.24)]">
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-secondary text-4xl font-black text-primary shadow-[0_0_48px_rgba(0,214,111,0.4)]">
            ✓
          </div>

          <div className="grid gap-3">
            <h1 className="text-2xl font-black text-white/92 sm:text-3xl">
              تم تأكيد <span className="text-secondary">الحجز</span>
            </h1>
            <p className="text-base leading-8 text-white/62">
              تم استلام طلبك ودفع العربون بنجاح. سنقوم بالتواصل معك لاستكمال
              خطوات الاستلام.
            </p>
          </div>

          {preorder_id ? (
            <p className="text-sm text-white/40">
              رقم الطلب:{" "}
              <span className="font-bold text-white/60">{preorder_id}</span>
            </p>
          ) : null}

          <Link
            href="/landing"
            className="mx-auto inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 text-sm font-bold text-white/76 transition hover:bg-white/14"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
            العودة للرئيسية
          </Link>
        </section>
      </div>
    </main>
  );
}

export default SuccessPage;
